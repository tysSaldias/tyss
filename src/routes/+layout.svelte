<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import WhatsAppFloat from '$lib/components/layout/WhatsAppFloat.svelte';
	import { SITE_URL, INSTAGRAM_URL } from '$lib/data/site';
	import { page } from '$app/state';

	let { children } = $props();

	const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname === '/' ? '' : page.url.pathname}`);

	// LocalBusiness structured data (Store) — main branch, Av. Valparaíso 1311.
	const localBusinessSchema = {
		'@context': 'https://schema.org',
		'@type': 'Store',
		name: 'Timbres y Sellos Saldias',
		url: SITE_URL,
		telephone: '+56 9 8813 4375',
		email: 'timbresysellossaldias@gmail.com',
		image: `${SITE_URL}/assets/hero-logo.png`,
		priceRange: '$',
		currenciesAccepted: 'CLP',
		paymentAccepted: 'Efectivo, Transferencia, Tarjeta, Contra entrega',
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			opens: '10:00',
			closes: '18:00'
		},
		sameAs: [INSTAGRAM_URL],
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Av. Valparaíso 1311',
			addressLocality: 'Villa Alemana',
			addressRegion: 'Valparaíso',
			addressCountry: 'CL'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: -33.0457774,
			longitude: -71.3937538
		}
	};
</script>

<svelte:head>
	<title>Timbres y Sellos Saldias | Timbres y Sellos Personalizados</title>
	<meta name="description" content="Timbres personalizados, sellos 3D y fechadores importados en Quilpué, Villa Alemana y Belloto. Calidad artesanal para tu negocio. ¡Cotiza por WhatsApp!" />
	<meta name="keywords" content="timbres, sellos, quilpué, villa alemana, belloto, timbres personalizados, sellos 3d" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Timbres y Sellos Saldias | Timbres y Sellos Personalizados" />
	<meta property="og:description" content="Timbres personalizados, sellos 3D y fechadores importados en Quilpué, Villa Alemana y Belloto." />
	<meta property="og:url" content={canonicalUrl} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={canonicalUrl} />
	{@html `<script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>`}
</svelte:head>

<div class="flex min-h-screen flex-col bg-gray-900 text-gray-200">
	<Header />
	<main class="flex-1 pt-16">
		{@render children()}
	</main>
	<Footer />
	<WhatsAppFloat />
</div>
