<script lang="ts">
	let {
		rating = 0,
		reviewCount = 0
	}: {
		rating?: number;
		reviewCount?: number;
	} = $props();

	const fullStars = $derived(Math.floor(rating));
	const hasHalf = $derived(rating - fullStars >= 0.3);
	const emptyStars = $derived(5 - fullStars - (hasHalf ? 1 : 0));
</script>

{#if reviewCount > 0}
	<div class="flex items-center gap-1.5">
		<div class="flex items-center gap-0.5">
			{#each Array(fullStars) as _}
				<svg class="h-4 w-4 text-brand-yellow" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			{/each}
			{#if hasHalf}
				<svg class="h-4 w-4 text-brand-yellow" viewBox="0 0 24 24" fill="currentColor">
					<defs>
						<linearGradient id="half-star">
							<stop offset="50%" stop-color="currentColor" />
							<stop offset="50%" stop-color="transparent" />
						</linearGradient>
					</defs>
					<path fill="url(#half-star)" stroke="currentColor" stroke-width="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			{/if}
			{#each Array(emptyStars) as _}
				<svg class="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			{/each}
		</div>
		<span class="text-sm font-medium text-brand-yellow">{rating.toFixed(1)}</span>
		<span class="text-xs text-gray-400">({reviewCount})</span>
	</div>
{/if}
