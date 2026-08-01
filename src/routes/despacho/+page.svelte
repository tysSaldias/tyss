<script lang="ts">
	import { generateSimpleWhatsAppLink, PHONE_DISPLAY } from '$lib/utils/wsp';

	const WHATSAPP_LINK = generateSimpleWhatsAppLink();
	const HORARIO = 'Lun–Vie, 10:00–18:00 hrs';

	const quickNav = [
		{ href: '#despacho-gratis', label: '🚚 Despacho gratis en la zona' },
		{ href: '#envios-chile', label: '📦 Envíos a todo Chile' },
		{ href: '#tiempos', label: '⏰ Tiempos de fabricación y envío' },
		{ href: '#retiro', label: '📍 Retiro en tienda' },
		{ href: '#seguimiento', label: '💬 Seguimiento de tu pedido' },
		{ href: '#requisitos', label: '📋 Condiciones de entrega' }
	];

	const sucursales = [
		{
			name: 'Timbres y Sellos Saldias',
			detail: 'Sucursal principal',
			address: 'Av. Valparaíso 1311, Villa Alemana, Valparaíso',
			icon: '🏪'
		},
		{
			name: 'Estilomania — Uniformes Corporativos',
			detail: 'Punto de venta oficial',
			address: 'Calle Santiago 851, local 4, Villa Alemana',
			icon: '🏢'
		}
	];

	const requisitos = [
		'La dirección de despacho debe ser correcta y completa (calle, número, comuna y región) para evitar demoras en la entrega.',
		'Al momento de la entrega debe haber una persona que reciba el pedido.',
		'Las entregas se coordinan según las condiciones de la empresa de transporte.',
		'Si la encomienda no se puede entregar, se devuelve o se reagenda según lo que indique la empresa de transporte. Consulta las condiciones de la empresa para más detalles.',
		'Emitimos boleta y factura por cada pedido; indícanos cuál necesitas al coordinar tu entrega.'
	];
</script>

<svelte:head>
	<title>Despacho y Envíos | Timbres y Sellos Saldias</title>
	<meta
		name="description"
		content="Despacho gratis en Quilpué, Villa Alemana y Belloto, envíos a todo Chile por Starken o Bluexpress y retiro en tienda. Conoce tiempos de fabricación y envío."
	/>
	<meta property="og:title" content="Despacho y Envíos | Timbres y Sellos Saldias" />
	<meta property="og:description" content="Despacho gratis en la zona, envíos a todo Chile por Starken o Bluexpress y retiro en nuestras sucursales de Villa Alemana." />
	<meta property="og:url" content="https://timbres-y-sellos-saldias.netlify.app/despacho" />
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-3xl font-bold text-white sm:text-4xl">Despacho y Envíos</h1>
		<p class="mt-4 leading-relaxed text-gray-400">
			Toda la información sobre cómo recibes tu pedido en un solo lugar: despacho gratis en
			Quilpué, Villa Alemana y Belloto, envíos a todo Chile por Starken o Bluexpress, y retiro
			presencial en nuestras sucursales de Villa Alemana.
		</p>
	</div>

	<!-- Quick nav -->
	<div class="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each quickNav as item}
			<a
				href={item.href}
				class="rounded-xl border border-brand-border bg-brand-card px-4 py-3 text-center text-sm font-medium text-gray-300 transition-colors hover:border-brand-purple hover:text-white"
			>
				{item.label}
			</a>
		{/each}
	</div>

	<!-- Despacho gratis en la zona -->
	<section id="despacho-gratis" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				🚚
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Despacho gratis en la zona</h2>
				<p class="text-sm text-gray-400">Sin costo en Quilpué, Villa Alemana y Belloto.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Si estás en Quilpué, Villa Alemana o Belloto, te llevamos tu pedido
				<strong class="text-gray-200">sin costo</strong>. Coordina el despacho por
				<a
					href={WHATSAPP_LINK}
					target="_blank"
					rel="noopener noreferrer"
					class="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 transition-colors hover:decoration-brand-yellow"
				>WhatsApp</a
				> y te confirmamos el día y horario de entrega.
			</p>
		</div>
	</section>

	<!-- Envíos a todo Chile -->
	<section id="envios-chile" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				📦
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Envíos a todo Chile</h2>
				<p class="text-sm text-gray-400">Por Starken o Bluexpress, con pago contra entrega.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Despachamos a todo Chile a través de <strong class="text-gray-200">Starken</strong> o
				<strong class="text-gray-200">Bluexpress</strong>. El envío se realiza en modalidad
				<strong class="text-gray-200">por pagar</strong> (contra entrega): abonas el valor al recibir tu
				pedido, salvo que coordines el pago anticipado con nosotros.
			</p>
			<p class="mt-3 text-sm text-gray-400">
				El tiempo de envío depende del destino y es el que indique la empresa de transporte al
				coordinar la entrega.
			</p>
		</div>
	</section>

	<!-- Tiempos de fabricación y envío -->
	<section id="tiempos" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				⏰
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Tiempos de fabricación y envío</h2>
				<p class="text-sm text-gray-400">Son dos tiempos distintos: primero fabricamos, luego enviamos.</p>
			</div>
		</div>
		<div class="grid gap-6 lg:grid-cols-2">
			<div class="rounded-xl border border-brand-purple/30 bg-brand-card p-6">
				<span class="text-2xl" aria-hidden="true">🏭</span>
				<h3 class="mt-3 text-lg font-semibold text-white">Fabricación: 1 a 2 días</h3>
				<p class="mt-2 text-sm leading-relaxed text-gray-400">
					Normalmente fabricamos tu pedido en 1 a 2 días como máximo, para cantidades al detalle.
					Si algún modelo no tiene stock, te lo informamos de inmediato: puedes cambiar el modelo
					o reagendar la fecha de entrega.
				</p>
			</div>
			<div class="rounded-xl border border-brand-yellow/30 bg-brand-card p-6">
				<span class="text-2xl" aria-hidden="true">🚚</span>
				<h3 class="mt-3 text-lg font-semibold text-white">Envío: según el destino</h3>
				<p class="mt-2 text-sm leading-relaxed text-gray-400">
					El tiempo de envío depende del destino y es el que indique la empresa de transporte al
					momento de coordinar la entrega. Te confirmamos el plazo estimado antes de despachar tu
					pedido.
				</p>
			</div>
		</div>
	</section>

	<!-- Retiro en tienda -->
	<section id="retiro" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				📍
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Retiro en tienda</h2>
				<p class="text-sm text-gray-400">Retira tu pedido sin esperas en nuestras sucursales.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Puedes retirar tu pedido en cualquiera de nuestras sucursales de Villa Alemana, {HORARIO}.
				La atención presencial es
				<strong class="text-gray-200">por orden de llegada</strong>, sin necesidad de pedir hora.
				Coordina el retiro por WhatsApp y te lo dejamos listo.
			</p>
			<div class="mt-5 grid gap-4 sm:grid-cols-2">
				{#each sucursales as sucursal}
					<div class="rounded-xl border border-brand-border bg-gray-900/50 p-5">
						<span class="text-xl" aria-hidden="true">{sucursal.icon}</span>
						<p class="mt-2 font-semibold text-white">{sucursal.name}</p>
						<p class="text-xs font-medium text-brand-yellow">{sucursal.detail}</p>
						<p class="mt-1 text-sm text-gray-400">{sucursal.address}</p>
					</div>
				{/each}
			</div>
			<div class="mt-5 rounded-lg bg-brand-purple/10 p-4">
				<p class="text-sm text-gray-300">
					<strong class="text-white">Horario:</strong> {HORARIO}
				</p>
			</div>
		</div>
	</section>

	<!-- Seguimiento de tu pedido -->
	<section id="seguimiento" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				💬
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Seguimiento de tu pedido</h2>
				<p class="text-sm text-gray-400">Directamente con la empresa de transporte.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Una vez despachado tu pedido, el seguimiento se realiza directamente con la empresa de
				transporte. Con tu número de envío puedes rastrear tu pedido en su sitio oficial:
			</p>
			<div class="mt-4 flex flex-col gap-3 sm:flex-row">
				<a
					href="https://www.starken.cl"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
				>
					📦
					starken.cl
				</a>
				<a
					href="https://www.blue.cl"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
				>
					🚚
					blue.cl
				</a>
			</div>
			<p class="mt-4 text-sm text-gray-400">
				¿Necesitas ayuda con tu envío? Escríbenos por
				<a
					href={WHATSAPP_LINK}
					target="_blank"
					rel="noopener noreferrer"
					class="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 transition-colors hover:decoration-brand-yellow"
				>WhatsApp</a
				> y te ayudamos a resolverlo.
			</p>
		</div>
	</section>

	<!-- Requisitos y condiciones de entrega -->
	<section id="requisitos" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				📋
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Requisitos y condiciones de entrega</h2>
				<p class="text-sm text-gray-400">Lo que debes tener en cuenta al recibir tu pedido.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
				{#each requisitos as requisito}
					<li class="flex items-start gap-2">
						<span class="mt-0.5 text-brand-yellow" aria-hidden="true">•</span>
						<span>{requisito}</span>
					</li>
				{/each}
			</ul>
			<div class="mt-5 rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 p-4">
				<p class="text-sm text-gray-300">
					<strong class="text-brand-yellow">Importante:</strong> Una vez despachado tu pedido,
					Timbres y Sellos Saldias no se hace responsable por retrasos de la empresa de transporte.
				</p>
			</div>
		</div>
	</section>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<div
		class="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-purple to-purple-800 p-8 text-center shadow-xl sm:p-12"
	>
		<h2 class="text-2xl font-bold text-white sm:text-3xl">¿Tienes dudas sobre tu despacho?</h2>
		<p class="mx-auto mt-3 max-w-lg text-purple-200">
			Escríbenos por WhatsApp y te confirmamos cobertura, tiempos y opciones de entrega para tu
			comuna. Respondemos rápido durante el horario de atención ({HORARIO}).
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
				href="/faq"
				class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
			>
				💬
				Preguntas frecuentes sobre envíos
			</a>
		</div>
		<p class="mt-4 text-sm text-purple-200">
			También puedes escribirnos al {PHONE_DISPLAY} o a timbresysellossaldias@gmail.com.
		</p>
	</div>
</section>
