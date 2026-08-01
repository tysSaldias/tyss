<script lang="ts">
	import { generateSimpleWhatsAppLink, PHONE_DISPLAY } from '$lib/utils/wsp';
	import { INSTAGRAM_URL } from '$lib/data/site';

	type FaqItem = { q: string; a: string };
	type FaqCategory = { id: string; title: string; description: string; icon: string; items: FaqItem[] };

	const WHATSAPP_LINK = generateSimpleWhatsAppLink();
	const INSTAGRAM_LINK = INSTAGRAM_URL;

	// Escape text so answers stay plain text with only the injected <a> tags.
	const escapeHtml = (text: string) =>
		text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	const anchorClass =
		'text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 transition-colors hover:decoration-brand-yellow';

	// Helpers to build inline links inside answers (rendered with {@html}).
	const whatsappAnchor = (text = 'WhatsApp') =>
		`<a href="${WHATSAPP_LINK}" target="_blank" rel="noopener noreferrer" class="${anchorClass}">${escapeHtml(text)}</a>`;
	const instagramAnchor = (text = '@timbresysellos_saldias') =>
		`<a href="${INSTAGRAM_LINK}" target="_blank" rel="noopener noreferrer" class="${anchorClass}">${escapeHtml(text)}</a>`;
	const internalLink = (href: string, text: string) =>
		`<a href="${href}" class="${anchorClass}">${escapeHtml(text)}</a>`;

	const categories: FaqCategory[] = [
		{
			id: 'sobre-nosotros',
			title: 'Sobre Timbres y Sellos Saldias',
			description: 'Quiénes somos y cómo funcionamos.',
			icon: '🏪',
			items: [
				{
					q: '¿Qué es Timbres y Sellos Saldias?',
					a: 'Timbres y Sellos Saldias es un negocio familiar dedicado a la fabricación de timbres y sellos personalizados, con taller en la Región de Valparaíso. Fabricamos timbres de goma, timbres automáticos, fechadores, numeradores, tampones manuales y accesorios, con calidad artesanal y atención personalizada en cada pedido.'
				},
				{
					q: '¿Qué productos fabrican?',
					a: 'Fabricamos timbres de goma personalizados, timbres automáticos (rectangulares, cuadrados y redondos), timbres manuales con mango de madera, tampones, fechadores, numeradores y accesorios como tinta para timbres. Todos los timbres personalizados se fabrican con tu texto, tamaño y color.'
				},
				{
					q: '¿Dónde están ubicados?',
					a: 'Nuestra tienda principal está en Av. Valparaíso 1311, Villa Alemana, Región de Valparaíso, y contamos con una sucursal en Estilomania — Uniformes Corporativos, en Calle Santiago 851, local 4, Villa Alemana.'
				},
				{
					q: '¿Atienden en todo Chile?',
					a: 'Sí. Realizamos envíos a todo Chile por Starken o Bluexpress y ofrecemos despacho gratis en Quilpué, Villa Alemana y Belloto. Puedes hacer tu pedido desde cualquier región y te lo enviamos hasta tu domicilio.'
				},
				{
					q: '¿Cómo puedo contactarlos?',
					a: `Puedes escribirnos por ${whatsappAnchor()} al ${PHONE_DISPLAY}, enviarnos un correo a timbresysellossaldias@gmail.com o visitarnos en nuestras sucursales de Villa Alemana. También puedes usar el formulario de nuestra página de ${internalLink('/contacto', 'contacto')}.`
				},
				{
					q: '¿Cuál es el horario de atención?',
					a: 'Atendemos de lunes a viernes de 10:00 a 18:00 hrs. La atención presencial es por orden de llegada, sin necesidad de pedir hora. Por WhatsApp respondemos durante el mismo horario.'
				},
				{
					q: '¿Cómo hago un pedido?',
					a: `Es muy simple: elige tu producto en nuestro ${internalLink('/catalogo', 'catálogo')}, define el tamaño y texto de tu timbre, y envíanos tu cotización por ${whatsappAnchor()} al ${PHONE_DISPLAY}. Te confirmamos precio, tiempo de fabricación y forma de entrega.`
				},
				{
					q: '¿Atienden por WhatsApp?',
					a: `Sí, el ${whatsappAnchor('WhatsApp')} ${PHONE_DISPLAY} es nuestro canal principal de atención. Por ahí puedes cotizar, enviar tu logo o diseño y coordinar el despacho o retiro de tu pedido.`
				},
				{
					q: '¿Puedo comprar sin salir de casa?',
					a: 'Por supuesto. Todo el proceso se puede hacer a distancia: cotizas por WhatsApp, pagas por transferencia o tarjeta, y recibes tu pedido por despacho a todo Chile o con retiro en tienda si lo prefieres.'
				},
				{
					q: '¿Timbres y Sellos Saldias es una empresa familiar?',
					a: 'Sí, Timbres y Sellos Saldias es un negocio familiar de hermanos, con taller en la Región de Valparaíso. Cada timbre se fabrica con calidad artesanal y una atención cercana y personalizada.'
				}
			]
		},
		{
			id: 'ubicacion',
			title: 'Ubicación y Sucursales',
			description: 'Dónde encontrarnos en Villa Alemana.',
			icon: '📍',
			items: [
				{
					q: '¿Dónde está la tienda principal de Timbres y Sellos Saldias?',
					a: 'La tienda principal está en Av. Valparaíso 1311, Villa Alemana, Región de Valparaíso. Ahí fabricamos y entregamos timbres y sellos personalizados, con atención de lunes a viernes de 10:00 a 18:00 hrs.'
				},
				{
					q: '¿Dónde queda la sucursal Estilomania?',
					a: 'La sucursal Estilomania — Uniformes Corporativos queda en Calle Santiago 851, local 4, Villa Alemana. Es uno de nuestros puntos de venta oficiales, junto a la tienda principal de Av. Valparaíso 1311.'
				},
				{
					q: '¿Atienden en Viña del Mar, Valparaíso o Quilpué?',
					a: 'Sí, atendemos a clientes de toda la Región de Valparaíso. Ofrecemos despacho gratis en Quilpué, Villa Alemana y Belloto, y envíos por Starken o Bluexpress a Viña del Mar, Valparaíso y todo Chile.'
				},
				{
					q: '¿Necesito pedir hora para visitar la tienda?',
					a: 'No, no necesitas hora. La atención presencial es por orden de llegada, de lunes a viernes entre 10:00 y 18:00 hrs. Puedes llegar directamente a Av. Valparaíso 1311, Villa Alemana.'
				},
				{
					q: '¿Qué productos encuentro en la sucursal Estilomania?',
					a: `Estilomania es una de nuestras sucursales oficiales y se especializa en uniformes corporativos. Para saber qué productos y entregas se coordinan desde esa sucursal, escríbenos por ${whatsappAnchor()} al ${PHONE_DISPLAY} y te confirmamos.`
				}
			]
		},
		{
			id: 'envios',
			title: 'Envíos y Despacho',
			description: 'Cobertura, plazos y formas de entrega.',
			icon: '🚚',
			items: [
				{
					q: '¿Envían a todo Chile?',
					a: `Sí, realizamos envíos a todo Chile. Tu pedido se despacha a través de Starken o Bluexpress, con opción de pago por pagar (contra entrega). No importa en qué región estés, coordinamos la entrega de tu timbre. Puedes revisar nuestra página de ${internalLink('/despacho', 'despacho y envíos')} para conocer la cobertura, los tiempos y las condiciones de entrega.`
				},
				{
					q: '¿Qué empresas de transporte utilizan?',
					a: 'Trabajamos con Starken y Bluexpress para los envíos dentro de Chile. El envío puede pagarse por pagar (contra entrega) al recibir tu pedido.'
				},
				{
					q: '¿Cuánto demora un envío?',
					a: `El tiempo de envío depende del destino y es el que indique la empresa de transporte al momento de coordinar la entrega. En Timbres y Sellos Saldias te informamos el plazo estimado al confirmar tu pedido por WhatsApp. En nuestra página de ${internalLink('/despacho', 'despacho y envíos')} separamos claramente el tiempo de fabricación del tiempo de envío.`
				},
				{
					q: '¿Cuánto demora la fabricación de un timbre?',
					a: 'La fabricación normalmente toma de 1 a 2 días como máximo para cantidades al detalle. Si algún modelo no tiene stock, te lo informamos de inmediato y podemos cambiar el modelo o reagendar la fecha de entrega.'
				},
				{
					q: '¿Puedo retirar mi pedido personalmente?',
					a: `Sí, puedes retirar tu pedido directamente en nuestros puntos de venta oficiales: Av. Valparaíso 1311, Villa Alemana, o la sucursal Estilomania en Calle Santiago 851, local 4. Coordina el retiro por WhatsApp y te lo dejamos listo. En nuestra página de ${internalLink('/despacho', 'despacho y envíos')} encuentras las direcciones, los horarios y las condiciones de retiro.`
				},
				{
					q: '¿Tienen despacho gratis?',
					a: 'Sí, el despacho es gratis en Quilpué, Villa Alemana y Belloto. Para el resto de Chile, enviamos por Starken o Bluexpress según la comuna de destino.'
				}
			]
		},
		{
			id: 'pagos',
			title: 'Pagos y Documentación',
			description: 'Medios de pago, boleta y factura.',
			icon: '💳',
			items: [
				{
					q: '¿Qué medios de pago aceptan?',
					a: 'Aceptamos todo tipo de pago: transferencia bancaria, tarjeta de crédito o débito, efectivo y pago contra entrega. Elige el que te sea más cómodo al confirmar tu pedido por WhatsApp.'
				},
				{
					q: '¿Puedo pagar con transferencia?',
					a: 'Sí, puedes pagar tu pedido por transferencia bancaria. Te enviamos los datos de la cuenta al confirmar tu cotización por WhatsApp.'
				},
				{
					q: '¿Aceptan tarjetas?',
					a: 'Sí, aceptamos tarjeta de crédito y débito. Puedes pagar con tarjeta tanto en tienda como al coordinar tu pedido por WhatsApp.'
				},
				{
					q: '¿Puedo pagar en efectivo?',
					a: 'Sí, aceptamos efectivo en nuestros puntos de venta oficiales de Villa Alemana. Si prefieres otro medio, también aceptamos transferencia y tarjeta.'
				},
				{
					q: '¿Puedo pagar contra entrega?',
					a: 'Sí, los envíos por Starken o Bluexpress se pueden despachar por pagar, es decir, pagas al recibir tu pedido. Consulta la disponibilidad de este método al coordinar tu envío por WhatsApp.'
				},
				{
					q: '¿Emiten boleta?',
					a: 'Sí, emitimos boleta por todas nuestras ventas. Al hacer tu pedido, indícanos si la necesitas y te la entregamos junto con tu timbre o la enviamos con el despacho.'
				},
				{
					q: '¿Emiten factura?',
					a: 'Sí, también emitimos factura para empresas e instituciones. Al cotizar por WhatsApp, solicita tu factura y la incluimos en tu pedido junto con los datos tributarios de tu empresa.'
				}
			]
		},
		{
			id: 'productos',
			title: 'Productos',
			description: 'Timbres, fechadores, numeradores y más.',
			icon: '🖊️',
			items: [
				{
					q: '¿Qué tipos de timbres ofrecen?',
					a: 'Ofrecemos timbres de goma personalizados, timbres automáticos (rectangulares, cuadrados y redondos), timbres manuales con mango de madera, tampones manuales, fechadores, numeradores, dactilares y accesorios como tinta para timbres. Todos se fabrican bajo pedido según tu texto y diseño.'
				},
				{
					q: '¿Qué es un timbre automático?',
					a: 'Un timbre automático es un sello con mecanismo de autoentintado: se presiona sobre el papel y se entinta solo, sin necesidad de un tampón aparte. En Timbres y Sellos Saldias los fabricamos personalizados en formatos rectangular, cuadrado y redondo.'
				},
				{
					q: '¿Cuál es la diferencia entre un timbre automático y uno manual?',
					a: 'El timbre automático trae la tinta integrada y se entinta al presionar, por lo que es rápido y limpio, ideal para oficinas. El timbre manual usa un mango de madera y requiere un tampón o almohadilla con tinta aparte; permite superficies más grandes y es muy usado en documentos, bodegas y packaging.'
				},
				{
					q: '¿Qué es un tampón manual?',
					a: 'Un tampón manual es un sello de goma que se entinta con una almohadilla o tinta aparte. Es ideal para marcas de gran superficie, como cajas, planos y documentos, y está disponible en varios tamaños según lo que necesites.'
				},
				{
					q: '¿Qué ventajas tienen los timbres de goma?',
					a: 'Los timbres de goma ofrecen impresiones nítidas y duraderas, se fabrican a medida con tu texto, logo o diseño, y permiten tamaños y formas personalizadas. Además, su fabricación es artesanal y con materiales de primera calidad, lo que garantiza un resultado limpio en cada estampado.'
				},
				{
					q: '¿Qué tamaños tienen los timbres?',
					a: 'Los timbres automáticos rectangulares van desde el XL10 (12×25 mm) hasta el XL40 (22×57 mm); los cuadrados desde 30×30 mm; los redondos desde Ø 30 mm; y los timbres manuales desde 40×40 mm hasta 150×100 mm. Si necesitas otra medida, consúltanos por WhatsApp.'
				},
				{
					q: '¿Se pueden fabricar timbres con mi logo?',
					a: 'Sí, fabricamos timbres con tu logo o diseño. Envíanos tu logo por WhatsApp y lo incluimos en tu timbre personalizado. También puedes elegir el color de goma que prefieras entre los disponibles.'
				},
				{
					q: '¿Qué es un fechador?',
					a: 'Un fechador es un timbre que incluye una ventana con la fecha, que cambias tú mismo. Se usa para fechar documentos, recibos y correspondencia. Los nuestros son automáticos, con cinta entintada reemplazable, en formatos como 50×30 mm y 64×40 mm.'
				},
				{
					q: '¿Se puede personalizar un fechador?',
					a: 'Sí, los fechadores se personalizan con el texto que necesites (nombre de tu empresa, datos de contacto, entre otros), además de la fecha variable. Escríbenos por WhatsApp con tu texto y te lo cotizamos.'
				},
				{
					q: '¿Qué es un numerador?',
					a: 'Un numerador es un timbre con números variables que avanza de forma correlativa, ideal para numerar facturas, guías, planillas o documentos de control. En Timbres y Sellos Saldias lo fabricamos según la necesidad de cada cliente.'
				},
				{
					q: '¿Cuántos dígitos tiene un numerador?',
					a: 'La cantidad de dígitos depende del modelo y del uso que le darás. Para conocer el modelo disponible y su configuración exacta, escríbenos por WhatsApp con tu requerimiento y te asesoramos.'
				},
				{
					q: '¿Se puede reiniciar un numerador?',
					a: 'Sí, los numeradores se pueden reiniciar, pero la forma de hacerlo varía según el modelo. Envíanos una consulta por WhatsApp con el numerador que necesitas y te explicamos cómo funciona.'
				},
				{
					q: '¿Cuánto dura la tinta de un timbre?',
					a: 'La duración depende del uso, pero en un timbre automático el mínimo es de 100 a 200 usos. La recarga se vende en formato de 29 cc; puedes revisar nuestro catálogo de productos y consultar por la reposición de tinta por WhatsApp.'
				},
				{
					q: '¿Se puede recargar o cambiar la tinta de un timbre?',
					a: 'Depende del modelo: los fechadores automáticos usan cinta entintada reemplazable, y otros timbres automáticos se pueden reentintar con tinta especial para timbres. Para saber qué repuesto corresponde a tu modelo, escríbenos por WhatsApp.'
				}
			]
		},
		{
			id: 'diseno',
			title: 'Diseño y Personalización',
			description: 'Logos, formatos y proceso de fabricación.',
			icon: '🎨',
			items: [
				{
					q: '¿Cómo se cotiza un timbre personalizado?',
					a: `La cotización se hace por ${whatsappAnchor()} al ${PHONE_DISPLAY}. Solo necesitas indicar el producto, elegir el tamaño y enviarnos el texto o diseño. Te respondemos con el precio total, el plazo de fabricación y las opciones de entrega.`
				},
				{
					q: '¿Puedo enviar mi propio diseño o logo?',
					a: 'Sí, puedes enviarnos tu diseño o logo por WhatsApp y lo fabricamos tal cual en tu timbre. También puedes elegir el color de la goma y el tipo de letra si tu timbre lleva texto.'
				},
				{
					q: '¿Pueden crear un diseño desde cero?',
					a: 'Sí, si no tienes diseño, podemos crear uno desde cero para tu timbre. Cuéntanos por WhatsApp qué necesitas (texto, profesión o actividad, datos de tu empresa) y te proponemos un diseño antes de fabricar.'
				},
				{
					q: '¿Qué formatos de archivo aceptan para mi logo?',
					a: 'Aceptamos formatos como PDF, Illustrator y PNG. Envíanos tu logo por WhatsApp y revisamos el archivo para confirmarte que sea apto para la fabricación de tu timbre.'
				},
				{
					q: '¿Qué resolución debe tener mi logo?',
					a: `Para que el logo se vea nítido en tu timbre, lo ideal es que sea un archivo de buena calidad. Envíanos tu diseño por ${whatsappAnchor()} y lo revisamos antes de fabricar; si no es apto, te avisamos y buscamos una solución juntos.`
				},
				{
					q: '¿Revisan el diseño antes de fabricar?',
					a: `Sí, antes de fabricar revisamos cada diseño y te confirmamos por WhatsApp. Así evitamos errores en el texto o el logo, y si hace falta ajustar algo, lo conversamos contigo antes de producir tu timbre. Puedes conocer más sobre la aprobación de diseños y nuestra política en la página de ${internalLink('/garantias', 'Garantías y Devoluciones')}.`
				}
			]
		},
		{
			id: 'empresas',
			title: 'Empresas y Profesionales',
			description: 'Pedidos corporativos e institucionales.',
			icon: '🏢',
			items: [
				{
					q: '¿Fabrican timbres para empresas?',
					a: 'Sí, fabricamos timbres corporativos para empresas de todos los rubros: timbres de recepción, de documentos, fechadores, numeradores y más, todos personalizados con el nombre y logo de tu empresa. También emitimos factura.'
				},
				{
					q: '¿Pueden hacer varios timbres iguales?',
					a: 'Sí, fabricamos varios timbres idénticos para que cada persona o área de tu empresa tenga el suyo. Haz tu pedido por WhatsApp con la cantidad que necesitas y te cotizamos.'
				},
				{
					q: '¿Ofrecen descuentos por cantidad?',
					a: 'Sí, trabajamos precios al detalle y por mayor dependiendo de la cantidad de productos que necesites. Escríbenos por WhatsApp con tu requerimiento y te enviamos una cotización según el volumen.'
				},
				{
					q: '¿Atienden instituciones públicas, colegios o municipalidades?',
					a: 'No trabajamos con mercado público ni Chilecompra. Para empresas y particulares, en cambio, sí fabricamos timbres personalizados, fechadores y numeradores, y emitimos boleta o factura.'
				},
				{
					q: '¿Hacen timbres para médicos, abogados, profesores o contadores?',
					a: 'Sí, fabricamos timbres profesionales personalizados para cualquier profesión: médicos, abogados, profesores, contadores, dentistas y muchos más. Envíanos tu texto por WhatsApp y lo fabricamos con tu nombre, título y especialidad.'
				}
			]
		},
		{
			id: 'por-que-elegirnos',
			title: 'Por Qué Elegirnos',
			description: 'Nuestra diferencia y cómo seguirnos.',
			icon: '⭐',
			items: [
				{
					q: '¿Por qué elegir Timbres y Sellos Saldias?',
					a: `Porque somos un negocio familiar con fabricación artesanal en la Región de Valparaíso: trabajamos con materiales de calidad, revisamos cada timbre antes de entregarlo y te atendemos de forma personalizada por WhatsApp, con despacho gratis en Quilpué, Villa Alemana y Belloto. Conoce más en nuestra página de ${internalLink('/por-que-elegirnos', 'por qué elegirnos')}.`
				},
				{
					q: '¿Qué diferencia a Timbres y Sellos Saldias?',
					a: 'Lo que nos diferencia es la atención cercana y la calidad artesanal: cada timbre se fabrica a medida, se revisa a mano y se coordina contigo en cada paso, desde la cotización hasta la entrega. Además, ofrecemos despacho gratis en la zona y envíos a todo Chile.'
				},
				{
					q: '¿Dónde puedo ver trabajos realizados?',
					a: `Puedes ver una muestra de nuestros trabajos en nuestra página de ${internalLink('/galeria', 'galería')} y en nuestro Instagram ${instagramAnchor()}.`
				},
				{
					q: '¿Puedo ver el catálogo en línea?',
					a: `Sí, en nuestra página de ${internalLink('/catalogo', 'catálogo')} encuentras los productos disponibles con sus tamaños y precios: timbres automáticos, manuales, fechadores, tampones y accesorios. Desde ahí puedes armar tu pedido y cotizarlo por WhatsApp.`
				},
				{
					q: '¿Cómo puedo seguir a Timbres y Sellos Saldias en redes sociales?',
					a: `Síguenos en Instagram en ${instagramAnchor()}, donde publicamos nuestros trabajos y novedades. También puedes escribirnos por WhatsApp al ${PHONE_DISPLAY} o visitar nuestra página de ${internalLink('/contacto', 'contacto')}.`
				}
			]
		}
	];

	// FAQPage structured data for Google (single source of truth: built from the same categories).
	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: categories.flatMap((category) =>
			category.items.map((item) => ({
				'@type': 'Question',
				name: item.q,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.a.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
				}
			}))
		)
	};
</script>

<svelte:head>
	<title>Preguntas Frecuentes | Timbres y Sellos Saldias</title>
	<meta
		name="description"
		content="Resolvemos tus dudas sobre timbres y sellos personalizados: ubicación, envíos a todo Chile, pagos, productos, personalización y más. Timbres y Sellos Saldias, Villa Alemana."
	/>
	<meta property="og:title" content="Preguntas Frecuentes | Timbres y Sellos Saldias" />
	<meta property="og:description" content="Resolvemos tus dudas sobre timbres y sellos personalizados: ubicación, envíos, pagos, productos y personalización." />
	<meta property="og:url" content="https://timbres-y-sellos-saldias.netlify.app/faq" />
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-3xl font-bold text-white sm:text-4xl">Preguntas Frecuentes</h1>
		<p class="mt-4 leading-relaxed text-gray-400">
			Resolvemos las dudas más comunes sobre nuestros timbres y sellos personalizados: cómo
			comprar, envíos a todo Chile, pagos, personalización y más. Si no encuentras tu
			respuesta, escríbenos por WhatsApp y te ayudamos.
		</p>
	</div>

	<!-- Quick nav -->
	<div class="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
		{#each categories as category}
			<a
				href="#{category.id}"
				class="rounded-xl border border-brand-border bg-brand-card px-4 py-3 text-center text-sm font-medium text-gray-300 transition-colors hover:border-brand-purple hover:text-white"
			>
				{category.title}
			</a>
		{/each}
	</div>

	<!-- Categories -->
	<div class="mx-auto mt-14 max-w-4xl space-y-14">
		{#each categories as category}
			<section id={category.id} class="scroll-mt-24">
				<div class="mb-6 flex items-center gap-3">
					<span
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-lg"
						aria-hidden="true"
					>
						{category.icon}
					</span>
					<div>
						<h2 class="text-xl font-bold text-white sm:text-2xl">{category.title}</h2>
						<p class="text-sm text-gray-400">{category.description}</p>
					</div>
				</div>

				<div class="space-y-3">
					{#each category.items as item}
						<details
							class="group rounded-xl border border-brand-border bg-brand-card px-5 py-4 transition-colors open:border-brand-purple/40 open:bg-brand-card"
						>
							<summary
								class="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white [&::-webkit-details-marker]:hidden sm:text-base"
							>
								<span>{item.q}</span>
								<span
									class="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-purple/20 text-brand-yellow transition-transform duration-200 group-open:rotate-45"
									aria-hidden="true"
								>
									<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
										<path d="M12 5v14M5 12h14" />
									</svg>
								</span>
							</summary>
							<div class="mt-3 text-sm leading-relaxed text-gray-400">
								{@html item.a}
							</div>
						</details>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<div
		class="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-purple to-purple-800 p-8 text-center shadow-xl sm:p-12"
	>
		<h2 class="text-2xl font-bold text-white sm:text-3xl">¿No encontraste tu respuesta?</h2>
		<p class="mx-auto mt-3 max-w-lg text-purple-200">
			Escríbenos por WhatsApp y te respondemos todas tus dudas. También puedes seguirnos en
			Instagram para ver nuestros trabajos.
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
	</div>
</section>
