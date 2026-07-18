import type { Product } from '$lib/types';

export const products: Product[] = [
	// ═══════════════════════════════════════════════════════════
	// TIMBRES DE GOMA — Personalizables con tu logo
	// ═══════════════════════════════════════════════════════════
	{
		id: 'timbre-automatico-rectangular',
		name: 'Timbre Automático Rectangular',
		description:
			'Timbre automático de goma personalizable con tu logo o texto. Disponible en 4 tamaños: XL10 (12×25mm), XL20 (15×36mm), XL30 (19×46mm) y XL40 (22×57mm). Ideal para documentos, facturas y correspondence.',
		category: 'timbre-personalizable',
		basePrice: 8900,
		images: ['/assets/products/Timbre automatico.png'],
		availableColors: [
			'morado-oscuro', 'rojo', 'azul-rey', 'verde-esmeralda',
			'negro', 'blanco', 'naranja', 'plateado', 'oro', 'cobrizo',
		],
		availableSizes: ['XL10', 'XL20', 'XL30', 'XL40'],
		availableFonts: ['sans', 'serif', 'script', 'mono'],
		isCustomizable: true,
		isActive: true,
		featured: true,
		order: 1,
	},
	{
		id: 'fechador-automatico',
		name: 'Fechador Automático',
		description:
			'Timbre fechador automático con cinta entintada reemplazable. Disponible en XL703 (50×30mm) y XL704 (64×40mm). Marco de plástico reforzado con ventana para visualizar la fecha.',
		category: 'timbre-personalizable',
		basePrice: 31500,
		images: ['/assets/products/xl-702-64x40-portada.png'],
		availableColors: [],
		availableSizes: ['XL703', 'XL704'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: true,
		order: 2,
	},
	{
		id: 'timbre-cuadrado-automatico',
		name: 'Timbre Cuadrado Automático',
		description:
			'Timbre cuadrado de goma personalizable con tu logo. Disponible en XL601 (30×30mm) y XL602 (40×40mm). Diseño moderno con superficie de impresión amplia.',
		category: 'timbre-personalizable',
		basePrice: 21900,
		images: ['/assets/products/xl-601-602-negro.png'],
		availableColors: [
			'morado-oscuro', 'rojo', 'azul-rey', 'verde-esmeralda',
			'negro', 'blanco', 'naranja', 'plateado', 'oro',
		],
		availableSizes: ['XL601', 'XL602'],
		availableFonts: ['sans', 'serif', 'script', 'mono'],
		isCustomizable: true,
		isActive: true,
		featured: true,
		order: 3,
	},
	{
		id: 'timbre-redondo-automatico',
		name: 'Timbre Redondo Automático',
		description:
			'Timbre redondo de goma personalizable con tu logo. Disponible en XL803 (Ø 30mm) y XL804 (Ø 43mm). Forma circular ideal para sellos de aprobación y logotipos.',
		category: 'timbre-personalizable',
		basePrice: 21900,
		images: ['/assets/products/Capa 1.png'],
		availableColors: [
			'morado-oscuro', 'rojo', 'azul-rey', 'verde-esmeralda',
			'negro', 'blanco', 'naranja', 'plateado', 'oro',
		],
		availableSizes: ['XL803', 'XL804'],
		availableFonts: ['sans', 'serif', 'script', 'mono'],
		isCustomizable: true,
		isActive: true,
		featured: false,
		order: 4,
	},
	{
		id: 'timbre-portatil',
		name: 'Timbre Portátil Bolsillo',
		description:
			'Timbre compacto de bolsillo (49×19mm). Perfecto para llevar siempre contigo. Goma personalizable con tu texto o logo.',
		category: 'timbre-personalizable',
		basePrice: 15900,
		images: ['/assets/products/xl-60-76x37-portada.png'],
		availableColors: [
			'negro', 'rojo', 'azul-rey',
		],
		availableSizes: ['Bolsillo'],
		availableFonts: ['sans', 'serif', 'script', 'mono'],
		isCustomizable: true,
		isActive: true,
		featured: false,
		order: 5,
	},

	// ═══════════════════════════════════════════════════════════
	// TIMBRES MANUALES
	// ═══════════════════════════════════════════════════════════
	{
		id: 'timbre-manual',
		name: 'Timbre Manual',
		description:
			'Timbre manual de goma con mango de madera. Disponible en 6 tamaños: 40×40mm ($12.800), 70×70mm ($14.300), 90×90mm ($17.200), 100×100mm ($21.500), 120×120mm ($25.700) y 150×100mm ($28.600).',
		category: 'timbre-personalizable',
		basePrice: 12800,
		images: ['/assets/products/Timbre cuadrado manual.png'],
		availableColors: [
			'negro', 'rojo', 'azul-rey', 'verde-esmeralda',
		],
		availableSizes: ['40x40', '70x70', '90x90', '100x100', '120x120', '150x100'],
		availableFonts: ['sans', 'serif', 'script', 'mono'],
		isCustomizable: true,
		isActive: true,
		featured: true,
		order: 6,
	},
	{
		id: 'tampon-manual',
		name: 'Tampón Manual',
		description:
			'Tampón de goma manual para marcar con tinta. Disponible en 6 tamaños: 40×40mm ($4.900), 70×70mm ($5.900), 90×90mm ($6.900), 100×100mm ($7.900), 120×120mm ($8.900) y 150×100mm ($10.900).',
		category: 'timbre-importado',
		basePrice: 4900,
		images: ['/assets/products/Tampon.png'],
		availableColors: [],
		availableSizes: ['40x40', '70x70', '90x90', '100x100', '120x120', '150x100'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: false,
		order: 7,
	},

	// ═══════════════════════════════════════════════════════════
	// ACCESORIOS
	// ═══════════════════════════════════════════════════════════
	{
		id: 'dactilar-d233',
		name: 'Dactilar D233',
		description:
			'Sello dactilar de goma para huellas. Modelo D233 con Ø 34mm. Ideal para marcar documentos con huella dactilar personalizada.',
		category: 'timbre-personalizable',
		basePrice: 3900,
		images: ['/assets/products/timbre-233-A.png'],
		availableColors: [],
		availableSizes: ['D233'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: false,
		order: 8,
	},
	{
		id: 'tinta-timbres',
		name: 'Tinta para Timbres',
		description:
			'Tinta especial para timbres y sellos. Presentación de 29cc. Fórmula de secado rápido que garantiza impresiones nítidas y duraderas.',
		category: 'timbre-importado',
		basePrice: 6500,
		images: ['/assets/products/Tintas-portada.png'],
		availableColors: ['negro', 'rojo', 'azul'],
		availableSizes: ['29cc'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: true,
		order: 9,
	},
];

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((p) => p.id === slug);
}

export function getFeaturedProducts(): Product[] {
	return products.filter((p) => p.isActive && p.featured).sort((a, b) => a.order - b.order);
}

export function getProductsByCategory(category: string): Product[] {
	if (!category || category === 'todos') return products.filter((p) => p.isActive);
	return products.filter((p) => p.isActive && p.category === category);
}

export const priceFormat = (price: number): string =>
	new Intl.NumberFormat('es-CL', {
		style: 'currency',
		currency: 'CLP',
		maximumFractionDigits: 0,
	}).format(price);
