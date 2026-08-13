<script lang="ts">
	import { getAuthState } from '$lib/stores/auth.svelte';
	import type { ReviewWithUser, ProductStats } from '$lib/types';

	let {
		reviews,
		stats,
		onEdit
	}: {
		reviews: ReviewWithUser[];
		stats: ProductStats;
		onEdit: (review: ReviewWithUser) => void;
	} = $props();

	const auth = getAuthState();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('es-CL', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function isOwnReview(review: ReviewWithUser): boolean {
		return auth.user?.id === review.user_id;
	}
</script>

<div class="space-y-6">
	<!-- Stats summary -->
	{#if stats.review_count > 0}
		<div class="flex items-center gap-4">
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
				<span class="text-lg font-semibold text-brand-yellow">
					{stats.average_rating.toFixed(1)}
				</span>
			</div>
			<span class="text-sm text-gray-400">
				{stats.review_count} reseña{stats.review_count !== 1 ? 's' : ''}
			</span>
		</div>
	{/if}

	<!-- Reviews list -->
	{#if reviews.length === 0}
		<p class="text-gray-400">No hay reseñas aún</p>
	{:else}
		<div class="space-y-4">
			{#each reviews as review (review.id)}
				<div
					class="rounded-lg border {isOwnReview(review)
						? 'border-brand-purple bg-brand-purple/10'
						: 'border-brand-border bg-brand-card'} p-4"
				>
					<div class="flex items-start justify-between">
						<div class="flex items-center gap-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm font-bold text-white">
								{review.user_name?.charAt(0).toUpperCase() ?? '?'}
							</div>
							<div>
								<p class="font-medium text-white">
									{review.user_name ?? 'Usuario'}
									{#if isOwnReview(review)}
										<span class="ml-2 text-xs text-brand-purple">(tu)</span>
									{/if}
								</p>
								<div class="flex items-center gap-2">
									<div class="flex items-center gap-0.5">
										{#each Array(5) as _, i}
											<svg
												class="h-4 w-4 {i < review.rating ? 'text-brand-yellow' : 'text-gray-600'}"
												viewBox="0 0 24 24"
												fill="currentColor"
											>
												<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
											</svg>
										{/each}
									</div>
									<span class="text-xs text-gray-500">
										{formatDate(review.created_at)}
									</span>
								</div>
							</div>
						</div>
						{#if isOwnReview(review)}
							<button
								onclick={() => onEdit(review)}
								class="text-sm text-brand-purple hover:text-brand-purple/80"
							>
								Editar
							</button>
						{/if}
					</div>
					{#if review.comment}
						<p class="mt-3 text-gray-300">{review.comment}</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>