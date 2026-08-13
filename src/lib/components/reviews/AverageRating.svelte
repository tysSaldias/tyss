<script lang="ts">
	import type { ProductStats } from '$lib/types';

	let { stats }: { stats: ProductStats } = $props();
</script>

{#if stats.review_count > 0}
	<div class="flex items-center gap-2">
		<div class="flex items-center gap-0.5">
			{#each Array(5) as _, i}
				<svg
					class="h-5 w-5 {i < Math.round(stats.average_rating) ? 'text-brand-yellow' : 'text-gray-600'}"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			{/each}
		</div>
		<span class="text-sm font-medium text-brand-yellow">{stats.average_rating.toFixed(1)}</span>
		<span class="text-xs text-gray-400">({stats.review_count})</span>
	</div>
{/if}