<script lang="ts">
	import { onMount } from 'svelte';
	import {
		items,
		isHydrated,
		markHydrated,
		total,
		updateQuantity,
		removeFromCart,
		clearCart
	} from '$lib/stores/cart.svelte';
	import { cartWhatsAppUrl } from '$lib/utils/wsp';
	import { priceFormat } from '$lib/data/products';

	// The cart is seeded from localStorage on the client; until hydration the SSR
	// markup (placeholder) must match, so real content only renders after mount.
	onMount(markHydrated);

	function truncate(text: string, max = 60): string {
		return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
	}
</script>

<svelte:head>
	<title>Carrito | Timbres y Sellos Saldias</title>
	<meta name="description" content="Revisa tu carrito y envía tu pedido por WhatsApp. Timbres y sellos personalizados en la Región de Valparaíso." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<!-- Breadcrumb -->
	<nav class="mb-6 text-sm text-gray-400">
		<a href="/catalogo" class="hover:text-brand-yellow">Catálogo</a>
		<span class="mx-2">/</span>
		<span class="text-gray-200">Carrito</span>
	</nav>

	<h1 class="text-3xl font-bold text-white">Carrito</h1>

	{#if !isHydrated()}
		<!-- Neutral placeholder: keeps the first client render identical to the SSR
			 markup. The real cart (empty or with lines) only renders after mount. -->
		<div class="mt-8 grid gap-8 lg:grid-cols-3" aria-hidden="true">
			<div class="space-y-4 lg:col-span-2">
				{#each [0, 1, 2] as _ (_.toString())}
					<div class="h-28 animate-pulse rounded-xl bg-gray-800/50"></div>
				{/each}
			</div>
			<div class="h-64 animate-pulse rounded-xl bg-gray-800/50"></div>
		</div>
	{:else if items.length === 0}
		<div class="mx-auto max-w-md py-16 text-center">
			<svg class="mx-auto h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
			</svg>
			<h2 class="mt-6 text-2xl font-bold text-white">Tu carrito está vacío</h2>
			<p class="mt-2 text-gray-400">
				Aún no has agregado productos. Explora el catálogo para encontrar timbres y sellos personalizados.
			</p>
			<a
				href="/catalogo"
				class="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90"
			>
				Ver catálogo
			</a>
		</div>
	{:else}
		<div class="mt-8 grid gap-8 lg:grid-cols-3">
			<!-- Cart lines -->
			<div class="space-y-4 lg:col-span-2">
				{#each items as line (line.key)}
					<div class="flex flex-wrap items-center gap-4 rounded-xl bg-gray-800/50 p-4">
						<img
							src={line.image}
							alt={line.name}
							width="80"
							height="80"
							class="h-20 w-20 shrink-0 rounded-lg object-contain"
						/>
						<div class="min-w-0 flex-1">
							<p class="font-semibold text-white">{line.name}</p>
							{#if line.sizeName}
								<p class="text-sm text-gray-400">
									{line.sizeName}{line.sizeDimensions ? ` (${line.sizeDimensions})` : ''}
								</p>
							{/if}
							{#if line.text}
								<p class="text-sm text-gray-400">Texto: {truncate(line.text)}</p>
							{/if}
							{#if line.colorName}
								<p class="text-sm text-gray-400">Color: {line.colorName}</p>
							{/if}
							<p class="mt-1 text-sm text-gray-300">{priceFormat(line.unitPrice)} c/u</p>
						</div>
						<div class="flex items-center gap-2">
							<button
								onclick={() => updateQuantity(line.key, line.quantity - 1)}
								aria-label="Disminuir cantidad"
								class="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700"
							>
								−
							</button>
							<span class="w-8 text-center text-sm font-semibold text-white">{line.quantity}</span>
							<button
								onclick={() => updateQuantity(line.key, line.quantity + 1)}
								aria-label="Aumentar cantidad"
								class="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700"
							>
								+
							</button>
						</div>
						<div class="flex items-center gap-3">
							<span class="font-bold text-brand-yellow">{priceFormat(line.unitPrice * line.quantity)}</span>
							<button
								onclick={() => removeFromCart(line.key)}
								aria-label={`Quitar ${line.name} del carrito`}
								class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
							>
								✕
							</button>
						</div>
					</div>
				{/each}
			</div>

			<!-- Summary -->
			<aside class="h-fit rounded-xl bg-gray-800/50 p-6">
				<h2 class="text-lg font-semibold text-white">Resumen</h2>
				<div class="mt-4 flex items-center justify-between border-t border-brand-border pt-4">
					<span class="text-gray-400">Subtotal</span>
					<span class="text-2xl font-bold text-brand-yellow">{priceFormat(total())}</span>
				</div>
				<p class="mt-3 text-sm text-gray-400">
					El despacho y el medio de pago se coordinan al confirmar tu pedido por WhatsApp.
				</p>
				<a
					href={cartWhatsAppUrl(items)}
					target="_blank"
					rel="noopener noreferrer"
					class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
					</svg>
					Enviar pedido por WhatsApp
				</a>
				<button
					onclick={clearCart}
					class="mt-3 w-full rounded-lg px-6 py-2.5 text-center text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
				>
					Vaciar carrito
				</button>
			</aside>
		</div>
	{/if}
</section>
