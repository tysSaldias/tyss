<script lang="ts">
	import type { Product } from '$lib/types';
	import ProductCard from './ProductCard.svelte';

	let { products }: { products: Product[] } = $props();
</script>

{#if products.length === 0}
	<div class="col-span-full py-16 text-center">
		<p class="text-gray-400">No hay productos en esta categoría.</p>
	</div>
{:else}
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each products as product (product.id)}
			<ProductCard {product} />
		{/each}
	</div>
{/if}
