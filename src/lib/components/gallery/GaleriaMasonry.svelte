<script lang="ts">
	type GalleryItem = {
		src?: string;
		alt: string;
		/** When set, renders a branded placeholder card instead of an image. */
		placeholder?: string;
	};

	let { images }: { images: GalleryItem[] } = $props();
</script>

<div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
	{#each images as img}
		<div class="mb-4 break-inside-avoid overflow-hidden rounded-xl">
			{#if img.placeholder}
				<div
					class="flex aspect-square flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-brand-purple/50 bg-gradient-to-br from-brand-purple/40 via-purple-800/40 to-gray-900 p-6 text-center"
				>
					<img
						src="/assets/favicon.png"
						alt=""
						width="40"
						height="40"
						class="h-10 w-10 opacity-80"
					/>
					<div>
						<p class="text-sm font-semibold text-white">{img.placeholder}</p>
						<p class="mt-1 text-xs text-purple-200">Timbres y Sellos Saldias</p>
					</div>
				</div>
			{:else}
				<img
					src={img.src}
					alt={img.alt}
					class="h-full w-full object-cover"
					loading="lazy"
					decoding="async"
				/>
			{/if}
		</div>
	{/each}
</div>
