<script lang="ts">
	let iframeLoaded = $state(false);
</script>

<section class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
	<div class="text-center">
		<h2 class="mb-2 text-2xl font-bold text-white">Síguenos en Instagram</h2>
		<p class="mb-8 text-gray-400">Mirá nuestros últimos trabajos y novedades</p>
	</div>

	<div class="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/50">
		{#if !iframeLoaded}
			<div class="flex h-[500px] items-center justify-center">
				<p class="text-gray-500">Cargando Instagram...</p>
			</div>
		{/if}
		<iframe
			src="https://www.instagram.com/timbresysellos_saldias/embed/"
			title="Instagram - Timbres y Sellos Saldias"
			width="100%"
			height="500"
			frameborder="0"
			scrolling="no"
			allowtransparency="true"
			class:border-0={!iframeLoaded}
			class:h-0={!iframeLoaded}
			class:w-full={true}
			onload={() => (iframeLoaded = true)}
		></iframe>
	</div>

	<div class="mt-6 text-center">
		<a
			href="https://www.instagram.com/timbresysellos_saldias/"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600"
		>
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
			</svg>
			Síguenos @timbresysellos_saldias
		</a>
	</div>
</section>
