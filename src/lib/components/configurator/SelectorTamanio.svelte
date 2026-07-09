<script lang="ts">
	import type { SizeOption } from '$lib/types';
	import { priceFormat } from '$lib/data/products';

	let {
		sizes,
		selected,
		basePrice,
		onChange
	}: {
		sizes: SizeOption[];
		selected: string;
		basePrice: number;
		onChange: (sizeId: string) => void;
	} = $props();
</script>

<div class="grid gap-2">
	{#each sizes as size}
		<button
			onclick={() => onChange(size.id)}
			class="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-all {selected === size.id
				? 'border-brand-yellow bg-brand-yellow/10'
				: 'border-gray-700 bg-gray-800/50 hover:border-gray-500'}"
		>
			<div>
				<span class="font-medium text-white">{size.name}</span>
				<span class="ml-2 text-sm text-gray-400">{size.dimensions}</span>
			</div>
			<span class="text-sm text-gray-300">
				+{priceFormat(size.priceModifier)}
			</span>
		</button>
	{/each}
</div>
