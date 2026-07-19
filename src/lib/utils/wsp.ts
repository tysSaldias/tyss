import type { StampConfig, Product } from '$lib/types';

const WHATSAPP_NUMBER = '56988134375';

export function generateWhatsAppMessage(config: StampConfig, product: Product): string {
	const size = product.availableSizes.find((s) => s.id === config.sizeId);

	const parts: string[] = [];
	parts.push(`Hola! Quiero cotizar: ${product.name}`);

	if (config.text) {
		parts.push(`Texto: ${config.text}`);
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
