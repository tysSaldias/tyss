import type { PageServerLoad } from './$types';
import { fetchDynamicPrices, applyAllPriceOverrides } from '$lib/utils/prices';
import { products } from '$lib/data/products';
import type { Product } from '$lib/types';

declare const process: { env: Record<string, string | undefined> };

export const load: PageServerLoad = async () => {
	const apiKey = process.env.ROOTERVALIS_API_KEY;

	let dynamicProducts: Product[] = products;

	if (apiKey) {
		const priceMap = await fetchDynamicPrices(apiKey);
		if (priceMap) {
			dynamicProducts = applyAllPriceOverrides(priceMap);
		}
	}

	return {
		products: dynamicProducts,
	};
};
