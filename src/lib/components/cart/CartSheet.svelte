<script lang="ts">
	import { items, toggleSelection, selectAll, deselectAll, selectedTotal, selectedLines, removeFromCart } from '$lib/stores/cart.svelte';
	import { cartWhatsAppUrl } from '$lib/utils/wsp';
	import { priceFormat } from '$lib/data/products';
	import CartItemRow from './CartItemRow.svelte';
	import ConfirmDialog from './ConfirmDialog.svelte';

	let {
		open = $bindable(false),
	}: { open: boolean } = $props();

	let deleteTarget = $state<string | null>(null);
	let confirmOpen = $state(false);

	// ── Swipe-to-dismiss ──
	let touchStartY = 0;
	let touchDeltaY = 0;
	let isDragging = false;
	let sheetY = 0;

	function handleTouchStart(e: TouchEvent): void {
		touchStartY = e.touches[0].clientY;
		isDragging = true;
		touchDeltaY = 0;
	}

	function handleTouchMove(e: TouchEvent): void {
		if (!isDragging) return;
		touchDeltaY = e.touches[0].clientY - touchStartY;
		// Only allow dragging down (positive delta)
		sheetY = Math.max(0, touchDeltaY);
	}

	function handleTouchEnd(): void {
		if (!isDragging) return;
		isDragging = false;
		if (touchDeltaY > 100) {
			open = false;
		}
		sheetY = 0;
		touchDeltaY = 0;
	}

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

{#if open}
	<!-- Backdrop -->
	<div
		role="presentation"
		class="fixed inset-0 z-50 bg-black/60 transition-opacity duration-300"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
	></div>

	<!-- Sheet -->
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Carrito"
		class="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl bg-gray-900 shadow-2xl transition-transform duration-300 md:hidden"
		style="transform: translateY({sheetY}px);"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
	>
		<!-- Drag handle + close -->
		<div class="flex items-center justify-between px-4 pt-3 pb-2">
			<div class="mx-auto h-1 w-10 rounded-full bg-gray-600" aria-hidden="true"></div>
			<button
				onclick={() => (open = false)}
				aria-label="Cerrar carrito"
				class="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
			>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Header -->
		<div class="flex items-center justify-between border-b border-gray-700 px-4 py-2">
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
		<div class="space-y-3 border-t border-gray-700 p-4 safe-area-bottom">
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
	</div>

	<ConfirmDialog
		bind:open={confirmOpen}
		title="Eliminar producto"
		message="¿Seguro que quieres quitar este producto del carrito?"
		confirmLabel="Eliminar"
		onConfirm={confirmDelete}
	/>
{/if}
