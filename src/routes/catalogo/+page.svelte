<script lang="ts">
	import { products, getProductsByCategory } from '$lib/data/products';
	import CatalogoGrid from '$lib/components/catalog/CatalogoGrid.svelte';
	import FiltroCategoria from '$lib/components/catalog/FiltroCategoria.svelte';

	let activeCategory = $state('todos');

	const filtered = $derived(getProductsByCategory(activeCategory));

	function handleCategoryChange(category: string) {
		activeCategory = category;
	}
</script>

<svelte:head>
	<title>Catálogo | Timbres y Sellos Saldias</title>
	<meta name="description" content="Explora nuestro catálogo de timbres personalizados, sellos 3D y fechadores importados. Calidad artesanal para tu negocio en la Región de Valparaíso." />
	<meta property="og:title" content="Catálogo | Timbres y Sellos Saldias" />
	<meta property="og:description" content="Explora nuestro catálogo de timbres personalizados, sellos 3D y fechadores importados." />
	<meta property="og:url" content="https://tys-saldias.cl/catalogo" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-white">Catálogo</h1>
		<p class="mt-1 text-gray-400">{filtered.length} producto(s) disponible(s)</p>
	</div>

	<div class="mb-8">
		<FiltroCategoria active={activeCategory} onChange={handleCategoryChange} />
	</div>

	<CatalogoGrid products={filtered} />
</section>
