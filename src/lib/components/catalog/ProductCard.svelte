<script lang="ts">
	import type { Product } from '$lib/types';
	import { priceFormat } from '$lib/data/products';

	let { product }: { product: Product } = $props();

	const categoryLabel = $derived(
		product.category === 'timbre-personalizable'
			? 'Personalizable'
			: product.category === 'sello-3d'
				? 'Sello 3D'
				: 'Importado'
	);
</script>

<a
	href="/producto/{product.id}"
	class="group flex flex-col overflow-hidden rounded-xl bg-brand-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-purple/10"
>
	<div class="aspect-square w-full overflow-hidden bg-gradient-to-br from-brand-purple/30 to-gray-800">
		{#if product.images && product.images.length > 0}
			<img
				src={product.images[0]}
				alt={product.name}
				class="h-full w-full object-contain p-2 transition-transform group-hover:scale-105"
				width="400"
				height="400"
				loading="lazy"
			/>
		{:else}
			<img
				src="https://placehold.co/400x400/5B21B6/FFFFFF?text={product.name.charAt(0)}&font=raleway"
				alt={product.name}
				class="h-full w-full object-cover transition-transform group-hover:scale-105"
				width="400"
				height="400"
				loading="lazy"
			/>
		{/if}
	</div>
	<div class="flex flex-1 flex-col p-4">
		<span class="mb-1 inline-block self-start rounded-full bg-brand-purple/20 px-3 py-0.5 text-xs font-medium text-brand-purple">
			{categoryLabel}
		</span>
		<h3 class="mt-1 font-semibold text-white group-hover:text-brand-yellow">{product.name}</h3>
		<p class="mt-auto pt-2 text-sm text-gray-400">
			Desde <span class="font-medium text-white">{priceFormat(product.basePrice)}</span>
		</p>
	</div>
</a>
