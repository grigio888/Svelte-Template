import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$comp: './src/components',
			$const: './src/constants',
			$ui: './src/components/ui',
			$i18n: './src/i18n'
		},
		csrf: false,
		version: {
			name: process.env.PUBLIC_APP_VERSION
		}
	},
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;
