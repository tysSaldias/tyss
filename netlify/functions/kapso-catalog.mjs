/**
 * Kapso Catalog — Netlify Function
 *
 * Puente entre el chatbot de WhatsApp (Kapso) y la sheet de RooterValis.
 * Kapso llama a esta función via webhook tool, esta función lee la sheet
 * y devuelve data formateada en markdown para el agente IA.
 *
 * Endpoint: POST /.netlify/functions/kapso-catalog
 *
 * Body (JSON):
 *   { "query": "catalog" | "product" | "faq" | "all" | "health" }
 *   { "query": "product", "sku": "XL10" }         ← búsqueda por SKU
 *   { "query": "product", "name": "timbre" }       ← búsqueda por nombre
 *   { "query": "faq", "category": "Envíos" }       ← filtro por categoría
 *
 * Headers:
 *   Authorization: Bearer <KAPSO_API_SECRET>        ← shared secret (opcional)
 */

const ROOTERVALIS_API_URL = "https://api.rootervalis.com";
const SPREADSHEET_ID = "c048f7a4-3770-47ee-9ed7-9553bd4b45be";

// ─── Helpers ────────────────────────────────────────────────────────────────

function json(statusCode, body) {
  return new Response(JSON.stringify(body), {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function text(statusCode, content) {
  return new Response(content, {
    statusCode,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function cors() {
  return new Response(null, {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

/**
 * Fetch spreadsheet data from RooterValis API.
 * Returns the raw API response with cells, sheets, etc.
 */
async function fetchSpreadsheet(sheetId) {
  const token = process.env.ROOTERVALIS_API_TOKEN;
  if (!token) {
    throw new Error("ROOTERVALIS_API_TOKEN not configured");
  }

  let url = `${ROOTERVALIS_API_URL}/api/spreadsheets/${SPREADSHEET_ID}/data`;
  if (sheetId) {
    url += `?sheetId=${sheetId}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`RooterValis API error ${res.status}: ${text}`);
  }

  return res.json();
}

/**
 * Parse cells array into rows (array of arrays).
 * Cells come as [{ row, col, value }, ...] from RooterValis.
 */
function cellsToRows(cells) {
  if (!cells || cells.length === 0) return [];

  const maxRow = Math.max(...cells.map((c) => c.row));
  const maxCol = Math.max(...cells.map((c) => c.col));
  const rows = [];

  for (let r = 0; r <= maxRow; r++) {
    const row = [];
    for (let c = 0; c <= maxCol; c++) {
      const cell = cells.find((c2) => c2.row === r && c2.col === c);
      row.push(cell?.value ?? null);
    }
    rows.push(row);
  }

  return rows;
}

// ─── Formatters ─────────────────────────────────────────────────────────────

/**
 * Format all products as markdown.
 * Expected columns: Producto, Categoría, SKU, Medidas, Precio, Colores, Stock, Descripción, Estado
 */
function formatCatalog(rows) {
  if (rows.length <= 1) return "No hay productos en el catálogo.";

  const header = rows[0];
  const data = rows.slice(1).filter((r) => r.some((v) => v !== null && v !== ""));

  let md = `# Catálogo de Productos — Timbres y Sellos Saldías\n\n`;
  md += `Total: ${data.length} variantes disponibles\n\n`;

  for (const row of data) {
    const [producto, categoria, sku, medidas, precio, colores, stock, descripcion, estado] = row;

    if (!producto) continue;

    md += `## ${producto}\n`;
    md += `- **SKU:** ${sku || "N/A"}\n`;
    md += `- **Categoría:** ${categoria || "N/A"}\n`;
    md += `- **Medidas:** ${medidas || "N/A"}\n`;

    if (precio !== null && precio !== undefined && precio !== "") {
      md += `- **Precio:** $${Number(precio).toLocaleString("es-CL")} CLP\n`;
    } else {
      md += `- **Precio:** No disponible\n`;
    }

    if (colores) {
      md += `- **Colores:** ${colores}\n`;
    }

    if (stock !== null && stock !== undefined && stock !== "") {
      const stockNum = Number(stock);
      if (stockNum === 0) {
        md += `- **Stock:** Sin stock\n`;
      } else {
        md += `- **Stock:** ${stockNum} unidades\n`;
      }
    }

    if (descripcion) {
      md += `- **Descripción:** ${descripcion}\n`;
    }

    if (estado) {
      md += `- **Estado:** ${estado}\n`;
    }

    md += `\n`;
  }

  return md.trim();
}

/**
 * Search for a specific product by SKU or name.
 */
function formatProduct(rows, { sku, name }) {
  if (rows.length <= 1) return "No hay productos en el catálogo.";

  const data = rows.slice(1).filter((r) => r.some((v) => v !== null && v !== ""));

  let matches = data;

  if (sku) {
    const skuUpper = sku.toUpperCase().trim();
    matches = data.filter(
      (r) => r[2] && String(r[2]).toUpperCase().includes(skuUpper)
    );
  } else if (name) {
    const nameLower = name.toLowerCase().trim();
    matches = data.filter(
      (r) => r[0] && String(r[0]).toLowerCase().includes(nameLower)
    );
  }

  if (matches.length === 0) {
    return `No se encontraron productos${sku ? ` con SKU "${sku}"` : ""}${name ? ` que contengan "${name}"` : ""}.`;
  }

  let md = `# Resultados de búsqueda\n\n`;
  md += `${matches.length} resultado(s) encontrado(s)\n\n`;

  for (const row of matches) {
    const [producto, categoria, skuVal, medidas, precio, colores, stock, descripcion, estado] = row;

    md += `## ${producto}\n`;
    md += `- **SKU:** ${skuVal || "N/A"}\n`;
    md += `- **Categoría:** ${categoria || "N/A"}\n`;
    md += `- **Medidas:** ${medidas || "N/A"}\n`;

    if (precio !== null && precio !== undefined && precio !== "") {
      md += `- **Precio:** $${Number(precio).toLocaleString("es-CL")} CLP\n`;
    } else {
      md += `- **Precio:** No disponible\n`;
    }

    if (colores) md += `- **Colores:** ${colores}\n`;
    if (stock !== null && stock !== undefined && stock !== "") {
      const stockNum = Number(stock);
      md += `- **Stock:** ${stockNum === 0 ? "Sin stock" : `${stockNum} unidades`}\n`;
    }
    if (descripcion) md += `- **Descripción:** ${descripcion}\n`;
    if (estado) md += `- **Estado:** ${estado}\n`;

    md += `\n`;
  }

  return md.trim();
}

/**
 * Format FAQ entries.
 * Expected columns: Categoría, Pregunta, Respuesta
 */
function formatFAQ(rows, { category } = {}) {
  if (rows.length <= 1) return "No hay preguntas frecuentes.";

  const data = rows.slice(1).filter((r) => r.some((v) => v !== null && v !== ""));

  let filtered = data;
  if (category) {
    const catLower = category.toLowerCase().trim();
    filtered = data.filter(
      (r) => r[0] && String(r[0]).toLowerCase().includes(catLower)
    );
  }

  if (filtered.length === 0) {
    return `No se encontraron FAQ${category ? ` en la categoría "${category}"` : ""}.`;
  }

  // Group by category
  const grouped = {};
  for (const row of filtered) {
    const [cat, pregunta, respuesta] = row;
    const key = cat || "General";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push({ pregunta, respuesta });
  }

  let md = `# Preguntas Frecuentes\n\n`;
  md += `${filtered.length} pregunta(s)\n\n`;

  for (const [cat, items] of Object.entries(grouped)) {
    md += `## ${cat}\n\n`;
    for (const { pregunta, respuesta } of items) {
      md += `**P:** ${pregunta}\n`;
      md += `**R:** ${respuesta}\n\n`;
    }
  }

  return md.trim();
}

// ─── Handler ────────────────────────────────────────────────────────────────

export default async function handler(request) {
  // CORS preflight
  if (request.method === "OPTIONS") {
    return cors();
  }

  // Only accept POST
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed. Use POST." });
  }

  try {
    const body = await request.json();
    const { query = "catalog", sku, name, category, sheetId } = body;

    // Health check
    if (query === "health") {
      const hasToken = !!process.env.ROOTERVALIS_API_TOKEN;
      return json(200, {
        status: "ok",
        spreadsheet_id: SPREADSHEET_ID,
        token_configured: hasToken,
      });
    }

    // Fetch spreadsheet data from RooterValis
    const spreadsheet = await fetchSpreadsheet(sheetId);
    const rows = cellsToRows(spreadsheet.cells);

    // Route to appropriate formatter
    let result;

    switch (query) {
      case "catalog":
        result = formatCatalog(rows);
        break;

      case "product":
        result = formatProduct(rows, { sku, name });
        break;

      case "faq":
        // For FAQ, we need to fetch the FAQ sheet specifically
        const faqSheet = spreadsheet.sheets?.find(
          (s) => s.name?.toLowerCase() === "faq"
        );
        if (faqSheet) {
          const faqData = await fetchSpreadsheet(faqSheet.id);
          const faqRows = cellsToRows(faqData.cells);
          result = formatFAQ(faqRows, { category });
        } else {
          // Try second sheet (index 1) as FAQ
          if (spreadsheet.sheets && spreadsheet.sheets.length > 1) {
            const faqData = await fetchSpreadsheet(spreadsheet.sheets[1].id);
            const faqRows = cellsToRows(faqData.cells);
            result = formatFAQ(faqRows, { category });
          } else {
            result = "No se encontró la hoja de FAQ.";
          }
        }
        break;

      case "all":
        // Return both catalog and FAQ
        let allMd = formatCatalog(rows) + "\n\n---\n\n";

        const faqSheetAll = spreadsheet.sheets?.find(
          (s) => s.name?.toLowerCase() === "faq"
        );
        if (faqSheetAll) {
          const faqDataAll = await fetchSpreadsheet(faqSheetAll.id);
          const faqRowsAll = cellsToRows(faqDataAll.cells);
          allMd += formatFAQ(faqRowsAll);
        } else if (spreadsheet.sheets && spreadsheet.sheets.length > 1) {
          const faqDataAll = await fetchSpreadsheet(spreadsheet.sheets[1].id);
          const faqRowsAll = cellsToRows(faqDataAll.cells);
          allMd += formatFAQ(faqRowsAll);
        }

        result = allMd;
        break;

      default:
        return json(400, {
          error: `Unknown query type: "${query}". Use: catalog, product, faq, all, health`,
        });
    }

    // Return markdown (Kapso agent reads this as tool result)
    return text(200, result);
  } catch (error) {
    console.error("kapso-catalog error:", error);
    return json(500, {
      error: "Error al obtener datos del catálogo",
      detail: error.message,
    });
  }
}
