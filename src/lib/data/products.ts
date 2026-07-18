import type { Product } from '$lib/types';

export const products: Product[] = [
	{
		id: 'timbre-circular-personalizable',
		name: 'Timbre Circular Personalizable',
		description:
			'Timbre circular clásico ideal para empresas, profesionales y emprendedores. Cuerpo de goma vulcanizada con mango de madera barnizada. Personaliza con tu texto, fuente y color favorito.',
		category: 'timbre-personalizable',
		basePrice: 7990,
		images: ['/assets/products/timbre-233-A.png'],
		availableColors: [
			'morado-oscuro',
			'amarillo',
			'rojo',
			'azul-rey',
			'verde-esmeralda',
			'negro',
			'blanco',
			'naranja',
			'rosa',
			'plateado',
			'oro',
			'cobrizo',
		],
		availableSizes: ['mini', 'pequeno', 'mediano', 'grande', 'super'],
		availableFonts: ['sans', 'serif', 'script', 'mono'],
		isCustomizable: true,
		isActive: true,
		featured: false,
		order: 1,
	},
	{
		id: 'timbre-rectangular-personalizable',
		name: 'Timbre Rectangular Personalizable',
		description:
			'Timbre rectangular con mayor espacio para texto. Perfecto para direcciones completas, razón social o datos de contacto. Incluye mango ergonómico y estuche protector.',
		category: 'timbre-personalizable',
		basePrice: 8990,
		images: ['/assets/products/Timbre cuadrado manual.png'],
		availableColors: [
			'morado-oscuro',
			'rojo',
			'azul-rey',
			'verde-esmeralda',
			'negro',
			'blanco',
			'naranja',
			'plateado',
			'oro',
			'cobrizo',
		],
		availableSizes: ['pequeno', 'mediano', 'grande', 'super'],
		availableFonts: ['sans', 'serif', 'script', 'mono'],
		isCustomizable: true,
		isActive: true,
		featured: true,
		order: 2,
	},
	{
		id: 'timbre-cuadrado-personalizable',
		name: 'Timbre Cuadrado Personalizable',
		description:
			'Timbre cuadrado de alta definición. Diseño moderno con superficie de impresión amplia. Ideal para logos y diseños que requieren proporciones equilibradas.',
		category: 'timbre-personalizable',
		basePrice: 8490,
		images: ['/assets/products/Capa 1.png'],
		availableColors: [
			'morado-oscuro',
			'rojo',
			'azul-rey',
			'verde-esmeralda',
			'negro',
			'blanco',
			'naranja',
			'plateado',
			'oro',
		],
		availableSizes: ['pequeno', 'mediano', 'grande'],
		availableFonts: ['sans', 'serif', 'script', 'mono'],
		isCustomizable: true,
		isActive: true,
		featured: false,
		order: 3,
	},
	{
		id: 'sello-3d-empresa',
		name: 'Sello 3D Corporativo',
		description:
			'Sello seco en relieve 3D para documentos oficiales. Genera una impresión en alto relieve sin tinta. Incluye marco metálico cromado y base de aluminio pulido.',
		category: 'sello-3d',
		basePrice: 15990,
		images: ['/assets/products/xl-601-602-negro.png'],
		availableColors: [],
		availableSizes: ['pequeno', 'mediano', 'grande'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: true,
		order: 4,
	},
	{
		id: 'sello-3d-notarial',
		name: 'Sello 3D Notarial',
		description:
			'Sello seco profesional con diseño notarial clásico. Cuerpo de latón niquelado con empuñadura de madera. Incluye estuche de presentación.',
		category: 'sello-3d',
		basePrice: 18990,
		images: ['/assets/products/xl-702-64x40-portada.png'],
		availableColors: [],
		availableSizes: ['mediano', 'grande'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: false,
		order: 5,
	},
	{
		id: 'timbre-fecha-importado',
		name: 'Timbre Fechador Automático',
		description:
			'Timbre fechador automático importado con cinta entintada reemplazable. Marco de plástico reforzado con ventana para visualizar la fecha. Incluye tinta negra y roja.',
		category: 'timbre-importado',
		basePrice: 12990,
		images: ['/assets/products/Timbre automatico.png'],
		availableColors: [],
		availableSizes: ['mediano'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: true,
		order: 6,
	},
	{
		id: 'timbre-numerador-importado',
		name: 'Timbre Numerador Automático 6 Cifras',
		description:
			'Numerador automático importado de 6 cifras con mecanismo de avance progresivo. Carcasa metálica con base entintada. Ideal para facturación y documentos seriados.',
		category: 'timbre-importado',
		basePrice: 14990,
		images: ['/assets/products/xl-60-76x37-portada.png'],
		availableColors: [],
		availableSizes: ['mediano'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: false,
		order: 7,
	},
	{
		id: 'tinta-para-timbres',
		name: 'Tinta para Timbres',
		description:
			'Tinta especial para timbres y sellos. Disponible en varios colores. Fórmula de secado rápido que garantiza impresiones nítidas y duraderas.',
		category: 'timbre-importado',
		basePrice: 3990,
		images: ['/assets/products/Tintas-portada.png'],
		availableColors: [],
		availableSizes: ['mediano'],
		availableFonts: [],
		isCustomizable: false,
		isActive: true,
		featured: true,
		order: 8,
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
