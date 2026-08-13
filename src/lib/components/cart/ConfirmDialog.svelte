<script lang="ts">
	let {
		open = $bindable(false),
		title = 'Confirmar',
		message = '¿Estás seguro?',
		confirmLabel = 'Confirmar',
		cancelLabel = 'Cancelar',
		onConfirm,
	}: {
		open: boolean;
		title?: string;
		message?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		onConfirm: () => void;
	} = $props();

	function handleConfirm(): void {
		onConfirm();
		open = false;
	}

	function handleCancel(): void {
		open = false;
	}

	function handleBackdropClick(e: MouseEvent): void {
		if (e.target === e.currentTarget) open = false;
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby="confirm-dialog-title"
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
		onclick={handleBackdropClick}
	>
		<div class="w-full max-w-sm rounded-2xl bg-gray-800 p-6 shadow-2xl">
			<h3 id="confirm-dialog-title" class="text-lg font-semibold text-white">{title}</h3>
			<p class="mt-2 text-sm text-gray-400">{message}</p>

			<div class="mt-6 flex gap-3">
				<button
					onclick={handleCancel}
					class="flex-1 rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
				>
					{cancelLabel}
				</button>
				<button
					onclick={handleConfirm}
					class="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</div>
{/if}
