<script lang="ts">
	import type { Category } from '$lib/types';

	let {
		active,
		onChange
	}: {
		active: string;
		onChange: (category: string) => void;
	} = $props();

	const categories: { id: string; label: string }[] = [
		{ id: 'todos', label: 'Todos' },
		{ id: 'timbre-personalizable', label: 'Timbres de Goma' },
		{ id: 'timbre-importado', label: 'Accesorios' },
	];
</script>

<div class="flex flex-wrap gap-2">
	{#each categories as cat}
		<button
			onclick={() => onChange(cat.id)}
			class="rounded-full px-4 py-2 text-sm font-medium transition-all {active === cat.id
				? 'bg-brand-purple text-white shadow-sm'
				: 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"
		>
			{cat.label}
		</button>
	{/each}
</div>
