<script lang="ts">
	import { page } from '$app/state';
	import { generateSimpleWhatsAppLink } from '$lib/utils/wsp';

	const status = $derived(page.status);
	const errorMessage = $derived(page.error?.message ?? '');

	const is404 = $derived(status === 404);
	const title = $derived(
		is404 ? '¡Este sello no registró!' : 'Algo salió mal en el taller'
	);
	const subtitle = $derived(
		is404
			? 'Parece que esta página se escapó del expediente. Te ayudamos a encontrar lo que buscas.'
			: 'Ocurrió un error inesperado mientras preparábamos esta página. Intenta nuevamente o escríbenos por WhatsApp.'
	);
</script>

<svelte:head>
	<title>{title} | Timbres y Sellos Saldias</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6">
	<!-- Sello mal estampado -->
	<div class="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64" aria-hidden="true">
		<span class="absolute inset-0 rounded-full border-4 border-dashed border-brand-purple/60 opacity-60"></span>
		<span class="absolute inset-4 rounded-full border border-dashed border-brand-purple/30 opacity-40"></span>
		<span class="absolute inset-0 -rotate-3 rounded-full bg-brand-purple/15 shadow-[inset_0_0_40px_rgba(91,33,182,0.35)] backdrop-blur-[1px]"></span>
		<div class="relative -rotate-6">
			<p class="text-7xl font-black tracking-tight text-white sm:text-8xl">{status}</p>
			<p class="mt-1 text-xs font-bold uppercase tracking-[0.35em] text-brand-yellow sm:text-sm">
				{is404 ? 'No registró' : 'Error'}
			</p>
		</div>
		<!-- Sello pequeño decorativo -->
		<span class="absolute -bottom-4 -right-6 rotate-12 rounded-lg border-2 border-dashed border-brand-yellow/40 bg-gray-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-yellow/70">
			Sin estampar
		</span>
	</div>

	<h1 class="mt-10 text-3xl font-bold text-white sm:text-4xl">{title}</h1>
	<p class="mx-auto mt-4 max-w-lg leading-relaxed text-gray-400">{subtitle}</p>

	{#if errorMessage && !is404}
		<p class="mt-3 text-xs text-gray-500">{errorMessage}</p>
	{/if}

	<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-lg bg-brand-purple px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg"
		>
			←
			Volver al inicio
		</a>
		<a
			href="/catalogo"
			class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
		>
			🖊️
			Ver el catálogo
		</a>
		<a
			href={generateSimpleWhatsAppLink()}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600 hover:shadow-lg"
		>
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
				/>
			</svg>
			Escríbenos por WhatsApp
		</a>
	</div>

	<p class="mt-8 text-xs text-gray-500">
		¿No encuentras lo que buscas? También puedes revisar el
		<a
			href="/catalogo"
			class="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 transition-colors hover:decoration-brand-yellow"
		>catálogo completo</a
		> o las
		<a
			href="/faq"
			class="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 transition-colors hover:decoration-brand-yellow"
		>preguntas frecuentes</a
		>.
	</p>
</section>
