import type { SizeOption } from '$lib/types';

export const tamanos: SizeOption[] = [
	{ id: 'mini', name: 'Mini', dimensions: '20×15mm', priceModifier: 0, sortOrder: 1 },
	{ id: 'pequeno', name: 'Pequeño', dimensions: '30×20mm', priceModifier: 1000, sortOrder: 2 },
	{ id: 'mediano', name: 'Mediano', dimensions: '45×30mm', priceModifier: 2000, sortOrder: 3 },
	{ id: 'grande', name: 'Grande', dimensions: '60×40mm', priceModifier: 3500, sortOrder: 4 },
	{ id: 'super', name: 'Súper', dimensions: '80×50mm', priceModifier: 5000, sortOrder: 5 },
];

export function getTamanioById(id: string): SizeOption | undefined {
	return tamanos.find((t) => t.id === id);
}
