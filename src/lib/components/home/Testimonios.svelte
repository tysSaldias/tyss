<script lang="ts">
	// Reseñas reales de clientes. Agrégalas aquí cuando las tengas disponibles
	// (por ejemplo, desde Google) — se mostrarán automáticamente en esta sección.
	// No inventamos reseñas: mientras no haya reseñas publicadas, mostramos la
	// invitación a dejar una opinión en Google.
	type Resena = { quote: string; author: string; date?: string; rating: number };
	const resenas: Resena[] = [];

	import { GOOGLE_REVIEWS_URL } from '$lib/data/site';
</script>

<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
	<div class="text-center">
		<h2 class="text-2xl font-bold text-white sm:text-3xl">Lo que dicen nuestros clientes</h2>
		<p class="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-400">
			Búscanos en Google y lee la experiencia de clientes reales con nuestros timbres y
			sellos personalizados.
		</p>
	</div>

	{#if resenas.length > 0}
		<div class="mt-10 grid gap-6 md:grid-cols-3">
			{#each resenas as resena}
				<article class="flex flex-col rounded-xl border border-brand-border bg-brand-card p-6">
					<div class="flex gap-0.5 text-brand-yellow" aria-label={`${resena.rating} estrellas`}>
						{#each Array.from({ length: resena.rating }) as _}
							<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L1.077 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
							</svg>
						{/each}
					</div>
					<blockquote class="mt-4 flex-1 text-sm leading-relaxed text-gray-300">
						“{resena.quote}”
					</blockquote>
					<p class="mt-4 text-sm font-semibold text-white">{resena.author}</p>
					{#if resena.date}
						<p class="text-xs text-gray-500">{resena.date}</p>
					{/if}
				</article>
			{/each}
		</div>
	{/if}

	<!-- Invitación honesta: tus reseñas viven en Google -->
	<div
		class="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-brand-border bg-brand-card p-8 text-center sm:p-10"
	>
		<div>
			<h3 class="text-xl font-bold text-white">Tu opinión también cuenta</h3>
			<p class="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
				¿Pediste un timbre con nosotros? Déjanos tu reseña en Google y ayuda a otros a
				encontrar la calidad artesanal que ofrecemos. Leemos cada opinión y la usamos
				para mejorar.
			</p>
		</div>
		<div class="flex flex-col items-center gap-3 sm:flex-row">
			<a
				href={GOOGLE_REVIEWS_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600 hover:shadow-lg"
			>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12c3.314 0 6.275-1.343 8.431-3.513l-3.236-2.616C15.77 18.977 14.003 19.75 12 19.75A7.75 7.75 0 1119.75 12c0 .611-.071 1.205-.197 1.776H12v3.914h7.9C18.39 20.51 15.43 22 12 22a10 10 0 110-20c2.42 0 4.635.86 6.364 2.284l2.577-2.577A11.96 11.96 0 0012 0z" />
				</svg>
				Ver nuestras reseñas en Google
			</a>
		</div>
		<p class="text-xs text-gray-500">
			Puedes dejar tu opinión directamente desde el perfil de Google del negocio.
		</p>
	</div>
</section>
