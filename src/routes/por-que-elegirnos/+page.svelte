<script lang="ts">
	import { generateSimpleWhatsAppLink, PHONE_DISPLAY } from '$lib/utils/wsp';
	import { INSTAGRAM_URL, GOOGLE_REVIEWS_URL } from '$lib/data/site';

	const WHATSAPP_LINK = generateSimpleWhatsAppLink();
	const INSTAGRAM_LINK = INSTAGRAM_URL;
	const HORARIO = 'Lun–Vie, 10:00–18:00 hrs';

	const razones = [
		{
			icon: '🤝',
			title: 'Atención personalizada por WhatsApp',
			description:
				'Te atendemos de persona a persona, sin bots ni formularios eternos. Cotizas, envías tu logo y coordinas tu pedido directo por WhatsApp, con respuesta rápida durante nuestro horario de atención.'
		},
		{
			icon: '🏭',
			title: 'Fabricación artesanal',
			description:
				'Cada timbre se fabrica a mano en nuestro taller y se revisa antes de entregarlo. Nos aseguramos de que el estampado salga limpio y nítido, tal como lo aprobaste.'
		},
		{
			icon: '✏️',
			title: 'Personalización total',
			description:
				'Texto, tamaño, color de goma, fuente y tu logo: eliges cada detalle de tu timbre. Antes de fabricar te enviamos el diseño para que lo apruebes con tu visto bueno.'
		},
		{
			icon: '🚚',
			title: 'Despacho gratis en la zona y envíos a todo Chile',
			description:
				'Despacho gratis en Quilpué, Villa Alemana y Belloto, y envíos a todo Chile por Starken o Bluexpress, con pago contra entrega. Tu pedido llega donde lo necesites.'
		},
		{
			icon: '⚖️',
			title: 'Garantía en cada pedido',
			description:
				'Respaldamos nuestros productos con garantía por fallas de fabricación y la garantía legal que te otorga la ley chilena. Si algo sale mal, lo resolvemos.'
		},
		{
			icon: '⭐',
			title: 'Reseñas reales en Google',
			description:
				'Búscanos en Google y lee la experiencia real de cada pedido. Te invitamos a ver nuestras reseñas antes de comprar.'
		},
		{
			icon: '📍',
			title: 'Dos sucursales en Villa Alemana',
			description:
				'Encuéntranos en Av. Valparaíso 1311, Villa Alemana, y en Estilomania — Uniformes Corporativos, Calle Santiago 851, local 4. Atención presencial sin necesidad de pedir hora.'
		}
	];
</script>

<svelte:head>
	<title>Por qué elegirnos | Timbres y Sellos Saldias</title>
	<meta
		name="description"
		content="Conoce por qué elegir Timbres y Sellos Saldias: atención personalizada por WhatsApp, fabricación artesanal, personalización total, despacho gratis en la zona y garantía en cada pedido."
	/>
	<meta property="og:title" content="Por qué elegirnos | Timbres y Sellos Saldias" />
	<meta
		property="og:description"
		content="Atención personalizada, fabricación artesanal, personalización total y garantía: así trabaja Timbres y Sellos Saldias en Villa Alemana."
	/>
	<meta property="og:url" content="https://timbres-y-sellos-saldias.netlify.app/por-que-elegirnos" />
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-3xl font-bold text-white sm:text-4xl">
			¿Por qué elegir Timbres y Sellos Saldias?
		</h1>
		<p class="mt-4 leading-relaxed text-gray-400">
			Somos un negocio familiar de Villa Alemana que fabrica timbres y sellos personalizados
			con calidad artesanal. Esto es lo que nos diferencia y lo que puedes esperar de tu
			pedido con nosotros.
		</p>
	</div>

	<!-- Razones -->
	<div class="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2">
		{#each razones as razon}
			<div class="rounded-xl border border-brand-border bg-brand-card p-6 transition-colors hover:border-brand-purple/50">
				<span
					class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple/20 text-2xl"
					aria-hidden="true"
				>
					{razon.icon}
				</span>
				<h2 class="mt-4 text-lg font-semibold text-white">{razon.title}</h2>
				<p class="mt-2 text-sm leading-relaxed text-gray-400">{razon.description}</p>
			</div>
		{/each}
	</div>

	<!-- Enlaces útiles -->
	<div class="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-3">
		<a
			href="/garantias"
			class="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-brand-card px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-brand-purple hover:text-white"
		>
			⚖️
			Conoce nuestra garantía
		</a>
		<a
			href="/despacho"
			class="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-brand-card px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-brand-purple hover:text-white"
		>
			🚚
			Despacho y envíos
		</a>
		<a
			href={GOOGLE_REVIEWS_URL}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-brand-card px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-brand-purple hover:text-white"
		>
			⭐
			Reseñas en Google
		</a>
	</div>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<div
		class="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-purple to-purple-800 p-8 text-center shadow-xl sm:p-12"
	>
		<h2 class="text-2xl font-bold text-white sm:text-3xl">¿Listo para tu timbre personalizado?</h2>
		<p class="mx-auto mt-3 max-w-lg text-purple-200">
			Cotiza por WhatsApp y en 1 a 2 días tienes tu timbre listo. Respondemos rápido durante
			el horario de atención ({HORARIO}).
		</p>
		<div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
			<a
				href={WHATSAPP_LINK}
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
			<a
				href={INSTAGRAM_LINK}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
			>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
					/>
				</svg>
				Síguenos en Instagram
			</a>
		</div>
		<p class="mt-4 text-sm text-purple-200">
			También puedes escribirnos al {PHONE_DISPLAY} o a timbresysellossaldias@gmail.com.
		</p>
	</div>
</section>
