<script lang="ts">
	import type { Product, StampConfig } from '$lib/types';
	import { colores } from '$lib/data/colores';
	import { priceFormat } from '$lib/data/products';
	import { generateWhatsAppMessage } from '$lib/utils/wsp';
	import { addToCart } from '$lib/stores/cart.svelte';
	import type { CartLine } from '$lib/stores/cart.svelte';
	import SelectorColor from './SelectorColor.svelte';
	import SelectorTamanio from './SelectorTamanio.svelte';

	let { product }: { product: Product } = $props();

	let config = $state<StampConfig>({
		text: '',
		fontType: 'sans',
		colorId: product.availableColors[0] ?? colores[0].id,
		sizeId: product.availableSizes[0]?.id ?? '',
		hasLogo: false,
	});

	const selectedColor = $derived(colores.find((c) => c.id === config.colorId));
	const selectedSize = $derived(product.availableSizes.find((s) => s.id === config.sizeId));
	const sizeComingSoon = $derived(selectedSize?.comingSoon ?? false);

	const excludedSizeIds = $derived(config.hasLogo ? (product.logoExcludedSizeIds ?? []) : []);
	const sizeExcluded = $derived(excludedSizeIds.includes(config.sizeId));

	const suggestedSizeId = $derived.by<string | undefined>(() => {
		if (!product.hasTextInput || config.text.length === 0) return undefined;
		const limits = product.charLimits;
		if (!limits || limits.length === 0) return undefined;
		const sizes = product.availableSizes;
		// First size (in order) whose char limit fits the text length, skipping
		// sizes excluded by the logo option and sizes not yet purchasable.
		for (let i = 0; i < sizes.length; i++) {
			if (excludedSizeIds.includes(sizes[i].id)) continue;
			if (sizes[i].comingSoon) continue;
			if (config.text.length <= (limits[i] ?? Number.POSITIVE_INFINITY)) return sizes[i].id;
		}
		// Text longer than every declared limit: fall back to the last size that
		// is neither excluded nor coming soon. If none exists, no suggestion.
		for (let i = sizes.length - 1; i >= 0; i--) {
			if (excludedSizeIds.includes(sizes[i].id)) continue;
			if (sizes[i].comingSoon) continue;
			return sizes[i].id;
		}
		return undefined;
	});

	const suggestedSizeName = $derived(
		product.availableSizes.find((s) => s.id === suggestedSizeId)?.name
	);

	/** Formats a list for Spanish copy: ["A", "B", "C"] -> "A, B y C". */
	function formatList(items: string[]): string {
		if (items.length <= 1) return items.join('');
		const head = items.slice(0, -1).join(', ');
		return `${head} y ${items[items.length - 1]}`;
	}

	const excludedSizesHint = $derived(
		config.hasLogo && product.hasTextInput ? formatList(product.logoExcludedSizeIds ?? []) : ''
	);

	// Keep the selection valid: when the logo option is enabled, an excluded
	// size can no longer be selected, so fall back to the first available one.
	$effect(() => {
		if (config.hasLogo && excludedSizeIds.includes(config.sizeId)) {
			const firstAvailable = product.availableSizes.find((s) => !excludedSizeIds.includes(s.id));
			if (firstAvailable) config.sizeId = firstAvailable.id;
		}
	});

	const totalPrice = $derived(
		product.basePrice +
			(selectedSize?.priceModifier ?? 0) +
			(selectedColor?.isPremium ? 2000 : 0)
	);

	const whatsappUrl = $derived(generateWhatsAppMessage(config, product));

	function handleColorChange(colorId: string) {
		config.colorId = colorId;
	}

	function handleSizeChange(sizeId: string) {
		config.sizeId = sizeId;
	}

	let adding = $state(false);
	let added = $state(false);
	let addedTimer: ReturnType<typeof setTimeout> | undefined;

	const cartLine = $derived<CartLine>({
		key: `${product.id}|${config.sizeId}|${config.colorId}|${config.text}|${config.hasLogo}`,
		productId: product.id,
		name: product.name,
		image: product.images[0] ?? '',
		unitPrice: totalPrice,
		quantity: 1,
		text: product.hasTextInput && config.text ? config.text : undefined,
		sizeName: selectedSize?.name,
		sizeDimensions: selectedSize?.dimensions,
		colorName: product.availableColors.length > 0 ? selectedColor?.name : undefined,
		hasLogo: config.hasLogo,
	});

	function handleAddToCart() {
		if (adding) return;
		adding = true;
		addToCart(cartLine);
		added = true;
		window.clearTimeout(addedTimer);
		addedTimer = window.setTimeout(() => {
			added = false;
			adding = false;
		}, 1800);
	}
</script>

<div class="grid gap-6 lg:grid-cols-2">
	<!-- Controls -->
	<div class="space-y-6">
		<!-- Text input -->
		{#if product.hasTextInput}
			<div>
				<label for="stamp-text" class="mb-1 block text-sm font-medium text-gray-300">Texto</label>
				<textarea
					id="stamp-text"
					maxlength={500}
					rows={2}
					placeholder="Describe lo que quieres (un logo, frase o meme)"
					bind:value={config.text}
					class="w-full resize-none rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
				></textarea>
				<p class="mt-1 text-right text-xs text-gray-500">{config.text.length}/500</p>
			</div>

			<label class="flex cursor-pointer items-center gap-2">
				<input
					type="checkbox"
					bind:checked={config.hasLogo}
					class="h-4 w-4 rounded accent-brand-yellow"
				/>
				<span class="text-sm text-gray-300">Mi diseño incluye logo/imagen</span>
			</label>
		{/if}

		<!-- Color selector (comentado temporalmente)
		<div>
			<p class="mb-2 text-sm font-medium text-gray-300">Color</p>
			<SelectorColor colors={colores} selected={config.colorId} onChange={handleColorChange} />
		</div>
		-->

		<!-- Size selector -->
		<div>
			<p class="mb-2 text-sm font-medium text-gray-300">Tamaño</p>
			{#if suggestedSizeId && suggestedSizeName}
				<p class="mb-2 text-sm font-medium text-brand-yellow">Tamaño sugerido: {suggestedSizeName}</p>
			{:else if excludedSizesHint}
				<p class="mb-2 text-sm text-gray-400">
					Con logo, los tamaños {excludedSizesHint} no están disponibles
				</p>
			{/if}
			<SelectorTamanio
				sizes={product.availableSizes}
				selected={config.sizeId}
				basePrice={product.basePrice}
				excludedIds={excludedSizeIds}
				suggestedId={suggestedSizeId}
				onChange={handleSizeChange}
			/>
		</div>
	</div>

	<!-- Price + CTA -->
	<div class="space-y-6">
		<div class="rounded-xl bg-gray-800/50 p-4">
			<div class="flex items-center justify-between">
				<span class="text-gray-400">Total:</span>
				<span class="text-2xl font-bold text-brand-yellow">
					{sizeComingSoon ? 'Próximamente' : priceFormat(totalPrice)}
				</span>
			</div>
			<p class="mt-1 text-xs text-gray-500">
				{selectedColor?.isPremium ? 'Incluye recargo color premium' : 'Precio base + tamaño'}
			</p>
		</div>

		<button
			onclick={handleAddToCart}
			disabled={adding || sizeComingSoon || sizeExcluded}
			class="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand-purple"
		>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
			</svg>
			{sizeComingSoon ? 'Próximamente disponible' : added ? '✓ Agregado' : 'Agregar al carrito'}
		</button>

		<p class="text-sm text-gray-400">
			{#if product.hasTextInput}
				Escribe lo que quieres en el campo de texto, selecciona el tamaño y haz clic en el botón para cotizar por WhatsApp.
			{:else}
				Selecciona el tamaño y haz clic en el botón para cotizar por WhatsApp.
			{/if}
		</p>

		{#if !sizeComingSoon}
			<a
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center justify-center gap-2 px-4 py-1.5 text-sm text-gray-400 transition-colors hover:text-white"
			>
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
				</svg>
				Cotizar por WhatsApp
			</a>
		{/if}
	</div>
</div>
