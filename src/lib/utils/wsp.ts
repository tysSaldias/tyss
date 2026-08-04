import type { StampConfig, Product } from '$lib/types';
import type { CartLine } from '$lib/stores/cart.svelte';
import { priceFormat } from '$lib/data/products';

export const WHATSAPP_NUMBER = '56988134375';

/** Display form of the WhatsApp number, used in visible UI copy. */
export const PHONE_DISPLAY = '+56 9 8813 4375';

/**
 * Truncates long text for the wa.me message payload. Keeps the URL well under
 * browser/shortener limits (~2048 chars) when many lines carry long text.
 */
function truncateText(text: string, max: number): string {
	return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export function generateWhatsAppMessage(config: StampConfig, product: Product): string {
	const size = product.availableSizes.find((s) => s.id === config.sizeId);

	const parts: string[] = [];
	parts.push(`Hola! Quiero cotizar: ${product.name}`);

	if (config.text) {
		parts.push(`Texto: ${config.text}`);
	}

	if (config.hasLogo) {
		parts.push(`Logo: sí`);
	}

	// Color comentado temporalmente
	// if (color) {
	// 	const colorName = color.isPremium ? `${color.name} (premium)` : color.name;
	// 	parts.push(`Color: ${colorName}`);
	// }

	if (size) {
		parts.push(`Tamaño: ${size.name} (${size.dimensions})`);
	}

	const message = parts.join(', ');
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateSimpleWhatsAppLink(): string {
	return `https://wa.me/${WHATSAPP_NUMBER}`;
}

/**
 * Builds the full multi-item order message for WhatsApp.
 * Numbered lines with name, size, quantity and per-line subtotal,
 * followed by the grand total.
 */
export function generateCartWhatsAppMessage(lines: CartLine[]): string {
	if (lines.length === 0) {
		return 'Hola! Quiero hacer un pedido:';
	}

	const parts: string[] = ['Hola! Quiero hacer este pedido:', ''];

	lines.forEach((line, index) => {
		const sizePart = line.sizeName
			? [line.sizeName, line.sizeDimensions].filter(Boolean).join(', ')
			: '';
		const header = `${index + 1}) ${line.name}${sizePart ? ` (${sizePart})` : ''} x${line.quantity} — ${priceFormat(line.unitPrice * line.quantity)}`;
		parts.push(header);
		if (line.text) {
			parts.push(`   Texto: ${truncateText(line.text, 80)}`);
		}
		if (line.hasLogo) {
			parts.push(`   Logo: sí`);
		}
	});

	const grandTotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
	parts.push('');
	parts.push(`Total: ${priceFormat(grandTotal)}`);

	return parts.join('\n');
}

export function cartWhatsAppUrl(lines: CartLine[]): string {
	const message = generateCartWhatsAppMessage(lines);
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
