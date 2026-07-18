<script lang="ts">
	let mobileOpen = $state(false);

	const navLinks = [
		{ href: '/catalogo', label: 'Catálogo' },
		{ href: '/nosotros', label: 'Nosotros' },
		{ href: '/contacto', label: 'Contacto' },
		{ href: '/galeria', label: 'Galería' },
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

		<!-- Desktop Nav -->
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
