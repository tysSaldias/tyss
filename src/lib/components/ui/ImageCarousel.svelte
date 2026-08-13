<script lang="ts">
	import { onMount } from 'svelte';

	let { images = [], alt = 'Galería', index = 0 }: { images: string[]; alt?: string; index?: number } = $props();

	let currentIndex = $state(index);
	let touchStartX = 0;
	let touchEndX = 0;

	// Sync with external index prop
	$effect(() => {
		currentIndex = index;
	});

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function goTo(i: number) {
		currentIndex = i;
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].clientX;
		const diff = touchStartX - touchEndX;
		if (Math.abs(diff) > 50) {
			if (diff > 0) next();
			else prev();
		}
	}

	onMount(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	});
</script>

<div
	class="carousel relative w-full overflow-hidden rounded-xl border border-brand-border bg-brand-card"
	role="region"
	aria-label={alt}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<!-- Image -->
	<div class="relative w-full overflow-hidden">
		{#each images as src, i (src)}
			<img
				{src}
				alt="{alt} {i + 1}"
				class="w-full object-contain transition-opacity duration-300"
				class:opacity-100={i === currentIndex}
				class:opacity-0={i !== currentIndex}
				class:absolute={i !== currentIndex}
				class:inset-0={i !== currentIndex}
				class:h-full={i !== currentIndex}
				loading={i === 0 ? 'eager' : 'lazy'}
			/>
		{/each}
	</div>

	<!-- Controls -->
	{#if images.length > 1}
		<button
			onclick={prev}
			class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
			aria-label="Anterior"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
			</svg>
		</button>
		<button
			onclick={next}
			class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
			aria-label="Siguiente"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
			</svg>
		</button>

		<!-- Dots -->
		<div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
			{#each images as _, i}
				<button
					onclick={() => goTo(i)}
					class="h-2 w-2 rounded-full transition-colors {i === currentIndex ? 'bg-white' : 'bg-white/40'}"
					aria-label="Imagen {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>
