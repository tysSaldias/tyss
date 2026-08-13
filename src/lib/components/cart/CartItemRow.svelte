<script lang="ts">
	import type { CartLine } from '$lib/stores/cart.svelte';
	import { priceFormat } from '$lib/data/products';

	let {
		line,
		onToggle,
		onDelete,
	}: {
		line: CartLine;
		onToggle: (key: string) => void;
		onDelete: (key: string) => void;
	} = $props();

	function truncate(text: string, max = 40): string {
		return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
	}
</script>

<div class="flex items-center gap-3 rounded-xl bg-gray-800/50 p-3">
	<!-- Selection circle -->
	<button
		onclick={() => onToggle(line.key)}
		aria-label={line.selected ? `Deseleccionar ${line.name}` : `Seleccionar ${line.name}`}
		class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors
			{line.selected ? 'border-green-500 bg-green-500 text-white' : 'border-gray-500 bg-transparent text-transparent hover:border-gray-400'}"
	>
		{#if line.selected}
			<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
				<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
			</svg>
		{/if}
	</button>

	<!-- Thumbnail -->
	<img
		src={line.image}
		alt={line.name}
		width="48"
		height="48"
		class="h-12 w-12 shrink-0 rounded-lg object-contain"
	/>

	<!-- Details -->
	<div class="min-w-0 flex-1">
		<p class="truncate text-sm font-semibold text-white">{truncate(line.name)}</p>
		{#if line.sizeName}
			<p class="text-xs text-gray-400">
				{line.sizeName}{line.sizeDimensions ? ` (${line.sizeDimensions})` : ''}
			</p>
		{/if}
		{#if line.text}
			<p class="text-xs text-gray-400">Texto: {truncate(line.text, 25)}</p>
		{/if}
		<p class="mt-0.5 text-xs text-gray-500">
			{priceFormat(line.unitPrice)} × {line.quantity}
		</p>
	</div>

	<!-- Line total + delete -->
	<div class="flex shrink-0 flex-col items-end gap-1">
		<span class="text-sm font-bold text-brand-yellow">
			{priceFormat(line.unitPrice * line.quantity)}
		</span>
		<button
			onclick={() => onDelete(line.key)}
			aria-label={`Eliminar ${line.name}`}
			class="rounded-md p-1 text-gray-500 transition-colors hover:bg-red-500/20 hover:text-red-400"
		>
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
</div>
