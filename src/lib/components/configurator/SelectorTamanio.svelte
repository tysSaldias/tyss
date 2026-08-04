<script lang="ts">
	import type { SizeOption } from '$lib/types';
	import { priceFormat } from '$lib/data/products';

	let {
		sizes,
		selected,
		basePrice,
		onChange,
		excludedIds = [],
		suggestedId
	}: {
		sizes: SizeOption[];
		selected: string;
		basePrice: number;
		onChange: (sizeId: string) => void;
		excludedIds?: string[];
		suggestedId?: string;
	} = $props();
</script>

<div class="grid gap-2">
	{#each sizes as size}
		{@const isSelected = selected === size.id}
		{@const isComingSoon = size.comingSoon === true}
		{@const isExcluded = excludedIds.includes(size.id)}
		{@const isSuggested = suggestedId === size.id && !isExcluded}
		<button
			type="button"
			disabled={isExcluded}
			onclick={() => !isExcluded && onChange(size.id)}
			class="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-all {isSelected
				? 'border-brand-yellow bg-brand-yellow/10'
				: isExcluded
					? 'cursor-not-allowed border-gray-700 bg-gray-800/50 opacity-50'
					: isComingSoon
						? 'cursor-not-allowed border-gray-700 bg-gray-800/50 opacity-60'
						: 'border-gray-700 bg-gray-800/50 hover:border-gray-500'} {isSuggested && !isSelected
				? 'border-brand-yellow'
				: ''}"
		>
			<div>
				<span class="font-medium text-white">{size.name}</span>
				<span class="ml-2 text-sm text-gray-400">{size.dimensions}</span>
			</div>
			{#if isComingSoon}
				<span class="rounded-full bg-brand-yellow px-2 py-0.5 text-xs font-bold text-gray-900">Próximamente</span>
			{:else if isExcluded}
				<span class="rounded-full bg-gray-700 px-2 py-0.5 text-xs font-bold text-gray-400">No disponible</span>
			{:else}
				<span class="flex items-center gap-2">
					{#if isSuggested}
						<span class="rounded-full bg-brand-yellow px-2 py-0.5 text-xs font-bold text-gray-900">Sugerido</span>
					{/if}
					<span class="text-sm text-gray-300">
						+{priceFormat(size.priceModifier)}
					</span>
				</span>
			{/if}
		</button>
	{/each}
</div>
