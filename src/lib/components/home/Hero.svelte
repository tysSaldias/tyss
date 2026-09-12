<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import Autoplay from 'embla-carousel-autoplay';

	const images = ['/assets/hero/hero-1.jpg', '/assets/hero/hero-2.jpg', '/assets/hero/hero-3.jpg'];

	let api = $state<CarouselAPI>();
	let selected = $state(0);
	const count = $derived(api ? api.scrollSnapList().length : 0);

	$effect(() => {
		if (api) {
			selected = api.selectedScrollSnap() + 1;
			const onSelect = () => {
				selected = api!.selectedScrollSnap() + 1;
			};
			api.on('select', onSelect);
			return () => api!.off('select', onSelect);
		}
	});

	const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });
</script>

<section class="relative overflow-hidden">
	<Carousel.Root
		setApi={(emblaApi) => (api = emblaApi)}
		class="relative w-full"
		opts={{ loop: true, align: 'start' }}
		plugins={[autoplay]}
	>
		<!-- Native aspect ratio (1608x864-ish) so full images fit without cropping -->
		<Carousel.Content class="ms-0 aspect-[1608/864] w-full max-h-[85dvh]">
			{#each images as src, i (src)}
				<Carousel.Item class="basis-full ps-0">
					<div class="relative h-full w-full overflow-hidden">
						<img
							src={src}
							alt={`Banner Timbres y Sellos Saldias ${i + 1}`}
							class="h-full w-full object-contain"
							loading={i === 0 ? 'eager' : 'lazy'}
							width="1608"
							height="858"
						/>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>

		<!-- Prev/Next -->
		<Carousel.Previous class="start-4 md:start-8" variant="outline" size="icon-lg" />
		<Carousel.Next class="end-4 md:end-8" variant="outline" size="icon-lg" />

		<!-- Dots -->
		{#if count > 1}
			<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
				{#each Array(count) as _, i}
					<button
						onclick={() => api?.scrollTo(i)}
						aria-label={`Ir a la imagen ${i + 1}`}
						class="h-2.5 rounded-full transition-all {i === selected - 1 ? 'w-6 bg-brand-yellow' : 'w-2.5 bg-white/50 hover:bg-white/80'}"
					></button>
				{/each}
			</div>
		{/if}
	</Carousel.Root>
</section>