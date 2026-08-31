/**
 * faq — Netlify Function
 *
 * Busqueda de FAQ en la sheet de RooterValis.
 *
 * POST /.netlify/functions/faq
 * Body: { "category": "Envios" }  (opcional — sin category devuelve todas)
 */

declare const process: { env: Record<string, string | undefined> };

const ROOTERVALIS_BASE = "https://api.rootervalis.com";
const SPREADSHEET_ID = "c048f7a4-3770-47ee-9ed7-9553bd4b45be";

interface Cell {
  row: number;
  col: number;
  value: string | number | null;
  formula: string | null;
}

interface SpreadsheetResponse {
  id: string;
  title: string;
  sheets: { id: string; name: string; position: number }[];
  activeSheetId: string;
  cells: Cell[];
}

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string>;
}

interface NetlifyResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

function text(statusCode: number, content: string): NetlifyResponse {
  return {
    statusCode,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    body: content,
  };
}

function json(statusCode: number, body: Record<string, unknown>): NetlifyResponse {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    body: JSON.stringify(body),
  };
}

function cors(): NetlifyResponse {
  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: "",
  };
}

async function fetchSheet(sheetId?: string): Promise<SpreadsheetResponse> {
  const token = process.env.ROOTERVALIS_API_KEY;
  if (!token) throw new Error("ROOTERVALIS_API_KEY not configured");

  let url = `${ROOTERVALIS_BASE}/api/spreadsheets/${SPREADSHEET_ID}/data`;
  if (sheetId) url += `?sheetId=${sheetId}`;

  const res = await fetch(url, {
    headers: { "X-API-Key": token },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`RooterValis API error ${res.status}: ${body}`);
  }

  return res.json() as Promise<SpreadsheetResponse>;
}

function cellsToRows(cells: Cell[]): (string | number | null)[][] {
  if (!cells.length) return [];

  const normalized = cells.map((c) => ({
    ...c,
    row: Number(c.row),
    col: Number(c.col),
    value: typeof c.value === "string" ? c.value.trim() : c.value,
  }));

  const maxRow = Math.max(...normalized.map((c) => c.row));
  const maxCol = Math.max(...normalized.map((c) => c.col));
  const rows: (string | number | null)[][] = [];

  for (let r = 0; r <= maxRow; r++) {
    const row: (string | number | null)[] = [];
    for (let c = 0; c <= maxCol; c++) {
      const cell = normalized.find((c2) => c2.row === r && c2.col === c);
      row.push(cell?.value ?? null);
    }
    rows.push(row);
  }

  return rows;
}

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

exports.handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  if (event.httpMethod === "OPTIONS") return cors();
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed. Use POST." });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { category } = body;

    const spreadsheet = await fetchSheet();

    const faqSheet = spreadsheet.sheets?.find(
      (s) => s.name?.toLowerCase() === "faq"
    );

    let cells: Cell[];
    if (faqSheet) {
      const faqData = await fetchSheet(faqSheet.id);
      cells = faqData.cells;
    } else if (spreadsheet.sheets && spreadsheet.sheets.length > 1) {
      const faqData = await fetchSheet(spreadsheet.sheets[1].id);
      cells = faqData.cells;
    } else {
      return text(200, "No se encontro la hoja de FAQ.");
    }

    const rows = cellsToRows(cells);
    if (rows.length <= 1) {
      return text(200, "No hay preguntas frecuentes.");
    }

    const data = rows
      .slice(1)
      .filter((r) => r.some((v) => v !== null && v !== ""));

    // Debug: show raw categories
    if (category === "_debug") {
      const uniqueCats = [...new Set(data.map((r) => String(r[0])))];
      const catCounts = uniqueCats.map((c) => ({
        category: c,
        normalized: normalize(c),
        count: data.filter((r) => String(r[0]) === c).length,
      }));
      return text(200, JSON.stringify({ total: data.length, catCounts }, null, 2));
    }

    let filtered = data;

    if (category) {
      const catNorm = normalize(category);
      filtered = data.filter(
        (r) => r[0] && normalize(String(r[0])).includes(catNorm)
      );
    }

    if (filtered.length === 0) {
      return text(
        200,
        category
          ? `No se encontraron FAQ en la categoria "${category}".`
          : "No hay preguntas frecuentes."
      );
    }

    const grouped: Record<string, [string | number | null, string | number | null][]> = {};
    for (const row of filtered) {
      const cat = row[0] || "General";
      const key = String(cat);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push([row[1], row[2]]);
    }

    let result = `FAQ: ${filtered.length} pregunta(s)\n\n`;
    for (const [cat, items] of Object.entries(grouped)) {
      result += `--- ${cat} ---\n\n`;
      for (const [pregunta, respuesta] of items) {
        result += `P: ${pregunta}\nR: ${respuesta}\n\n`;
      }
    }

    return text(200, result.trim());
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("faq error:", message);
    return json(500, { error: "Error al obtener FAQ", detail: message });
  }
};
