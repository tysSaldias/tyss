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
		{ id: 'timbre-personalizable', label: 'Timbres Personalizables' },
		{ id: 'sello-3d', label: 'Sellos 3D' },
		{ id: 'timbre-importado', label: 'Importados' },
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
