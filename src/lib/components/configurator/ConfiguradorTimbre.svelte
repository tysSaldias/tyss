<script lang="ts">
	import type { Product, StampConfig, FontType } from '$lib/types';
	import { colores } from '$lib/data/colores';
	import { tamanos } from '$lib/data/tamanos';
	import { priceFormat } from '$lib/data/products';
	import { generateWhatsAppMessage } from '$lib/utils/wsp';
	import SelectorColor from './SelectorColor.svelte';
	import SelectorTamanio from './SelectorTamanio.svelte';
	import VistaPreviaSVG from './VistaPreviaSVG.svelte';

	let { product }: { product: Product } = $props();

	let config = $state<StampConfig>({
		text: '',
		fontType: 'sans',
		colorId: product.availableColors[0] ?? colores[0].id,
		sizeId: product.availableSizes[1] ?? tamanos[1].id,
	});

	const selectedColor = $derived(colores.find((c) => c.id === config.colorId));
	const selectedSize = $derived(tamanos.find((s) => s.id === config.sizeId));

	const totalPrice = $derived(
		product.basePrice +
			(selectedSize?.priceModifier ?? 0) +
			(selectedColor?.isPremium ? 2000 : 0)
	);

	const whatsappUrl = $derived(generateWhatsAppMessage(config, product));

	const fontOptions: { id: FontType; label: string }[] = [
		{ id: 'sans', label: 'Sans Serif' },
		{ id: 'serif', label: 'Serif' },
		{ id: 'script', label: 'Script' },
		{ id: 'mono', label: 'Monoespaciada' },
	];

	function handleColorChange(colorId: string) {
		config.colorId = colorId;
	}

	function handleSizeChange(sizeId: string) {
		config.sizeId = sizeId;
	}

	function handleFontChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		config.fontType = target.value as FontType;
	}
</script>

<div class="grid gap-6 lg:grid-cols-2">
	<!-- Controls -->
	<div class="space-y-6">
		<!-- Text input -->
		<div>
			<label for="stamp-text" class="mb-1 block text-sm font-medium text-gray-300">Texto</label>
			<input
				id="stamp-text"
				type="text"
				maxlength={50}
				placeholder="Escribe tu texto"
				bind:value={config.text}
				class="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
			/>
			<p class="mt-1 text-right text-xs text-gray-500">{config.text.length}/50</p>
		</div>

		<!-- Font selector -->
		<div>
			<label for="stamp-font" class="mb-1 block text-sm font-medium text-gray-300">Fuente</label>
			<select
				id="stamp-font"
				onchange={handleFontChange}
				class="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white transition-colors focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
			>
				{#each fontOptions as opt}
					<option value={opt.id} selected={config.fontType === opt.id}>{opt.label}</option>
				{/each}
			</select>
		</div>

		<!-- Color selector -->
		<div>
			<p class="mb-2 text-sm font-medium text-gray-300">Color</p>
			<SelectorColor colors={colores} selected={config.colorId} onChange={handleColorChange} />
			{#if selectedColor?.isPremium}
				<p class="mt-1 text-xs text-brand-yellow">* Color premium tiene un costo adicional de {priceFormat(2000)}</p>
			{/if}
		</div>

		<!-- Size selector -->
		<div>
			<p class="mb-2 text-sm font-medium text-gray-300">Tamaño</p>
			<SelectorTamanio
				sizes={tamanos}
				selected={config.sizeId}
				basePrice={product.basePrice}
				onChange={handleSizeChange}
			/>
		</div>
	</div>

	<!-- Preview + Price + CTA -->
	<div class="space-y-6">
		<VistaPreviaSVG {config} />

		<div class="rounded-xl bg-gray-800/50 p-4">
			<div class="flex items-center justify-between">
				<span class="text-gray-400">Precio total estimado:</span>
				<span class="text-2xl font-bold text-brand-yellow">{priceFormat(totalPrice)}</span>
			</div>
			<p class="mt-1 text-xs text-gray-500">
				{selectedColor?.isPremium ? 'Incluye recargo color premium' : 'Precio base + tamaño'}
			</p>
		</div>

		<a
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600 hover:shadow-lg"
		>
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
			</svg>
			Cotizar por WhatsApp
		</a>
	</div>
</div>
