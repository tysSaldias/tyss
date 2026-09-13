<script lang="ts">
	const VIDEO_SRC = '/assets/hero/video-tyss2.mp4';
	const POSTER_SRC = '/assets/hero/video-tyss2-poster.jpg';
</script>

<section class="relative overflow-hidden bg-brand-card">
	<video
		src={VIDEO_SRC}
		poster={POSTER_SRC}
		class="mx-auto block h-auto w-auto max-h-[calc(100dvh-64px)] max-w-full border-8 border-transparent object-contain"
		style="border-radius: 16px; background: linear-gradient(var(--color-brand-card), var(--color-brand-card)) padding-box, linear-gradient(135deg, var(--color-brand-purple), #6B21A8) border-box;"
		autoplay
		muted
		loop
		playsinline
		preload="auto"
		aria-label="Video promocional Timbres y Sellos Saldias"
	></video>
</section>