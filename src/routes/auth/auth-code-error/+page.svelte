<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error de autenticación | Timbres y Sellos Saldias</title>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
	<h1 class="text-4xl font-bold text-white">Error de autenticación</h1>
	<p class="mt-3 text-gray-400">
		No se pudo completar la autenticación con Google. Por favor, intenta nuevamente.
	</p>
	<a
		href="/"
		class="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90"
	>
		Volver al inicio
	</a>
</section>