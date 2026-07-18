<script lang="ts">
	import { products, getProductsByCategory } from '$lib/data/products';
	import CatalogoGrid from '$lib/components/catalog/CatalogoGrid.svelte';
	import FiltroCategoria from '$lib/components/catalog/FiltroCategoria.svelte';

	let activeCategory = $state('todos');
	let sortBy = $state('recomendados');

	const filtered = $derived(getProductsByCategory(activeCategory));

	const sorted = $derived(() => {
		const items = [...filtered];
		if (sortBy === 'mayor') {
			return items.sort((a, b) => b.basePrice - a.basePrice);
		} else if (sortBy === 'menor') {
			return items.sort((a, b) => a.basePrice - b.basePrice);
		}
		return items.sort((a, b) => a.order - b.order);
	});

	function handleCategoryChange(category: string) {
		activeCategory = category;
	}

	function handleSortChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		sortBy = target.value;
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

	<div class="mb-8 flex flex-wrap items-center gap-4">
		<FiltroCategoria active={activeCategory} onChange={handleCategoryChange} />

		<div class="ml-auto">
			<select
				onchange={handleSortChange}
				class="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-purple"
			>
				<option value="recomendados">Recomendados</option>
				<option value="mayor">Mayor precio</option>
				<option value="menor">Menor precio</option>
			</select>
		</div>
	</div>

	<CatalogoGrid products={sorted()} />
</section>
