<script lang="ts">
	let { images }: { images: { src: string; alt: string }[] } = $props();
</script>

<div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
	{#each images as img}
		<div class="mb-4 break-inside-avoid overflow-hidden rounded-xl">
			<img
				src={img.src}
				alt={img.alt}
				class="h-full w-full object-cover"
				loading="lazy"
				decoding="async"
			/>
		</div>
	{/each}
</div>
