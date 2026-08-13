<script lang="ts">
	import { products, priceFormat } from '$lib/data/products';

	let { currentProductId }: { currentProductId: string } = $props();

	const relatedProducts = $derived(products.filter((p) => p.id !== currentProductId && p.isActive));

	let scrollContainer = $state<HTMLDivElement | null>(null);

	function scrollLeft() {
		scrollContainer?.scrollBy({ left: -300, behavior: 'smooth' });
	}

	function scrollRight() {
		scrollContainer?.scrollBy({ left: 300, behavior: 'smooth' });
	}
</script>

{#if relatedProducts.length > 0}
	<section class="mt-12">
		<h2 class="mb-6 text-2xl font-bold text-white">Productos relacionados</h2>

		<div class="relative">
			<!-- Scroll buttons -->
			<button
				onclick={scrollLeft}
				class="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-800 p-2 text-white shadow-lg transition-colors hover:bg-gray-700"
				aria-label="Anterior"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<button
				onclick={scrollRight}
				class="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-800 p-2 text-white shadow-lg transition-colors hover:bg-gray-700"
				aria-label="Siguiente"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<!-- Products scroll container -->
			<div
				bind:this={scrollContainer}
				class="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
				style="scrollbar-width: none; -ms-overflow-style: none;"
			>
				{#each relatedProducts as product (product.id)}
					<a
						href="/producto/{product.id}"
						class="group flex-none snap-start rounded-xl bg-gray-800/50 p-4 transition-all hover:bg-gray-800 hover:shadow-lg w-48"
					>
						<div class="aspect-square overflow-hidden rounded-lg bg-gray-700/50">
							{#if product.images && product.images.length > 0}
								<img
									src={product.images[0]}
									alt={product.name}
									class="h-full w-full object-contain p-2 transition-transform group-hover:scale-105"
									loading="lazy"
								/>
							{:else}
								<img
									src="https://placehold.co/200x200/5B21B6/FFFFFF?text={product.name.charAt(0)}&font=raleway"
									alt={product.name}
									class="h-full w-full object-cover"
									loading="lazy"
								/>
							{/if}
						</div>
						<h3 class="mt-3 text-sm font-medium text-white line-clamp-2 group-hover:text-brand-yellow">
							{product.name}
						</h3>
						<p class="mt-1 text-sm font-bold text-brand-yellow">
							{priceFormat(product.basePrice)}
						</p>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}
