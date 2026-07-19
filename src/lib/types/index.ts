export type FontType = 'sans' | 'serif' | 'script' | 'mono';

export type Category = 'timbre-personalizable' | 'timbre-importado' | 'sello-3d';

export interface Product {
	id: string;
	name: string;
	description: string;
	category: Category;
	basePrice: number;
	images: string[];
	availableColors: string[];
	availableSizes: SizeOption[];
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
}

export interface StampConfig {
	text: string;
	fontType: FontType;
	colorId: string;
	sizeId: string;
}
