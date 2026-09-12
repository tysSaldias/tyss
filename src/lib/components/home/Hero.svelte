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
		<Carousel.Content class="ms-0 h-[70dvh] min-h-[480px] max-h-[720px]">
			{#each images as src, i (src)}
				<Carousel.Item class="basis-full ps-0">
					<div class="relative h-full w-full overflow-hidden">
						<img
							src={src}
							alt={`Banner Timbres y Sellos Saldias ${i + 1}`}
							class="h-full w-full object-cover"
							loading={i === 0 ? 'eager' : 'lazy'}
							width="1600"
							height="900"
						/>
						<!-- Dark overlay for readability -->
						<div
							class="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/50 to-transparent"
						></div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>

		<!-- Overlay text + CTAs -->
		<div class="pointer-events-none absolute inset-0 flex items-center">
			<div class="mx-auto w-full max-w-7xl px-4 sm:px-6">
				<div class="max-w-2xl">
					<h1 class="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
						Timbres y Sellos
						<br />
						<span class="text-brand-yellow">Saldias</span>
					</h1>
					<p class="mt-4 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl">
						Timbres personalizados, sellos 3D y fechadores importados. Calidad artesanal para
						tu negocio en Quilpué, Villa Alemana, Belloto y Peña Blanca.
					</p>
					<div class="pointer-events-auto mt-8 flex flex-col items-start gap-4 sm:flex-row">
						<a
							href="/catalogo"
							class="inline-flex items-center gap-2 rounded-lg bg-brand-purple px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90 hover:shadow-lg hover:shadow-brand-purple/25"
						>
							Ver Catálogo
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
						<a
							href="/contacto"
							class="inline-flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-950/40 px-8 py-3 text-sm font-semibold text-gray-200 transition-all hover:border-brand-yellow hover:text-brand-yellow"
						>
							Contáctanos
						</a>
					</div>
				</div>
			</div>
		</div>

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