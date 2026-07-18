<script lang="ts">
	import { generateSimpleWhatsAppLink } from '$lib/utils/wsp';

	let submitted = $state(false);
	let error = $state('');
	let honeypot = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';

		// Honeypot check
		if (honeypot) return;

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
			});

			if (response.ok) {
				submitted = true;
			} else {
				error = 'Ocurrió un error al enviar el formulario. Intenta de nuevo o escríbenos por WhatsApp.';
			}
		} catch {
			error = 'Error de conexión. Intenta de nuevo o contáctanos por WhatsApp.';
		}
	}
</script>

<svelte:head>
	<title>Contacto | Timbres y Sellos Saldias</title>
	<meta name="description" content="Contáctanos para cotizar tu timbre personalizado o sello 3D. Estamos en Quilpué, Villa Alemana y Belloto. Responde rápido por WhatsApp." />
	<meta property="og:title" content="Contacto | Timbres y Sellos Saldias" />
	<meta property="og:description" content="Contáctanos para cotizar tu timbre personalizado o sello 3D." />
	<meta property="og:url" content="https://tys-saldias.cl/contacto" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="mx-auto max-w-3xl">
		<h1 class="text-3xl font-bold text-white">Contacto</h1>
		<p class="mt-2 text-gray-400">
			¿Tienes dudas o quieres cotizar? Escríbenos por WhatsApp o completa el formulario.
		</p>

		<div class="mt-10 grid gap-8 lg:grid-cols-2">
			<!-- Form -->
			<div>
				{#if submitted}
					<div class="rounded-xl bg-green-500/10 border border-green-500/30 p-8 text-center">
						<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
							<svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h2 class="text-xl font-semibold text-white">¡Mensaje enviado!</h2>
						<p class="mt-2 text-gray-400">Te responderemos a la brevedad. Gracias por contactarnos.</p>
					</div>
				{:else}
					<form
						method="POST"
						data-netlify="true"
						name="contacto"
						onsubmit={handleSubmit}
						class="space-y-4"
					>
						<input type="hidden" name="form-name" value="contacto" />

						<!-- Honeypot -->
						<div class="hidden" aria-hidden="true">
							<label>
								No llenar
								<input type="text" name="bot-field" bind:value={honeypot} tabindex="-1" autocomplete="off" />
							</label>
						</div>

						<div>
							<label for="nombre" class="mb-1 block text-sm font-medium text-gray-300">Nombre *</label>
							<input
								id="nombre"
								type="text"
								name="nombre"
								required
								class="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
								placeholder="Tu nombre"
							/>
						</div>

						<div>
							<label for="email" class="mb-1 block text-sm font-medium text-gray-300">Email *</label>
							<input
								id="email"
								type="email"
								name="email"
								required
								class="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
								placeholder="tu@email.cl"
							/>
						</div>

						<div>
							<label for="telefono" class="mb-1 block text-sm font-medium text-gray-300">Teléfono</label>
							<input
								id="telefono"
								type="tel"
								name="telefono"
								class="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
								placeholder="+56 9 XXXX XXXX"
							/>
						</div>

						<div>
							<label for="mensaje" class="mb-1 block text-sm font-medium text-gray-300">Mensaje *</label>
							<textarea
								id="mensaje"
								name="mensaje"
								required
								rows={5}
								class="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
								placeholder="¿Qué te gustaría cotizar?"
							></textarea>
						</div>

						{#if error}
							<p class="text-sm text-red-400">{error}</p>
						{/if}

						<button
							type="submit"
							class="w-full rounded-lg bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90"
						>
							Enviar mensaje
						</button>
					</form>
				{/if}
			</div>

			<!-- Contact info -->
			<div class="space-y-8">
				<div class="rounded-xl bg-brand-card p-6">
					<h2 class="text-lg font-semibold text-white">WhatsApp Directo</h2>
					<p class="mt-2 text-sm text-gray-400">
						Te respondemos más rápido por WhatsApp.
					</p>
					<a
						href={generateSimpleWhatsAppLink()}
						target="_blank"
						rel="noopener noreferrer"
						class="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600"
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
						</svg>
						Contáctanos por WhatsApp
					</a>
				</div>

				<div class="rounded-xl bg-brand-card p-6">
					<h2 class="text-lg font-semibold text-white">Información de Despacho</h2>
					<ul class="mt-3 space-y-3 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-0.5">🚚</span>
							<span><strong class="text-gray-200">Despacho gratis</strong> en Quilpué, Villa Alemana y Belloto</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-0.5">📦</span>
							<span><strong class="text-gray-200">Envíos a todo Chile</strong> por Starken o pagos contra entrega</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-0.5">⏰</span>
							<span><strong class="text-gray-200">Horarios:</strong> Lun–Sáb, 9:00–19:00 hrs</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-0.5">📍</span>
							<span><strong class="text-gray-200">Dirección:</strong> Av. Valparaíso 1311, Villa Alemana, Valparaíso</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Mapa -->
		<div class="mt-10 rounded-xl bg-brand-card p-6">
			<h2 class="text-lg font-semibold text-white">Ubicación</h2>
			<p class="mt-2 text-sm text-gray-400">
				Encuéntranos en Av. Valparaíso 1311, Villa Alemana.
			</p>
			<div class="mt-4 overflow-hidden rounded-lg">
				<iframe
					src="https://maps.google.com/maps?q=Avenida+Valparaiso+1311,+Villa+Alemana,+Valparaiso&t=&z=17&ie=UTF8&iwloc=&output=embed"
					width="100%"
					height="350"
					style="border:0;"
					allowfullscreen
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					title="Mapa de ubicación - Av. Valparaíso 1311, Villa Alemana"
				></iframe>
			</div>
		</div>
	</div>
</section>
