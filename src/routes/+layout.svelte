<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import WhatsAppFloat from '$lib/components/layout/WhatsAppFloat.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Timbres y Sellos Saldías | Timbres y Sellos Personalizados</title>
	<meta name="description" content="Timbres personalizados, sellos 3D y fechadores importados en Quilpué, Villa Alemana y Belloto. Calidad artesanal para tu negocio. ¡Cotiza por WhatsApp!" />
	<meta name="keywords" content="timbres, sellos, quilpué, villa alemana, belloto, timbres personalizados, sellos 3d" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Timbres y Sellos Saldías | Timbres y Sellos Personalizados" />
	<meta property="og:description" content="Timbres personalizados, sellos 3D y fechadores importados en Quilpué, Villa Alemana y Belloto." />
	<meta property="og:url" content="https://tys-saldias.cl" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://tys-saldias.cl" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-gray-900 text-gray-200">
	<Header />
	<main class="flex-1 pt-16">
		{@render children()}
	</main>
	<Footer />
	<WhatsAppFloat />
</div>
