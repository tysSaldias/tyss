/**
 * faq — Netlify Function
 *
 * Busqueda de FAQ en la sheet de RooterValis.
 * Kapso llama a esta funcion via webhook tool.
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

interface HandlerEvent {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string>;
}

interface HandlerContext {
  waitUntil?: (promise: Promise<unknown>) => void;
}

function text(statusCode: number, content: string) {
  return new Response(content, {
    status: statusCode,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function json(statusCode: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function cors() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

async function fetchSheet(sheetId?: string): Promise<SpreadsheetResponse> {
  const token = process.env.ROOTERVALIS_API_KEY;
  if (!token) throw new Error("ROOTERVALIS_API_KEY not configured");

  let url = `${ROOTERVALIS_BASE}/api/spreadsheets/${SPREADSHEET_ID}/data`;
  if (sheetId) url += `?sheetId=${sheetId}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`RooterValis API error ${res.status}: ${body}`);
  }

  return res.json() as Promise<SpreadsheetResponse>;
}

function cellsToRows(cells: Cell[]): (string | number | null)[][] {
  if (!cells.length) return [];

  const maxRow = Math.max(...cells.map((c) => c.row));
  const maxCol = Math.max(...cells.map((c) => c.col));
  const rows: (string | number | null)[][] = [];

  for (let r = 0; r <= maxRow; r++) {
    const row: (string | number | null)[] = [];
    for (let c = 0; c <= maxCol; c++) {
      const cell = cells.find((c2) => c2.row === r && c2.col === c);
      row.push(cell?.value ?? null);
    }
    rows.push(row);
  }

  return rows;
}

export default async function handler(
  req: HandlerEvent,
  _ctx: HandlerContext
): Promise<Response> {
  if (req.httpMethod === "OPTIONS") return cors();
  if (req.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed. Use POST." });
  }

  try {
    const body = JSON.parse(req.body || "{}");
    const { category } = body;

    const spreadsheet = await fetchSheet();

    // Find FAQ sheet by name
    const faqSheet = spreadsheet.sheets?.find(
      (s) => s.name?.toLowerCase() === "faq"
    );

    let cells: Cell[];
    if (faqSheet) {
      const faqData = await fetchSheet(faqSheet.id);
      cells = faqData.cells;
    } else if (spreadsheet.sheets && spreadsheet.sheets.length > 1) {
      // Fallback: second sheet
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

    let filtered = data;
    if (category) {
      const catLower = category.toLowerCase().trim();
      filtered = data.filter(
        (r) => r[0] && String(r[0]).toLowerCase().includes(catLower)
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

    // Group by category
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
}
