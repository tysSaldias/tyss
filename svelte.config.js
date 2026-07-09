import netlifyAdapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: netlifyAdapter({ edge: false }),
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
