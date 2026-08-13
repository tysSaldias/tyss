<script lang="ts">
	import { getAuthState } from '$lib/stores/auth.svelte';
	import type { Review } from '$lib/types';

	let {
		productId,
		existingReview = null,
		onsubmit
	}: {
		productId: string;
		existingReview?: Review | null;
		onsubmit: (review: Review) => void;
	} = $props();

	const auth = getAuthState();

	let rating = $state(existingReview?.rating ?? 0);
	let comment = $state(existingReview?.comment ?? '');
	let isSubmitting = $state(false);
	let error = $state<string | null>(null);
	let hoverRating = $state(0);

	const isAuthenticated = $derived(auth.isAuthenticated);
	const isEdit = $derived(!!existingReview);
	const submitLabel = $derived(isEdit ? 'Actualizar reseña' : 'Enviar reseña');
	const displayRating = $derived(hoverRating || rating);

	function setRating(value: number) {
		rating = value;
		error = null;
	}

	function handleCommentInput(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		comment = target.value;
		if (comment.length > 1000) {
			error = 'El comentario no puede exceder 1000 caracteres';
		} else {
			error = null;
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (!isAuthenticated) {
			error = 'Inicia sesión para reseñar';
			return;
		}

		if (rating === 0) {
			error = 'Selecciona una calificación';
			return;
		}

		if (comment.length > 1000) {
			error = 'El comentario no puede exceder 1000 caracteres';
			return;
		}

		isSubmitting = true;
		error = null;

		try {
			const response = await fetch('/api/reviews/' + productId, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					rating,
					comment
				})
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Error al guardar la reseña');
			}

			const { review } = await response.json();
			onsubmit(review);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Error al guardar la reseña';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="rounded-xl border border-brand-border bg-brand-card p-6">
	<h3 class="mb-4 text-lg font-semibold text-white">
		{isEdit ? 'Editar tu reseña' : 'Escribir una reseña'}
	</h3>

	{#if !isAuthenticated}
		<p class="text-sm text-gray-400">Inicia sesión para reseñar</p>
	{/if}

	<form onsubmit={handleSubmit} class="space-y-4">
		<!-- Star Rating -->
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-300">
				Calificación
			</label>
			<div class="flex items-center gap-1">
				{#each [1, 2, 3, 4, 5] as star}
					<button
						type="button"
						onclick={() => setRating(star)}
						onmouseenter={() => { hoverRating = star; }}
						onmouseleave={() => { hoverRating = 0; }}
						class="focus:outline-none"
						aria-label="{star} estrella{star !== 1 ? 's' : ''}"
					>
						<svg
							class="h-8 w-8 {displayRating >= star ? 'text-brand-yellow' : 'text-gray-600'} transition-colors"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
						</svg>
					</button>
				{/each}
				{#if rating > 0}
					<span class="ml-2 text-sm text-gray-400">{rating}/5</span>
				{/if}
			</div>
		</div>

		<!-- Comment -->
		<div>
			<label for="comment" class="mb-2 block text-sm font-medium text-gray-300">
				Comentario (opcional)
			</label>
			<textarea
				id="comment"
				value={comment}
				oninput={handleCommentInput}
				maxlength="1000"
				rows="4"
				class="w-full rounded-lg border border-brand-border bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
				placeholder="Comparte tu experiencia con este producto..."
			></textarea>
			<p class="mt-1 text-xs text-gray-500">
				{comment.length}/1000 caracteres
			</p>
		</div>

		<!-- Error message -->
		{#if error}
			<p class="text-sm text-red-400">{error}</p>
		{/if}

		<!-- Submit button -->
		<button
			type="submit"
			disabled={!isAuthenticated || isSubmitting}
			class="inline-flex items-center justify-center rounded-lg bg-brand-purple px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-purple"
		>
			{#if isSubmitting}
				<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
				</svg>
				{isEdit ? 'Actualizando...' : 'Enviando...'}
			{:else}
				{submitLabel}
			{/if}
		</button>
	</form>
</div>