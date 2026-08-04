export type FontType = 'sans' | 'serif' | 'script' | 'mono';

export type Category = 'timbre-personalizable' | 'timbre-importado' | 'sello-3d';

export interface Product {
	id: string;
	name: string;
	description: string;
	category: Category;
	basePrice: number;
	images: string[];
	// Optional reference images showing what fits inside the stamp, per size.
	referenceImages?: string[];
	availableColors: string[];
	availableSizes: SizeOption[];
	// Max characters per size, aligned with availableSizes order.
	charLimits?: number[];
	// Size ids excluded when the design includes a logo.
	logoExcludedSizeIds?: string[];
	availableFonts: FontType[];
	isCustomizable: boolean;
	hasTextInput: boolean;
	isActive: boolean;
	featured: boolean;
	comingSoon: boolean;
	order: number;
}

export interface ColorOption {
	id: string;
	name: string;
	hex: string;
	isPremium: boolean;
}

export interface SizeOption {
	id: string;
	name: string;
	dimensions: string;
	priceModifier: number;
	sortOrder: number;
	// If true, the size is displayed but not yet purchasable.
	comingSoon?: boolean;
}

export interface StampConfig {
	text: string;
	fontType: FontType;
	colorId: string;
	sizeId: string;
	hasLogo: boolean;
}
