<script lang="ts">
	import { items, isHydrated, toggleSelection, selectAll, deselectAll, selectedTotal, selectedLines, removeFromCart } from '$lib/stores/cart.svelte';
	import { cartWhatsAppUrl } from '$lib/utils/wsp';
	import { priceFormat } from '$lib/data/products';
	import CartItemRow from './CartItemRow.svelte';
	import ConfirmDialog from './ConfirmDialog.svelte';

	let deleteTarget = $state<string | null>(null);
	let confirmOpen = $state(false);

	function requestDelete(key: string): void {
		deleteTarget = key;
		confirmOpen = true;
	}

	function confirmDelete(): void {
		if (deleteTarget) removeFromCart(deleteTarget);
		deleteTarget = null;
	}

	const hasSelection = $derived(selectedLines().length > 0);
	const allSelected = $derived(items.length > 0 && items.every((l) => l.selected));
</script>

<aside class="fixed right-0 top-16 z-30 hidden h-[calc(100dvh-4rem)] w-[300px] flex-col border-l border-gray-700 bg-gray-900 shadow-2xl md:flex">
	<!-- Header -->
	<div class="flex items-center justify-between border-b border-gray-700 px-4 py-3">
		<h2 class="text-sm font-bold uppercase tracking-wide text-white">Carrito</h2>
		<button
			onclick={allSelected ? deselectAll : selectAll}
			class="text-xs font-medium text-brand-purple transition-colors hover:text-brand-purple/80"
		>
			{allSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
		</button>
	</div>

	<!-- Item list -->
	<div class="flex-1 space-y-2 overflow-y-auto p-3">
		{#each items as line (line.key)}
			<CartItemRow {line} onToggle={toggleSelection} onDelete={requestDelete} />
		{/each}
	</div>

	<!-- Footer -->
	<div class="space-y-3 border-t border-gray-700 p-4">
		<div class="flex items-center justify-between">
			<span class="text-sm text-gray-400">Total a pagar</span>
			<span class="text-xl font-bold text-brand-yellow">{priceFormat(selectedTotal())}</span>
		</div>

		<a
			href={hasSelection ? cartWhatsAppUrl(selectedLines()) : undefined}
			target={hasSelection ? '_blank' : undefined}
			rel={hasSelection ? 'noopener noreferrer' : undefined}
			aria-disabled={!hasSelection}
			class="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all
				{hasSelection ? 'bg-green-500 hover:bg-green-600' : 'cursor-not-allowed bg-gray-700 text-gray-500'}"
		>
			Continuar
		</a>

		<a
			href="/carrito"
			class="flex w-full items-center justify-center rounded-lg border border-gray-600 px-6 py-2.5 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-800"
		>
			Ir al carrito
		</a>
	</div>
</aside>

<ConfirmDialog
	bind:open={confirmOpen}
	title="Eliminar producto"
	message="¿Seguro que quieres quitar este producto del carrito?"
	confirmLabel="Eliminar"
	onConfirm={confirmDelete}
/>
