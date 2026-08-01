<script lang="ts">
	import GaleriaMasonry from '$lib/components/gallery/GaleriaMasonry.svelte';

	// Fotos reales de nuestros productos.
	const galleryImages = [
		{
			src: '/assets/products/xl-60-76x37-portada.png',
			alt: 'Timbre automático rectangular personalizable',
		},
		{
			src: '/assets/products/xl-702-64x40-portada.png',
			alt: 'Fechador automático con fecha variable',
		},
		{
			src: '/assets/products/xl-601-602-negro.png',
			alt: 'Timbre cuadrado automático personalizable',
		},
		{
			src: '/assets/products/Capa 1.png',
			alt: 'Timbre redondo automático para sellos de aprobación',
		},
		{
			src: '/assets/products/Timbre automatico.png',
			alt: 'Timbre automático de bolsillo personalizable',
		},
		{
			src: '/assets/products/Timbre cuadrado manual.png',
			alt: 'Timbre manual con mango de madera y texto personalizado',
		},
		{
			src: '/assets/products/Tampon.png',
			alt: 'Tampón manual de goma para marcar documentos y cajas',
		},
		{
			src: '/assets/products/timbre-233-A.png',
			alt: 'Sello dactilar D233 para huellas',
		},
		{
			src: '/assets/products/Tintas-portada.png',
			alt: 'Tinta para timbres de secado rápido',
		},
		// Trabajos realizados: espacios para las próximas fotos de clientes.
		{
			alt: 'Próximamente: fotos de trabajos reales',
			placeholder: 'Próximamente: fotos de trabajos reales',
		},
		{
			alt: 'Próximamente: timbres personalizados entregados',
			placeholder: 'Próximamente: timbres personalizados entregados',
		},
		{
			alt: 'Tu próximo timbre personalizado',
			placeholder: 'Tu próximo timbre',
		},
	];
</script>

<svelte:head>
	<title>Galería | Timbres y Sellos Saldias</title>
	<meta name="description" content="Galería de productos de Timbres y Sellos Saldias: timbres automáticos, manuales, fechadores, tampones y tinta. Mira la calidad artesanal de nuestros timbres personalizados." />
	<meta property="og:title" content="Galería | Timbres y Sellos Saldias" />
	<meta property="og:description" content="Galería de productos: timbres personalizados, fechadores, tampones y más." />
	<meta property="og:url" content="https://timbres-y-sellos-saldias.netlify.app/galeria" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<h1 class="text-3xl font-bold text-white">Galería</h1>
	<p class="mt-2 text-gray-400">
		Fotos reales de nuestros productos. Muy pronto sumaremos fotos de trabajos realizados
		para clientes.
	</p>

	<div class="mt-8">
		<GaleriaMasonry images={galleryImages} />
	</div>
</section>
