import { browser } from '$app/environment';

export interface CartLine {
	/** Unique line key: productId + serialized configuration (size/color/text). */
	key: string;
	productId: string;
	name: string;
	/** Product image URL (may be empty for products without images). */
	image: string;
	/** Unit price including size modifier and premium color surcharge. */
	unitPrice: number;
	quantity: number;
	text?: string;
	/** True when the design includes a logo/image (excluded from small sizes). */
	hasLogo?: boolean;
	sizeName?: string;
	sizeDimensions?: string;
	colorName?: string;
}

const STORAGE_KEY = 'tyss-cart';

function isCartLine(value: unknown): value is CartLine {
	if (typeof value !== 'object' || value === null) return false;
	const v = value as Record<string, unknown>;
	return (
		typeof v.key === 'string' &&
		typeof v.productId === 'string' &&
		typeof v.name === 'string' &&
		typeof v.unitPrice === 'number' &&
		Number.isFinite(v.unitPrice) &&
		typeof v.quantity === 'number' &&
		Number.isFinite(v.quantity) &&
		v.quantity >= 1
	);
}

function loadCart(): CartLine[] {
	// SSR safe: no window/localStorage access outside the browser.
	if (!browser) return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter(isCartLine) : [];
	} catch {
		// Corrupted or unavailable storage — start with an empty cart.
		return [];
	}
}

export const items = $state<CartLine[]>(loadCart());

/**
 * Whether the client has mounted (post-hydration).
 *
 * The cart is seeded from localStorage, so the server/prerender always renders
 * an empty cart. Components that display cart-derived UI must gate on this flag
 * (e.g. show a neutral placeholder while false) so the first client render
 * matches the SSR markup — avoiding hydration mismatches and content flashes.
 *
 * Not exported directly: module-scope `$state` that gets reassigned cannot be
 * exported in Svelte 5, so it is exposed as a getter (same pattern as
 * `count()`/`total()`).
 */
let _hydrated = $state(false);
export function isHydrated(): boolean {
	return _hydrated;
}

/**
 * Marks the store as hydrated. Call from `onMount` in components that render
 * cart-derived UI; `onMount` only runs on the client after hydration completes.
 */
export function markHydrated(): void {
	_hydrated = true;
}

/**
 * Total number of units across all lines.
 * Exported as a function: module-level $derived cannot be exported, and the
 * $state proxy is a runtime signal, so reads from templates/components stay reactive.
 */
export function count(): number {
	return items.reduce((sum, line) => sum + line.quantity, 0);
}

/** Grand total: sum of unitPrice * quantity for every line. */
export function total(): number {
	return items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

function persist(): void {
	if (!browser) return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch {
		// Storage unavailable (private mode, quota) — keep the in-memory cart only.
	}
}

export function addToCart(line: CartLine): void {
	const existing = items.find((item) => item.key === line.key);
	if (existing) {
		existing.quantity += 1;
	} else {
		items.push({ ...line, quantity: 1 });
	}
	persist();
}

export function removeFromCart(key: string): void {
	// Rebind the proxy variable is not allowed for exported $state (runes module
	// constraint), so replace in place to keep the exported binding live.
	const next = items.filter((item) => item.key !== key);
	items.length = 0;
	items.push(...next);
	persist();
}

export function updateQuantity(key: string, qty: number): void {
	if (qty < 1) {
		removeFromCart(key);
		return;
	}
	const line = items.find((item) => item.key === key);
	if (line) {
		line.quantity = Math.floor(qty);
		persist();
	}
}

export function clearCart(): void {
	items.length = 0;
	persist();
}
