<script lang="ts">
	import GaleriaMasonry from '$lib/components/gallery/GaleriaMasonry.svelte';

	const galleryImages = [
		{
			src: 'https://placehold.co/600x400/5B21B6/FFFFFF?text=Timbre+Circular&font=raleway',
			alt: 'Timbre circular personalizable color morado',
		},
		{
			src: 'https://placehold.co/600x500/7C3AED/FFFFFF?text=Timbre+Rectangular&font=raleway',
			alt: 'Timbre rectangular con texto corporativo',
		},
		{
			src: 'https://placehold.co/600x350/D97706/FFFFFF?text=Sello+3D+Oro&font=raleway',
			alt: 'Sello 3D con baño dorado para documentos oficiales',
		},
		{
			src: 'https://placehold.co/600x450/2563EB/FFFFFF?text=Timbre+Azul+Rey&font=raleway',
			alt: 'Timbre personalizado color azul rey para oficina',
		},
	];
</script>

<svelte:head>
	<title>Galería | Timbres y Sellos Saldias</title>
	<meta name="description" content="Galería de trabajos realizados: timbres personalizados, sellos 3D y fechadores. Mira la calidad artesanal de Timbres y Sellos Saldias." />
	<meta property="og:title" content="Galería | Timbres y Sellos Saldias" />
	<meta property="og:description" content="Galería de trabajos realizados: timbres personalizados, sellos 3D y fechadores." />
	<meta property="og:url" content="https://tys-saldias.cl/galeria" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<h1 class="text-3xl font-bold text-white">Galería</h1>
	<p class="mt-2 text-gray-400">Algunos de nuestros trabajos realizados.</p>

	<div class="mt-8">
		<GaleriaMasonry images={galleryImages} />
	</div>
</section>
