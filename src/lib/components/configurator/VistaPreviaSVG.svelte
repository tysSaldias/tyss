<script lang="ts">
	import type { StampConfig } from '$lib/types';
	import { generateStampPreviewSVG } from '$lib/utils/svg';

	let { config }: { config: StampConfig } = $props();

	const svgContent = $derived(generateStampPreviewSVG(config));
</script>

<div class="flex items-center justify-center rounded-xl bg-gray-800/50 p-6">
	<div class="w-full max-w-xs">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="mx-auto"
			innerHTML={svgContent}
		></div>
	</div>
</div>
