<script lang="ts">
	import { WHATSAPP_NUMBER, PHONE_DISPLAY } from '$lib/utils/wsp';
</script>

<svelte:head>
	<title>Política de Privacidad | Timbres y Sellos Saldias</title>
	<meta name="description" content="Conoce cómo Timbres y Sellos Saldias protege y maneja tus datos personales conforme a la Ley 21.719 de Protección de Datos Personales de Chile." />
	<meta property="og:title" content="Política de Privacidad | Timbres y Sellos Saldias" />
	<meta property="og:description" content="Política de privacidad de Timbres y Sellos Saldias conforme a la Ley 21.719." />
</svelte:head>

<section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
	<h1 class="mb-8 text-3xl font-bold text-white">Política de Privacidad</h1>

	<p class="mb-6 text-sm text-gray-400">
		Última actualización: 13 de agosto de 2026
	</p>

	<div class="space-y-8 text-gray-300 leading-relaxed">
		<!-- Introducción -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">1. Introducción</h2>
			<p>
				En <strong class="text-white">Timbres y Sellos Saldias</strong> ("nosotros", "nuestro"), la protección de tus datos personales es una prioridad. Esta política describe cómo recopilamos, usamos, almacenamos y protegemos tu información personal, en conformidad con la <strong class="text-white">Ley 21.719 de Protección de Datos Personales</strong> de la República de Chile.
			</p>
		</div>

		<!-- Datos que recopilamos -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">2. Datos que recopilamos</h2>
			<p class="mb-3">Recopilamos únicamente los datos necesarios para atender tu consulta:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li><strong class="text-white">Formulario de contacto:</strong> nombre y número de teléfono</li>
				<li><strong class="text-white">Autenticación (opcional):</strong> email y nombre, si iniciás sesión con Google</li>
				<li><strong class="text-white">Carrito de compras:</strong> productos seleccionados (almacenados localmente en tu navegador, no en nuestros servidores)</li>
			</ul>
		</div>

		<!-- Finalidad -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">3. Finalidad del tratamiento</h2>
			<p class="mb-3">Usamos tus datos personales exclusivamente para:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Atender tu consulta o cotización por WhatsApp</li>
				<li>Comunicarnos contigo respecto a tu pedido</li>
				<li>Mejorar la experiencia de compra en nuestro sitio</li>
			</ul>
			<p class="mt-3">
				<strong class="text-white">No utilizamos tus datos para fines distintos</strong> a los aquí indicados.
			</p>
		</div>

		<!-- Base legal -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">4. Base legal</h2>
			<p>
				El tratamiento de tus datos se fundamenta en tu <strong class="text-white">consentimiento explícito</strong>, otorgado al completar nuestro formulario de contacto y aceptar esta política. Conforme al Artículo 7 de la Ley 21.719, el consentimiento debe ser libre, informado, inequívoco y específico.
			</p>
		</div>

		<!-- Transferencia -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">5. Transferencia y compartir de datos</h2>
			<p>
				<strong class="text-white">No vendemos, alquilamos ni compartimos</strong> tus datos personales con terceros, salvo en los siguientes casos:
			</p>
			<ul class="list-disc pl-6 space-y-2 mt-3">
				<li>Cuando lo requiera la ley o una orden judicial</li>
				<li>Para cumplir con obligaciones legales</li>
			</ul>
		</div>

		<!-- Almacenamiento y seguridad -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">6. Almacenamiento y seguridad</h2>
			<p>
				Tus datos se almacenan en servidores seguros de <strong class="text-white">Supabase</strong>, con cifrado en tránsito (TLS) y en reposo. Implementamos medidas técnicas y organizativas para proteger tu información contra acceso no autorizado, pérdida o uso indebido.
			</p>
		</div>

		<!-- Conservación -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">7. Conservación de los datos</h2>
			<p>
				Conservamos tus datos personales mientras sean necesarios para cumplir con la finalidad para la que fueron recopilados, o mientras exista una relación comercial activa. Podés solicitar la eliminación de tus datos en cualquier momento.
			</p>
		</div>

		<!-- Derechos -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">8. Tus derechos (Arts. 16-23, Ley 21.719)</h2>
			<p class="mb-3">Conforme a la ley, tenés derecho a:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li><strong class="text-white">Acceso:</strong> saber qué datos personales tenemos sobre vos</li>
				<li><strong class="text-white">Rectificación:</strong> corregir datos inexactos o incompletos</li>
				<li><strong class="text-white">Eliminación:</strong> solicitar la supresión de tus datos</li>
				<li><strong class="text-white">Oposición:</strong> oponerte al tratamiento de tus datos</li>
				<li><strong class="text-white">Portabilidad:</strong> recibir tus datos en formato estructurado y de uso común</li>
				<li><strong class="text-white">Revocación del consentimiento:</strong> retirar tu aceptación en cualquier momento</li>
			</ul>
			<p class="mt-3">
				Para ejercer estos derechos, contactanos a través de los medios indicados más abajo.
			</p>
		</div>

		<!-- Menores -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">9. Menores de edad</h2>
			<p>
				Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente datos personales de menores de edad. Si descubrimos que hemos recopilado datos de un menor, procederemos a eliminarlos de inmediato.
			</p>
		</div>

		<!-- Cookies -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">10. Cookies y tecnologías similares</h2>
			<p>
				Utilizamos cookies técnicas esenciales para el funcionamiento del sitio (carrito de compras, preferencias). No utilizamos cookies de rastreo publicitario ni de terceros.
			</p>
		</div>

		<!-- Cambios -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">11. Cambios en esta política</h2>
			<p>
				Nos reservamos el derecho de actualizar esta política en cualquier momento. Los cambios serán publicados en esta página con la fecha de última actualización. Te recomendamos revisar periódicamente esta política.
			</p>
		</div>

		<!-- Contacto -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">12. Contacto</h2>
			<p class="mb-3">Para ejercer tus derechos o si tenés consultas sobre esta política:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li><strong class="text-white">Email:</strong> <a href="mailto:timbresysellossaldias@gmail.com" class="text-green-500 hover:text-green-400 underline">timbresysellossaldias@gmail.com</a></li>
				<li><strong class="text-white">WhatsApp:</strong> <a href="https://wa.me/{WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 underline">{PHONE_DISPLAY}</a></li>
				<li><strong class="text-white">Dirección:</strong> Av. Valparaíso 1311, Villa Alemana, Valparaíso</li>
			</ul>
		</div>

		<!-- Autoridad -->
		<div>
			<h2 class="mb-3 text-xl font-semibold text-white">13. Autoridad competente</h2>
			<p>
				Si considerás que el tratamiento de tus datos no se ajusta a la ley, podés presentar un reclamo ante la <strong class="text-white">Agencia Nacional de Protección de Datos Personales</strong> de Chile.
			</p>
		</div>
	</div>
</section>
