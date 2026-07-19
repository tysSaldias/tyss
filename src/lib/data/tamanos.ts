import type { SizeOption } from '$lib/types';

export const tamanos: SizeOption[] = [
	{ id: '40x40', name: '40×40', dimensions: '40×40mm', priceModifier: 0, sortOrder: 1 },
	{ id: '70x70', name: '70×70', dimensions: '70×70mm', priceModifier: 1500, sortOrder: 2 },
	{ id: '90x90', name: '90×90', dimensions: '90×90mm', priceModifier: 4400, sortOrder: 3 },
	{ id: '100x100', name: '100×100', dimensions: '100×100mm', priceModifier: 8700, sortOrder: 4 },
	{ id: '120x120', name: '120×120', dimensions: '120×120mm', priceModifier: 12900, sortOrder: 5 },
	{ id: '150x100', name: '150×100', dimensions: '150×100mm', priceModifier: 15800, sortOrder: 6 },
];

export function getTamanioById(id: string): SizeOption | undefined {
	return tamanos.find((t) => t.id === id);
}
