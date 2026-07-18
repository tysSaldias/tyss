<script lang="ts">
	import { getFeaturedProducts, priceFormat } from '$lib/data/products';

	const featured = $derived(getFeaturedProducts());
</script>

<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
	<div class="mb-10 text-center">
		<h2 class="text-3xl font-bold text-white">Más Vendidos</h2>
		<p class="mt-2 text-gray-400">Los más elegidos por nuestros clientes</p>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each featured as product}
			<a
				href="/producto/{product.id}"
				class="group rounded-xl bg-brand-card p-4 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-purple/10"
			>
				<div class="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-brand-purple/30 to-gray-800">
					{#if product.images && product.images.length > 0}
						<img
							src={product.images[0]}
							alt={product.name}
							class="h-full w-full object-contain p-2"
							width="400"
							height="400"
							loading="lazy"
						/>
					{:else}
						<img
							src="https://placehold.co/400x400/5B21B6/FFFFFF?text={product.name.charAt(0)}&font=raleway"
							alt={product.name}
							class="h-full w-full object-cover"
							width="400"
							height="400"
							loading="lazy"
						/>
					{/if}
				</div>
				<h3 class="font-semibold text-white group-hover:text-brand-yellow">{product.name}</h3>
				<p class="mt-1 text-sm text-gray-400">Desde {priceFormat(product.basePrice)}</p>
				<span class="mt-2 inline-block rounded-full bg-brand-purple/20 px-3 py-0.5 text-xs font-medium text-brand-purple">
					{product.category === 'timbre-personalizable' ? 'Personalizable' : product.category === 'sello-3d' ? 'Sello 3D' : 'Importado'}
				</span>
			</a>
		{/each}
	</div>
</section>
