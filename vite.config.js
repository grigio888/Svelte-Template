import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	server: {
		watch: { usePolling: process.env.USE_POLLING },
		hmr: { clientPort: 3000 },
		allowedHosts: true
	},
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version)
	}
});
