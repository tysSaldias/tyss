import type { StampConfig } from '$lib/types';
import { getColorById } from '$lib/data/colores';
import { getTamanioById } from '$lib/data/tamanos';

const fontFamilyMap: Record<string, string> = {
	sans: 'Arial, Helvetica, sans-serif',
	serif: 'Georgia, "Times New Roman", serif',
	script: '"Brush Script MT", "Segoe Script", cursive',
	mono: '"Courier New", Consolas, monospace',
};

function getTextColor(hex: string): string {
	// Simple luminance calculation to determine text contrast
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.6 ? '#171717' : '#FAFAFA';
}

export function generateStampPreviewSVG(config: StampConfig): string {
	const color = getColorById(config.colorId);
	const size = getTamanioById(config.sizeId);

	const fillColor = color?.hex ?? '#171717';
	const textColor = getTextColor(fillColor);
	const fontFamily = fontFamilyMap[config.fontType] ?? fontFamilyMap.sans;

	// Adjust font size based on text length and size
	const textLength = config.text?.length ?? 0;
	let fontSize = 28;
	if (textLength > 20) fontSize = 18;
	else if (textLength > 12) fontSize = 22;
	else if (textLength > 6) fontSize = 26;

	// Adjust border width and stamp dimensions based on size
	const borderPadding = size?.id === 'mini' ? 8 : size?.id === 'super' ? 14 : 10;
	const innerRect = borderPadding + 3;

	const displayText = config.text || 'Tu texto aquí';

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="auto">
	<defs>
		<style>
			.stamp-text {
				font-family: ${fontFamily};
				font-size: ${fontSize}px;
				fill: ${textColor};
				text-anchor: middle;
				dominant-baseline: central;
			}
		</style>
	</defs>
	<!-- Outer border -->
	<rect x="2" y="2" width="196" height="116" rx="6" fill="${fillColor}" stroke="${textColor}" stroke-width="1.5" />
	<!-- Inner border -->
	<rect x="${innerRect}" y="${innerRect}" width="${200 - innerRect * 2}" height="${120 - innerRect * 2}" rx="3" fill="${fillColor}" stroke="${textColor}" stroke-width="1" />
	<!-- Text -->
	<text x="100" y="60" class="stamp-text">${escapeXml(displayText)}</text>
</svg>`;
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
