<script lang="ts">
	import type { ColorOption } from '$lib/types';

	let {
		colors,
		selected,
		onChange
	}: {
		colors: ColorOption[];
		selected: string;
		onChange: (colorId: string) => void;
	} = $props();
</script>

<div class="grid grid-cols-4 gap-2 sm:grid-cols-6">
	{#each colors as color}
		<button
			onclick={() => onChange(color.id)}
			class="relative flex aspect-square w-full items-center justify-center rounded-full transition-all hover:scale-110"
			style="background-color: {color.hex}; {selected === color.id ? 'outline: 3px solid #FACC15; outline-offset: 2px;' : ''}"
			title={color.name}
			aria-label={color.name}
		>
			{#if selected === color.id}
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke={color.hex === '#FAFAFA' || color.hex === '#FACC15' ? '#171717' : 'white'} stroke-width="3">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			{/if}

			{#if color.isPremium}
				<span class="absolute -top-1 -right-1 rounded-full bg-brand-yellow px-1.5 py-0.5 text-[8px] font-bold text-gray-900 shadow-sm">
					PREMIUM
				</span>
			{/if}
		</button>
	{/each}
</div>
