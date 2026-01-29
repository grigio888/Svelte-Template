import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$comp: './src/lib/components',
			$modules: './src/lib/modules',
			$svc: './src/services',
			$i18n: './src/i18n'
		},
		version: {
			name: process.env.PUBLIC_APP_VERSION
		},
		experimental: {
			remoteFunctions: true
		}
	},
	compilerOptions: {
		experimental: { async: true }
	}
};

export default config;
