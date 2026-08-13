<script lang="ts">
	import { getAuthState, signInWithGoogle, signOut } from '$lib/stores/auth.svelte';

	const auth = getAuthState();
	let showMenu = $state(false);

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu() {
		showMenu = false;
	}

	async function handleSignIn() {
		try {
			await signInWithGoogle();
		} catch (error) {
			console.error('Sign in error:', error);
		}
	}

	async function handleSignOut() {
		try {
			await signOut();
			closeMenu();
		} catch (error) {
			console.error('Sign out error:', error);
		}
	}
</script>

{#if auth.isLoading}
	<!-- Loading skeleton -->
	<div class="h-8 w-8 animate-pulse rounded-full bg-gray-700"></div>
{:else if auth.isAuthenticated}
	<div class="relative">
		<button
			onclick={toggleMenu}
			class="flex items-center gap-2 rounded-lg p-1 text-gray-300 transition-colors hover:bg-brand-purple/20 hover:text-white"
			aria-label="Menú de usuario"
			aria-expanded={showMenu}
		>
			{#if auth.user?.user_metadata?.avatar_url}
				<img
					src={auth.user.user_metadata.avatar_url}
					alt="Avatar"
					class="h-8 w-8 rounded-full"
				/>
			{:else}
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple text-sm font-bold text-white">
					{auth.user?.email?.charAt(0).toUpperCase() ?? '?'}
				</div>
			{/if}
			<span class="hidden text-sm font-medium md:block">
				{auth.user?.user_metadata?.full_name ?? auth.user?.email?.split('@')[0] ?? 'Usuario'}
			</span>
		</button>

		{#if showMenu}
			<div
				class="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-brand-border bg-gray-900 shadow-xl"
				role="menu"
			>
				<div class="border-b border-brand-border px-4 py-3">
					<p class="text-sm font-medium text-white">
						{auth.user?.user_metadata?.full_name ?? 'Usuario'}
					</p>
					<p class="text-xs text-gray-400">
						{auth.user?.email ?? ''}
					</p>
				</div>
				<button
					onclick={handleSignOut}
					class="w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
					role="menuitem"
				>
					Cerrar sesión
				</button>
			</div>
		{/if}
	</div>
{:else}
	<button
		onclick={handleSignIn}
		class="inline-flex items-center gap-2 rounded-lg bg-brand-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-purple/90"
	>
		<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
			<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
			<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
			<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
			<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
		</svg>
		Iniciar sesión con Google
	</button>
{/if}