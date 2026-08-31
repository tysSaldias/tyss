/**
 * kapso — Netlify Function
 *
 * Endpoint único para el chatbot de Kapso.
 * Recibe el mensaje del usuario, detecta la intención, y busca en la sheet
 * de RooterValis (catálogo o FAQ).
 *
 * POST /.netlify/functions/kapso
 * Body: { "message": "¿Cuánto cuesta el XL10?" }
 *
 * El agente de Kapso llama a esta función via webhook tool.
 */

declare const process: { env: Record<string, string | undefined> };

const ROOTERVALIS_BASE = "https://api.rootervalis.com";
const SPREADSHEET_ID = "c048f7a4-3770-47ee-9ed7-9553bd4b45be";

interface Cell {
  row: number;
  col: number;
  value: string | number | null;
}

interface SpreadsheetResponse {
  id: string;
  sheets: { id: string; name: string; position: number }[];
  cells: Cell[];
}

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

interface NetlifyResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function text(statusCode: number, content: string): NetlifyResponse {
  return { statusCode, headers: { "Content-Type": "text/plain; charset=utf-8", ...CORS }, body: content };
}

function json(statusCode: number, body: Record<string, unknown>): NetlifyResponse {
  return { statusCode, headers: { "Content-Type": "application/json", ...CORS }, body: JSON.stringify(body) };
}

// ─── RooterValis API ────────────────────────────────────────────────────────

async function fetchSheet(sheetId?: string): Promise<SpreadsheetResponse> {
  const token = process.env.ROOTERVALIS_API_KEY;
  if (!token) throw new Error("ROOTERVALIS_API_KEY not configured");

  let url = `${ROOTERVALIS_BASE}/api/spreadsheets/${SPREADSHEET_ID}/data`;
  if (sheetId) url += `?sheetId=${sheetId}`;

  const res = await fetch(url, { headers: { "X-API-Key": token } });
  if (!res.ok) throw new Error(`RooterValis API error ${res.status}`);
  return res.json() as Promise<SpreadsheetResponse>;
}

function cellsToRows(cells: Cell[]): (string | number | null)[][] {
  if (!cells.length) return [];

  const norm = cells.map((c) => ({
    row: Number(c.row),
    col: Number(c.col),
    value: typeof c.value === "string" ? c.value.trim() : c.value,
  }));

  const maxRow = Math.max(...norm.map((c) => c.row));
  const maxCol = Math.max(...norm.map((c) => c.col));
  const rows: (string | number | null)[][] = [];

  for (let r = 0; r <= maxRow; r++) {
    const row: (string | number | null)[] = [];
    for (let c = 0; c <= maxCol; c++) {
      const cell = norm.find((c2) => c2.row === r && c2.col === c);
      row.push(cell?.value ?? null);
    }
    rows.push(row);
  }
  return rows;
}

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

// ─── Intent Detection ───────────────────────────────────────────────────────

type Intent = { type: "catalog"; query: string; field: "sku" | "name" | "category" }
            | { type: "faq"; query: string }
            | { type: "general" };

function detectIntent(message: string): Intent {
  const msg = normalize(message);

  // SKU pattern: XL10, MAN40, TAM70, D233, etc.
  const skuMatch = message.match(/\b(XL\s*\d+|MAN\s*\d+|TAM\s*\d+|D\d+|BOLSILLO|TINTA\d*)\b/i);
  if (skuMatch) {
    return { type: "catalog", query: skuMatch[1].replace(/\s/g, ""), field: "sku" };
  }

  // FAQ keywords
  const faqKeywords = [
    "envia", "envio", "despacho", "garantia", "devolucion", "pago",
    "boleta", "factura", "horario", "ubicacion", "direccion", "sucursal",
    "contacto", "whatsapp", "telefono", "pedido", "compra", "retiro",
    "transporte", "starken", "bluexpress", "contra entrega", "transferencia",
  ];
  if (faqKeywords.some((kw) => msg.includes(kw))) {
    return { type: "faq", query: message };
  }

  // Product name keywords (search by product name in the sheet)
  const nameKeywords = [
    "timbre", "fechador", "tampon", "dactilar", "tinta",
    "roller", "set escolar", "automatico", "manual",
    "cuadrado", "redondo", "bolsillo",
  ];
  for (const kw of nameKeywords) {
    if (msg.includes(kw)) {
      return { type: "catalog", query: kw, field: "name" };
    }
  }

  // Product name search (fallback)
  if (msg.includes("producto") || msg.includes("catalogo") || msg.includes("precio")) {
    return { type: "catalog", query: message, field: "name" };
  }

  return { type: "general" };
}

// ─── Formatters ─────────────────────────────────────────────────────────────

function formatProduct(row: (string | number | null)[]): string {
  const [producto, cat, sku, med, precio, colores, stock, desc, estado] = row;
  let out = `Producto: ${producto}\n`;
  out += `SKU: ${sku || "N/A"}\n`;
  out += `Categoria: ${cat || "N/A"}\n`;
  out += `Medidas: ${med || "N/A"}\n`;
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

// ─── Handler ────────────────────────────────────────────────────────────────

exports.handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST, OPTIONS" }, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) return json(400, { error: "Missing 'message' field" });

    const intent = detectIntent(message);

    // ── Catalog search ──
    if (intent.type === "catalog") {
      const spreadsheet = await fetchSheet();
      const rows = cellsToRows(spreadsheet.cells);

      if (rows.length <= 1) return text(200, "No hay productos en el catalogo.");

      const data = rows.slice(1).filter((r) => r.some((v) => v !== null && v !== ""));
      let filtered = data;

      if (intent.field === "sku") {
        const q = intent.query.toUpperCase();
        filtered = data.filter((r) => r[2] && String(r[2]).toUpperCase().includes(q));
      } else if (intent.field === "category") {
        const q = normalize(intent.query);
        filtered = data.filter((r) => r[1] && normalize(String(r[1])).includes(q));
      } else {
        const q = normalize(intent.query);
        filtered = data.filter((r) => r[0] && normalize(String(r[0])).includes(q));
      }

      if (filtered.length === 0) {
        return text(200, `No se encontraron productos para "${message}".`);
      }

      let result = `Catalogo: ${filtered.length} resultado(s)\n\n`;
      for (const row of filtered) result += formatProduct(row) + "\n";
      return text(200, result.trim());
    }

    // ── FAQ search ──
    if (intent.type === "faq") {
      const spreadsheet = await fetchSheet();
      const faqSheet = spreadsheet.sheets?.find((s) => s.name?.toLowerCase() === "faq");

      let cells: Cell[];
      if (faqSheet) {
        const faqData = await fetchSheet(faqSheet.id);
        cells = faqData.cells;
      } else if (spreadsheet.sheets?.length > 1) {
        const faqData = await fetchSheet(spreadsheet.sheets[1].id);
        cells = faqData.cells;
      } else {
        return text(200, "No se encontro la hoja de FAQ.");
      }

      const rows = cellsToRows(cells);
      if (rows.length <= 1) return text(200, "No hay preguntas frecuentes.");

      const data = rows.slice(1).filter((r) => r.some((v) => v !== null && v !== ""));

      // Search FAQ by matching words from the user message
      const words = normalize(message).split(/\s+/).filter((w) => w.length > 2);
      const matched = data.filter((r) => {
        const fullText = normalize(`${r[0]} ${r[1]} ${r[2]}`);
        return words.some((w) => fullText.includes(w));
      });

      if (matched.length === 0) {
        return text(200, `No se encontraron FAQ para "${message}".`);
      }

      // Group by category
      const grouped: Record<string, [string | number | null, string | number | null][]> = {};
      for (const row of matched) {
        const cat = String(row[0] || "General");
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push([row[1], row[2]]);
      }

      let result = `FAQ: ${matched.length} resultado(s)\n\n`;
      for (const [cat, items] of Object.entries(grouped)) {
        result += `--- ${cat} ---\n\n`;
        for (const [p, r] of items) result += `P: ${p}\nR: ${r}\n\n`;
      }
      return text(200, result.trim());
    }

    // ── General (no match) ──
    return text(200, "No tengo esa informacion. Escribinos al +56 9 8813 4375 para assistance personalizado.");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("kapso error:", message);
    return json(500, { error: "Error interno", detail: message });
  }
};
