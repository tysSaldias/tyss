<script lang="ts">
</script>

<section class="relative overflow-hidden">
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-to-br from-brand-purple/30 via-gray-900 to-gray-950"></div>

	<!-- Decorative circles -->
	<div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-brand-purple/10 blur-3xl"></div>
	<div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand-yellow/5 blur-3xl"></div>

	<div class="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 sm:px-6 sm:py-32 lg:flex-row lg:py-40">
		<!-- Text content -->
		<div class="flex-1 text-center lg:text-left">
			<h1 class="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
				Timbres y Sellos
				<br />
				<span class="text-brand-yellow">Saldias</span>
			</h1>
			<p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl lg:mx-0">
				Timbres personalizados, sellos 3D y fechadores importados. Calidad artesanal para tu
				negocio en Quilpué, Villa Alemana y Belloto.
			</p>
			<div class="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
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
					class="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-8 py-3 text-sm font-semibold text-gray-200 transition-all hover:border-brand-yellow hover:text-brand-yellow"
				>
					Contáctanos
				</a>
			</div>
		</div>

		<!-- Hero image -->
		<div class="flex-1">
			<div class="aspect-[3/2] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-purple/40 to-brand-yellow/20 shadow-2xl shadow-brand-purple/20">
				<img
					src="/assets/hero-logo.png"
					alt="Timbres y Sellos Saldias - Logo"
					class="h-full w-full object-contain p-4"
					width="1200"
					height="800"
					loading="eager"
				/>
			</div>
		</div>
	</div>
</section>
