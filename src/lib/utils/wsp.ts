import type { StampConfig, Product } from '$lib/types';
import { getColorById } from '$lib/data/colores';
import { getTamanioById } from '$lib/data/tamanos';

const WHATSAPP_NUMBER = '56988134375';

export function generateWhatsAppMessage(config: StampConfig, product: Product): string {
	const color = getColorById(config.colorId);
	const size = getTamanioById(config.sizeId);

	const parts: string[] = [];
	parts.push(`Hola! Quiero cotizar: ${product.name}`);

	if (config.text) {
		parts.push(`Texto: ${config.text}`);
	}

	if (color) {
		const colorName = color.isPremium ? `${color.name} (premium)` : color.name;
		parts.push(`Color: ${colorName}`);
	}

	if (size) {
		parts.push(`Tamaño: ${size.name} (${size.dimensions})`);
	}

	parts.push(`Fuente: ${config.fontType}`);

	const message = parts.join(', ');
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateSimpleWhatsAppLink(): string {
	return `https://wa.me/${WHATSAPP_NUMBER}`;
}
