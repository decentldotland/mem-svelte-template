import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		hmr: {
			host: process.env.NODE_ENV === "production"
				? "https://arweave.net/"
				: "localhost",
		}
	}
});
