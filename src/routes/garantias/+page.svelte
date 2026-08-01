<script lang="ts">
	import { generateSimpleWhatsAppLink, PHONE_DISPLAY } from '$lib/utils/wsp';

	const WHATSAPP_LINK = generateSimpleWhatsAppLink();
	const ULTIMA_ACTUALIZACION = 'agosto 2026';

	const quickNav = [
		{ href: '#marco-legal', label: '⚖️ Marco legal' },
		{ href: '#aprobacion-diseno', label: '✏️ Productos personalizados' },
		{ href: '#garantia-fabricacion', label: '🔧 Garantía por fallas' },
		{ href: '#no-cubre', label: '🚫 Lo que no cubre' },
		{ href: '#retracto', label: '🔄 Derecho a retracto' },
		{ href: '#transporte', label: '🚚 Transporte' },
		{ href: '#clientes-empresa', label: '🏢 Clientes empresa' },
		{ href: '#reclamos', label: '💬 Cómo gestionar un reclamo' }
	];

	const noCubre = [
		'Errores de texto, ortografía o diseño que fueron aprobados por ti antes de fabricar.',
		'Diferencias de tono o color consideradas razonables y propias del proceso de fabricación.',
		'Daños posteriores a la entrega, como mal uso o desgaste por uso normal del producto.',
		'Daños atribuibles a la empresa de transporte.'
	];

	const condicionesRetracto = [
		'El producto debe estar sin uso y en perfectas condiciones.',
		'Debe conservar su empaque original.',
		'Debe devolverse en la misma cantidad y calidad en que fue entregado.',
		'El costo del envío de la devolución lo asume el cliente.'
	];

	const pasosReclamo = [
		{
			title: 'Escríbenos por WhatsApp',
			description:
				'Cuéntanos tu caso con los datos de tu pedido (producto y fecha de compra) y adjunta una foto del problema.'
		},
		{
			title: 'Revisamos y coordinamos',
			description:
				'Analizamos tu caso y coordinamos contigo la devolución del producto o la solución según corresponda.'
		},
		{
			title: 'Inspección y resolución',
			description:
				'Una vez recibido el producto, realizamos la inspección técnica y procedemos con la reparación, el reemplazo o la devolución del dinero, según lo que aplique.'
		}
	];
</script>

<svelte:head>
	<title>Garantías y Devoluciones | Timbres y Sellos Saldias</title>
	<meta
		name="description"
		content="Conoce la política de garantía y devoluciones de Timbres y Sellos Saldias: aprobación de diseños personalizados, garantía por fallas de fabricación y derecho a retracto."
	/>
	<meta property="og:title" content="Garantías y Devoluciones | Timbres y Sellos Saldias" />
	<meta
		property="og:description"
		content="Política de garantía, cambios y devoluciones de Timbres y Sellos Saldias: productos personalizados, garantía por fallas de fabricación y derecho a retracto."
	/>
	<meta property="og:url" content="https://timbres-y-sellos-saldias.netlify.app/garantias" />
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-3xl font-bold text-white sm:text-4xl">Garantías y Devoluciones</h1>
		<p class="mt-4 leading-relaxed text-gray-400">
			En Timbres y Sellos Saldias queremos que quedes conforme con tu pedido. Aquí te
			explicamos nuestras políticas de garantía, cambios y devoluciones.
		</p>
		<p class="mt-3 text-xs text-gray-500">Última actualización: {ULTIMA_ACTUALIZACION}.</p>
	</div>

	<!-- Quick nav -->
	<div class="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
		{#each quickNav as item}
			<a
				href={item.href}
				class="rounded-xl border border-brand-border bg-brand-card px-4 py-3 text-center text-sm font-medium text-gray-300 transition-colors hover:border-brand-purple hover:text-white"
			>
				{item.label}
			</a>
		{/each}
	</div>

	<!-- Marco legal -->
	<section id="marco-legal" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				⚖️
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Marco legal</h2>
				<p class="text-sm text-gray-400">Nuestra política sigue la ley chilena de protección al consumidor.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Esta política sigue lo establecido en la Ley N° 19.496 sobre Protección de los
				Derechos de los Consumidores y aplica a las compras realizadas a través de nuestros
				canales: presencial, WhatsApp y en línea. Te la explicamos en palabras simples, para
				que sepas qué esperar de tus compras con nosotros.
			</p>
		</div>
	</section>

	<!-- Productos personalizados y aprobación de diseño -->
	<section id="aprobacion-diseno" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				✏️
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Productos personalizados y aprobación de diseño</h2>
				<p class="text-sm text-gray-400">La mayoría de nuestros productos se fabrican a pedido.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Timbres de goma, automáticos, manuales, fechadores, numeradores y tampones se
				fabrican con tu texto, logo o diseño. Por eso, <strong class="text-gray-200">antes de
				fabricar</strong> te enviamos el diseño por WhatsApp para que confirmes el texto, las
				medidas, los colores y las especificaciones.
			</p>
			<p class="mt-3 leading-relaxed text-gray-400">
				Cuando apruebas el diseño con tu <strong class="text-gray-200">visto bueno</strong>,
				este se considera aprobado en su totalidad. Los errores en el texto, la ortografía o
				el diseño que fueron aprobados por ti no se consideran fallas de fabricación.
			</p>
			<div class="mt-5 rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 p-4">
				<p class="text-sm text-gray-300">
					<strong class="text-brand-yellow">Importante:</strong> Los productos personalizados
					no están sujetos al derecho a retracto bajo la normativa vigente, ya que se fabrican
					según tus especificaciones. Por eso es tan importante revisar bien el diseño antes de
					dar el visto bueno.
				</p>
			</div>
		</div>
	</section>

	<!-- Garantía por fallas de fabricación -->
	<section id="garantia-fabricacion" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				🔧
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Garantía por fallas de fabricación</h2>
				<p class="text-sm text-gray-400">Durante los primeros 30 días atendemos tu reclamo con prioridad.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Tus productos cuentan con <strong class="text-gray-200">garantía legal</strong> para
				fallas que se originen en nuestra producción: defectos estructurales, estampados que
				no coinciden con el diseño aprobado o problemas que impiden el uso normal del producto.
				Durante los <strong class="text-gray-200">primeros 30 días</strong> desde la recepción,
				atendemos tu reclamo con prioridad.
			</p>
			<p class="mt-3 leading-relaxed text-gray-400">
				Esto no excluye los derechos que te otorga la <strong class="text-gray-200">Ley N°
				19.496</strong>: la garantía legal para productos nuevos es de hasta
				<strong class="text-gray-200">6 meses</strong> desde la entrega.
			</p>
			<p class="mt-3 leading-relaxed text-gray-400">
				Antes de aprobar una reparación, reemplazo o devolución, realizamos una
				<strong class="text-gray-200">inspección técnica</strong> del producto para verificar
				la falla. Si se confirma, y de acuerdo a la ley, puedes optar por la
				<strong class="text-gray-200">reparación, el reemplazo o la devolución del dinero</strong>.
			</p>
		</div>
	</section>

	<!-- Lo que NO cubre la garantía -->
	<section id="no-cubre" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				🚫
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Lo que NO cubre la garantía</h2>
				<p class="text-sm text-gray-400">Casos que quedan fuera de nuestra garantía de fabricación.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
				{#each noCubre as item}
					<li class="flex items-start gap-2">
						<span class="mt-0.5 text-brand-yellow" aria-hidden="true">•</span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Derecho a retracto -->
	<section id="retracto" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				🔄
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Derecho a retracto (solo productos no personalizados)</h2>
				<p class="text-sm text-gray-400">Aplica a productos estándar comprados en línea o a distancia.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Para productos <strong class="text-gray-200">no personalizados</strong> comprados en
				línea o a distancia —como tinta 29cc, repuestos o accesorios— tienes derecho a
				retracto: puedes devolver el producto dentro de
				<strong class="text-gray-200">10 días corridos</strong> desde que lo recibes. Para
				ejercerlo, cumple estas condiciones:
			</p>
			<ul class="mt-4 space-y-3 text-sm leading-relaxed text-gray-400">
				{#each condicionesRetracto as condicion}
					<li class="flex items-start gap-2">
						<span class="mt-0.5 text-brand-yellow" aria-hidden="true">•</span>
						<span>{condicion}</span>
					</li>
				{/each}
			</ul>
			<p class="mt-4 leading-relaxed text-gray-400">
				Una vez que recibimos e inspeccionamos el producto, hacemos la devolución del dinero
				por el mismo medio de pago o por transferencia bancaria, en un plazo de
				<strong class="text-gray-200">2 a 3 días hábiles</strong>.
			</p>
			<div class="mt-5 rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 p-4">
				<p class="text-sm text-gray-300">
					<strong class="text-brand-yellow">Recuerda:</strong> los productos personalizados
					están excluidos del derecho a retracto, porque se fabrican según tus especificaciones.
					<a
						href="#aprobacion-diseno"
						class="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 transition-colors hover:decoration-brand-yellow"
					>Revisa aquí</a
					> cómo funciona la aprobación de diseño.
				</p>
			</div>
		</div>
	</section>

	<!-- Transporte y responsabilidad -->
	<section id="transporte" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				🚚
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Transporte y responsabilidad</h2>
				<p class="text-sm text-gray-400">Dónde termina nuestra responsabilidad al despachar.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Coordinamos tu envío por <strong class="text-gray-200">Starken o Bluexpress</strong>
				según tu comuna de destino. Nosotros somos responsables de fabricar tu pedido dentro
				del plazo informado y de entregarlo a la empresa de transporte en buenas condiciones.
			</p>
			<p class="mt-3 leading-relaxed text-gray-400">
				No nos hacemos responsables por retrasos, pérdidas o daños atribuibles a la empresa de
				transporte. Para conocer coberturas, tiempos y condiciones de entrega, revisa nuestra
				página de
				<a
					href="/despacho"
					class="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 transition-colors hover:decoration-brand-yellow"
				>despacho y envíos</a
				>.
			</p>
		</div>
	</section>

	<!-- Clientes empresa (B2B) -->
	<section id="clientes-empresa" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				🏢
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">Clientes empresa (B2B)</h2>
				<p class="text-sm text-gray-400">Cómo se rigen las operaciones entre empresas.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<p class="leading-relaxed text-gray-400">
				Las operaciones entre empresas se rigen por las normas generales del comercio. Si
				necesitas condiciones particulares para tu empresa, conversémoslo al momento de tu
				compra y lo dejamos coordinado.
			</p>
		</div>
	</section>

	<!-- ¿Cómo gestiono un reclamo? -->
	<section id="reclamos" class="mx-auto mt-14 max-w-4xl scroll-mt-24">
		<div class="mb-6 flex items-center gap-3">
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
				aria-hidden="true"
			>
				💬
			</span>
			<div>
				<h2 class="text-xl font-bold text-white sm:text-2xl">¿Cómo gestiono un reclamo?</h2>
				<p class="text-sm text-gray-400">Tres pasos simples y te ayudamos a resolverlo.</p>
			</div>
		</div>
		<div class="rounded-xl bg-brand-card p-6">
			<ol class="space-y-4">
				{#each pasosReclamo as paso, i}
					<li class="flex items-start gap-3">
						<span
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-sm font-bold text-brand-yellow"
							aria-hidden="true"
						>
							{i + 1}
						</span>
						<div>
							<p class="font-semibold text-white">{paso.title}</p>
							<p class="mt-1 text-sm leading-relaxed text-gray-400">{paso.description}</p>
						</div>
					</li>
				{/each}
			</ol>
			<div class="mt-6">
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
			</div>
		</div>
	</section>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<div
		class="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-purple to-purple-800 p-8 text-center shadow-xl sm:p-12"
	>
		<h2 class="text-2xl font-bold text-white sm:text-3xl">¿Tienes dudas sobre tu garantía?</h2>
		<p class="mx-auto mt-3 max-w-lg text-purple-200">
			Escríbenos por WhatsApp con los datos de tu pedido y te ayudamos a resolver cualquier
			consulta sobre garantía, cambios o devoluciones.
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
				href="/despacho"
				class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
			>
				🚚
				Despacho y envíos
			</a>
			<a
				href="/faq"
				class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
			>
				💬
				Preguntas frecuentes
			</a>
		</div>
		<p class="mt-4 text-sm text-purple-200">
			También puedes escribirnos al {PHONE_DISPLAY} o a timbresysellossaldias@gmail.com.
		</p>
	</div>
</section>
