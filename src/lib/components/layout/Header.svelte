<script lang="ts">
	import { onMount } from 'svelte';
	import { count, isHydrated, markHydrated } from '$lib/stores/cart.svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';

	let mobileOpen = $state(false);

	const cartCount = $derived(count());
	const showBadge = $derived(isHydrated() && cartCount > 0);

	// Flip the hydration flag after mount so the first client render matches the
	// SSR markup (empty badge) — the seeded localStorage cart must not render
	// during hydration.
	onMount(markHydrated);

	const navLinks = [
		{ href: '/catalogo', label: 'Catálogo' },
		{ href: '/nosotros', label: 'Nosotros' },
		{ href: '/contacto', label: 'Contacto' },
		{ href: '/despacho', label: 'Despacho' },
		{ href: '/garantias', label: 'Garantías' },
		{ href: '/por-que-elegirnos', label: 'Por qué elegirnos' },
		{ href: '/galeria', label: 'Galería' },
		{ href: '/faq', label: 'FAQ' },
	];

	function toggleMenu() {
		mobileOpen = !mobileOpen;
	}

	function closeMenu() {
		mobileOpen = false;
	}
</script>

<header
	class="fixed top-0 left-0 right-0 z-40 border-b border-brand-border bg-gray-950/80 backdrop-blur-md"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-3" onclick={closeMenu}>
			<img
				src="/assets/favicon.png"
				alt="Timbres y Sellos Saldias"
				width="36"
				height="36"
				class="shrink-0"
			/>
			<span class="hidden text-lg font-bold text-white sm:block">
				Timbres y Sellos <span class="text-brand-yellow">Saldias</span>
			</span>
		</a>

		<!-- Desktop Nav + Cart + Hamburger -->
		<div class="flex items-center gap-1">
			<nav class="hidden items-center gap-1 md:flex">
				{#each navLinks as link}
					<a
						href={link.href}
						class="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-brand-purple/20 hover:text-white"
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<!-- Cart -->
			<a
				href="/carrito"
				aria-label="Carrito de compras"
				class="relative flex items-center justify-center rounded-lg p-2 text-gray-300 transition-colors hover:bg-brand-purple/20 hover:text-white"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
				</svg>
				{#if showBadge}
					<span
						class="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white"
					>
						{cartCount}
					</span>
				{/if}
			</a>

			<!-- Login Button -->
			<div class="ml-2">
				<LoginButton />
			</div>

			<!-- Mobile Hamburger -->
			<button
				class="flex items-center justify-center rounded-lg p-2 text-gray-300 transition-colors hover:bg-brand-purple/20 hover:text-white md:hidden"
				onclick={toggleMenu}
				aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
				aria-expanded={mobileOpen}
			>
				{#if mobileOpen}
					<!-- Close icon -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<!-- Hamburger icon -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileOpen}
		<div
			class="border-t border-brand-border bg-gray-950/95 backdrop-blur-md md:hidden"
			role="menu"
		>
			<nav class="flex flex-col px-4 py-3">
				{#each navLinks as link}
					<a
						href={link.href}
						class="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-brand-purple/20 hover:text-white"
						role="menuitem"
						onclick={closeMenu}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>
