import type { ColorOption } from '$lib/types';

export const colores: ColorOption[] = [
	{ id: 'morado-oscuro', name: 'Morado oscuro', hex: '#5B21B6', isPremium: false },
	{ id: 'amarillo', name: 'Amarillo', hex: '#FACC15', isPremium: false },
	{ id: 'rojo', name: 'Rojo', hex: '#DC2626', isPremium: false },
	{ id: 'azul-rey', name: 'Azul rey', hex: '#2563EB', isPremium: false },
	{ id: 'verde-esmeralda', name: 'Verde esmeralda', hex: '#059669', isPremium: false },
	{ id: 'negro', name: 'Negro', hex: '#171717', isPremium: false },
	{ id: 'blanco', name: 'Blanco', hex: '#FAFAFA', isPremium: false },
	{ id: 'naranja', name: 'Naranja', hex: '#EA580C', isPremium: false },
	{ id: 'rosa', name: 'Rosa', hex: '#D946EF', isPremium: false },
	{ id: 'plateado', name: 'Plateado', hex: '#A3A3A3', isPremium: false },
	{ id: 'oro', name: 'Oro', hex: '#D97706', isPremium: true },
	{ id: 'cobrizo', name: 'Cobrizo', hex: '#9A3412', isPremium: true },
];

export function getColorById(id: string): ColorOption | undefined {
	return colores.find((c) => c.id === id);
}
