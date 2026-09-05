/**
 * prices.ts — Dynamic price management from RooterValis spreadsheet
 *
 * Fetches prices from the RooterValis sheet and merges them with
 * the hardcoded products. Only prices are used (no colors, no stock).
 */

import { products } from '$lib/data/products';
import type { Product, SizeOption } from '$lib/types';

// ─────────────────────────────────────────────────────────────
// SKU MAP: Sheet SKU → { productId, sizeId }
// ─────────────────────────────────────────────────────────────
// The sheet uses different SKU formats than products.ts.
// This map translates them.

const SKU_MAP: Record<string, { productId: string; sizeId: string }> = {
	// Timbre Automático Rectangular
	XL10: { productId: 'timbre-automatico-rectangular', sizeId: 'XL10' },
	XL20: { productId: 'timbre-automatico-rectangular', sizeId: 'XL20' },
	XL30: { productId: 'timbre-automatico-rectangular', sizeId: 'XL30' },
	XL40: { productId: 'timbre-automatico-rectangular', sizeId: 'XL40' },
	XL50: { productId: 'timbre-automatico-rectangular', sizeId: 'XL50' },
	XL60: { productId: 'timbre-automatico-rectangular', sizeId: 'XL60' },

	// Fechador Automático
	XL703: { productId: 'fechador-automatico', sizeId: 'XL703' },
	XL704: { productId: 'fechador-automatico', sizeId: 'XL704' },

	// Timbre Cuadrado Automático
	XL601: { productId: 'timbre-cuadrado-automatico', sizeId: 'XL601' },
	XL602: { productId: 'timbre-cuadrado-automatico', sizeId: 'XL602' },

	// Timbre Redondo Automático
	XL803: { productId: 'timbre-redondo-automatico', sizeId: 'XL803' },
	XL804: { productId: 'timbre-redondo-automatico', sizeId: 'XL804' },

	// Timbre Portátil Bolsillo
	BOLSILLO: { productId: 'timbre-portatil', sizeId: 'Bolsillo' },

	// Timbre Manual (sheet uses MANxx, code uses XXxYY)
	MAN40: { productId: 'timbre-manual', sizeId: '40x40' },
	MAN70: { productId: 'timbre-manual', sizeId: '70x70' },
	MAN90: { productId: 'timbre-manual', sizeId: '90x90' },
	MAN100: { productId: 'timbre-manual', sizeId: '100x100' },
	MAN120: { productId: 'timbre-manual', sizeId: '120x120' },
	MAN150: { productId: 'timbre-manual', sizeId: '150x100' },

	// Tampón Manual (sheet uses TAMxx, code uses XXxYY)
	TAM40: { productId: 'tampon-manual', sizeId: '40x40' },
	TAM70: { productId: 'tampon-manual', sizeId: '70x70' },
	TAM90: { productId: 'tampon-manual', sizeId: '90x90' },
	TAM100: { productId: 'tampon-manual', sizeId: '100x100' },
	TAM120: { productId: 'tampon-manual', sizeId: '120x120' },
	TAM150: { productId: 'tampon-manual', sizeId: '150x100' },

	// Dactilar D233
	D233: { productId: 'dactilar-d233', sizeId: 'D233' },

	// Tinta para Timbres (sheet uses TINTA29, code uses 29cc)
	TINTA29: { productId: 'tinta-timbres', sizeId: '29cc' },
};

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface Cell {
	row: string | number;
	col: string | number;
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

/** productId → (sizeId → total price) */
type PriceMap = Map<string, Map<string, number>>;

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────

const ROOTERVALIS_BASE = 'https://api.rootervalis.com';
const SPREADSHEET_ID = 'c048f7a4-3770-47ee-9ed7-9553bd4b45be';
const CACHE_TTL_MS = 60_000; // 1 minute

// ─────────────────────────────────────────────────────────────
// Cache
// ─────────────────────────────────────────────────────────────

let cachedPrices: PriceMap | null = null;
let cacheTimestamp = 0;

// ─────────────────────────────────────────────────────────────
// Fetch & parse
// ─────────────────────────────────────────────────────────────

async function fetchSpreadsheetData(apiKey: string): Promise<SpreadsheetResponse> {
	const res = await fetch(`${ROOTERVALIS_BASE}/api/spreadsheets/${SPREADSHEET_ID}/data`, {
		headers: { 'X-API-Key': apiKey },
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
		row: Number(c.row),
		col: Number(c.col),
		value: typeof c.value === 'string' ? c.value.trim() : c.value,
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

/**
 * Parse sheet rows into a PriceMap.
 *
 * Sheet columns:
 *   0: Producto, 1: Categoría, 2: SKU, 3: Medidas,
 *   4: Precio (CLP), 5: Colores, 6: Stock, 7: Descripción, 8: Estado
 *
 * We only use col 2 (SKU) and col 4 (Precio).
 * Rows with Estado="Próximamente" or empty price are skipped.
 */
function parsePriceMap(rows: (string | number | null)[][]): PriceMap {
	const priceMap: PriceMap = new Map();

	// Skip header row (index 0)
	for (let i = 1; i < rows.length; i++) {
		const row = rows[i];
		const sku = String(row[2] ?? '').toUpperCase().trim();
		const precioRaw = row[4];
		const estado = String(row[8] ?? '').trim().toLowerCase();

		// Skip rows without SKU or price
		if (!sku || precioRaw === null || precioRaw === undefined || precioRaw === '') continue;

		// Skip "Próximamente" products
		if (estado === 'próximamente' || estado === 'proximamente') continue;

		const precio = Number(precioRaw);
		if (isNaN(precio) || precio <= 0) continue;

		// Look up in SKU_MAP
		const mapping = SKU_MAP[sku];
		if (!mapping) {
			console.warn(`[prices] Unknown SKU in sheet: "${sku}" — skipping`);
			continue;
		}

		// Add to map
		if (!priceMap.has(mapping.productId)) {
			priceMap.set(mapping.productId, new Map());
		}
		priceMap.get(mapping.productId)!.set(mapping.sizeId, precio);
	}

	return priceMap;
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

/**
 * Fetch dynamic prices from RooterValis.
 * Returns null if fetching fails (callers should fall back to hardcoded prices).
 */
export async function fetchDynamicPrices(apiKey: string): Promise<PriceMap | null> {
	const now = Date.now();

	// Return cache if valid
	if (cachedPrices && now - cacheTimestamp < CACHE_TTL_MS) {
		return cachedPrices;
	}

	try {
		const spreadsheet = await fetchSpreadsheetData(apiKey);
		const rows = cellsToRows(spreadsheet.cells);
		const priceMap = parsePriceMap(rows);

		// Update cache
		cachedPrices = priceMap;
		cacheTimestamp = now;

		return priceMap;
	} catch (err) {
		console.error('[prices] Failed to fetch dynamic prices:', err);
		// Return stale cache if available, otherwise null
		return cachedPrices;
	}
}

/**
 * Apply dynamic prices to a product.
 *
 * Logic:
 * 1. Get all prices for this product from the sheet
 * 2. basePrice = min(all prices)
 * 3. priceModifier for each size = price[size] - basePrice
 *
 * If no dynamic prices exist for the product, returns the original product unchanged.
 */
export function applyPriceOverrides(product: Product, priceMap: PriceMap): Product {
	const sizePrices = priceMap.get(product.id);

	// No dynamic prices for this product → return as-is
	if (!sizePrices || sizePrices.size === 0) return product;

	// Calculate basePrice as the minimum price across all sizes
	const allPrices = Array.from(sizePrices.values());
	const newBasePrice = Math.min(...allPrices);

	// Update each size's priceModifier
	const newSizes: SizeOption[] = product.availableSizes.map((size) => {
		const dynamicPrice = sizePrices.get(size.id);

		// If we have a dynamic price for this size, recalculate modifier
		if (dynamicPrice !== undefined) {
			return {
				...size,
				priceModifier: dynamicPrice - newBasePrice,
			};
		}

		// No dynamic price for this size → keep original modifier
		return size;
	});

	return {
		...product,
		basePrice: newBasePrice,
		availableSizes: newSizes,
	};
}

/**
 * Apply dynamic prices to all products.
 * Skips products with comingSoon=true.
 */
export function applyAllPriceOverrides(priceMap: PriceMap): Product[] {
	return products.map((product) => {
		// Don't override prices for "coming soon" products
		if (product.comingSoon) return product;

		return applyPriceOverrides(product, priceMap);
	});
}

/**
 * Get a single product by slug with dynamic prices applied.
 */
export function getProductWithDynamicPrices(slug: string, priceMap: PriceMap): Product | undefined {
	const product = products.find((p) => p.id === slug);
	if (!product) return undefined;
	if (product.comingSoon) return product;

	return applyPriceOverrides(product, priceMap);
}
