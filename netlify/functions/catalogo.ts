/**
 * catalogo — Netlify Function
 *
 * Busqueda de productos en la sheet de RooterValis.
 *
 * POST /.netlify/functions/catalogo
 * Body: { "sku": "XL10" | "name": "timbre" | "category": "Accesorio" }
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

async function fetchSpreadsheet(): Promise<SpreadsheetResponse> {
  const token = process.env.ROOTERVALIS_API_KEY;
  if (!token) throw new Error("ROOTERVALIS_API_KEY not configured");

  const res = await fetch(
    `${ROOTERVALIS_BASE}/api/spreadsheets/${SPREADSHEET_ID}/data`,
    { headers: { "X-API-Key": token } }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`RooterValis API error ${res.status}: ${body}`);
  }

  return res.json() as Promise<SpreadsheetResponse>;
}

function cellsToRows(cells: Cell[]): (string | number | null)[][] {
  if (!cells.length) return [];

  // API returns row/col as strings, normalize to numbers and trim values
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

function formatProduct(row: (string | number | null)[]): string {
  const [producto, categoria, sku, medidas, precio, colores, stock, desc, estado] = row;
  let out = `Producto: ${producto}\n`;
  out += `SKU: ${sku || "N/A"}\n`;
  out += `Categoria: ${categoria || "N/A"}\n`;
  out += `Medidas: ${medidas || "N/A"}\n`;
  if (precio !== null && precio !== undefined && precio !== "") {
    out += `Precio: $${Number(precio).toLocaleString("es-CL")} CLP\n`;
  } else {
    out += `Precio: No disponible\n`;
  }
  if (colores) out += `Colores: ${colores}\n`;
  if (stock !== null && stock !== undefined && stock !== "") {
    out += `Stock: ${Number(stock) === 0 ? "Sin stock" : `${Number(stock)} unidades`}\n`;
  }
  if (desc) out += `Descripcion: ${desc}\n`;
  if (estado) out += `Estado: ${estado}\n`;
  return out;
}

exports.handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  if (event.httpMethod === "OPTIONS") return cors();
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed. Use POST." });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { sku, name, category } = body;

    if (!sku && !name && !category) {
      return json(400, {
        error: "Provide at least one: sku, name, or category",
      });
    }

    const spreadsheet = await fetchSpreadsheet();
    const rows = cellsToRows(spreadsheet.cells);

    if (rows.length <= 1) {
      return text(200, "No hay productos en el catalogo.");
    }

    const data = rows
      .slice(1)
      .filter((r) => r.some((v) => v !== null && v !== ""));

    let filtered = data;

    if (sku) {
      const skuUpper = sku.toUpperCase().trim();
      filtered = data.filter(
        (r) => r[2] && String(r[2]).toUpperCase().includes(skuUpper)
      );
    } else if (name) {
      const nameLower = name.toLowerCase().trim();
      filtered = data.filter(
        (r) => r[0] && String(r[0]).toLowerCase().includes(nameLower)
      );
    } else if (category) {
      const catLower = category.toLowerCase().trim();
      filtered = data.filter(
        (r) => r[1] && String(r[1]).toLowerCase().includes(catLower)
      );
    }

    if (filtered.length === 0) {
      const criteria = sku
        ? `SKU "${sku}"`
        : name
          ? `nombre "${name}"`
          : `categoria "${category}"`;
      return text(200, `No se encontraron productos con ${criteria}.`);
    }

    let result = `Resultados: ${filtered.length} producto(s)\n\n`;
    for (const row of filtered) {
      result += formatProduct(row) + "\n";
    }

    return text(200, result.trim());
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("catalogo error:", message);
    return json(500, { error: "Error al obtener catalogo", detail: message });
  }
};
