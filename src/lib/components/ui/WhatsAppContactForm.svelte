<script lang="ts">
	import { WHATSAPP_NUMBER } from '$lib/utils/wsp';
	import { createBrowserClient } from '$lib/utils/supabase';
	import { getAuthState } from '$lib/stores/auth.svelte';

	let { open = $bindable(false), sidebarOpen = false }: { open?: boolean; sidebarOpen?: boolean } = $props();

	const auth = getAuthState();

	let name = $state('');
	let phone = $state('+56 9 ');
	let privacyAccepted = $state(false);
	let errors = $state<{ name?: string; phone?: string; privacy?: string }>({});
	let isSubmitting = $state(false);

	function validate(): boolean {
		errors = {};

		if (!name.trim()) {
			errors.name = 'El nombre es requerido';
		}

		const phoneDigits = phone.replace(/\D/g, '');
		// +56 9 = 8 digits (56 + 9 + 8 local) = 10 digits total, but we want 8 local digits after +56 9
		const localDigits = phone.replace('+56 9 ', '').replace(/\D/g, '');
		if (!localDigits) {
			errors.phone = 'El teléfono es requerido';
		} else if (!/^[0-9]{8}$/.test(localDigits)) {
			errors.phone = 'Ingresa 8 dígitos después de +56 9';
		}

		if (!privacyAccepted) {
			errors.privacy = 'Debes aceptar la política de privacidad';
		}

		return Object.keys(errors).length === 0;
	}

	async function saveLeadToSupabase(): Promise<void> {
		const supabase = createBrowserClient();
		const { error } = await supabase.from('leads').insert({
			name: name.trim(),
			phone: phone.trim(),
			message: `Hola! Soy ${name.trim()}.\nMi teléfono es ${phone.trim()}.\nQuiero información sobre sus productos.`,
			source: 'whatsapp_float',
			user_id: auth.user?.id ?? null
		});

		if (error) {
			console.error('Error saving lead:', error);
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!validate() || isSubmitting) return;

		isSubmitting = true;

		try {
			// Save to Supabase (don't await - fire and forget)
			saveLeadToSupabase();

			// Open WhatsApp with full phone number
			const fullPhone = phone.replace(/\s/g, '');
			const message = `Hola! Soy ${name.trim()}.\nMi teléfono es ${fullPhone}.\nQuiero información sobre sus productos.`;
			const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
			window.open(url, '_blank');

			open = false;
			name = '';
			phone = '+56 9 ';
			privacyAccepted = false;
		} finally {
			isSubmitting = false;
		}
	}

	function handleClose() {
		open = false;
		name = '';
		phone = '+56 9 ';
		privacyAccepted = false;
		errors = {};
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="fixed bottom-24 z-[100] w-[340px] rounded-2xl bg-gray-900 shadow-2xl border border-gray-700 right-6 {sidebarOpen ? 'md:right-[316px]' : ''}"
	>
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-gray-700 px-4 py-3">
			<div class="flex items-center gap-3">
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-4 w-4">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
					</svg>
				</div>
				<h2 class="text-sm font-semibold text-white">Contacto WhatsApp</h2>
			</div>
			<button
				onclick={handleClose}
				class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
				aria-label="Cerrar"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Body -->
		<form onsubmit={handleSubmit} class="p-4">
			<p class="mb-4 text-xs text-gray-300 leading-relaxed">
				Hola soy del equipo tecnico de Timbres y Sellos Saldias, Dejame tu nombre y un telefono y te atiendo personalmente por WhatsApp.
			</p>

			<!-- Name field -->
			<div class="mb-3">
				<label for="contact-name" class="mb-1 block text-xs font-medium text-gray-300">
					Nombre
				</label>
				<input
					id="contact-name"
					type="text"
					bind:value={name}
					placeholder="Tu nombre"
					class="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
				/>
				{#if errors.name}
					<p class="mt-1 text-xs text-red-400">{errors.name}</p>
				{/if}
			</div>

			<!-- Phone field -->
			<div class="mb-3">
				<label for="contact-phone" class="mb-1 block text-xs font-medium text-gray-300">
					Teléfono
				</label>
				<div class="flex">
					<span class="flex items-center rounded-l-lg border border-r-0 border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-300">
						+56 9
					</span>
					<input
						id="contact-phone"
						type="tel"
						bind:value={phone}
						placeholder="12345678"
						maxlength="13"
						class="w-full rounded-r-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
					/>
				</div>
				{#if errors.phone}
					<p class="mt-1 text-xs text-red-400">{errors.phone}</p>
				{/if}
			</div>

			<!-- Privacy policy checkbox -->
			<div class="mb-4">
				<label class="flex items-start gap-2 cursor-pointer">
					<input
						type="checkbox"
						bind:checked={privacyAccepted}
						class="mt-0.5 h-3.5 w-3.5 rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500 focus:ring-offset-0"
					/>
					<span class="text-xs text-gray-400">
						Acepto la <a href="/privacidad" target="_blank" class="text-green-500 hover:text-green-400 underline">política de privacidad</a>
					</span>
				</label>
				{#if errors.privacy}
					<p class="mt-1 text-xs text-red-400">{errors.privacy}</p>
				{/if}
			</div>

			<!-- Submit button -->
			<button
				type="submit"
				class="w-full rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-600"
			>
				Abrir WhatsApp
			</button>
		</form>
	</div>
{/if}
