import { handleTheme } from '$svc/theme/hook';
import { handleLanguage } from '$svc/language/hook';
import { locale } from '$i18n/store.js';
import Logger from '$modules/log';

export async function handle({ event, resolve }) {
	console.log(
		'---------------------------------- hooks.server.js ----------------------------------'
	);

	let log = new Logger('hooks » handle');
	log.info(`[${event.request.method}] ${event.request.url}`);

	// »»»»» Initializing locals
	event.locals = event.locals ?? {};

	// »»»»» Language
	let language = await handleLanguage({
		user: event.locals.user,
		cookies: event.cookies,
		headers: event.request.headers
	});
	event.locals.lang = language;
	locale.set(language);

	// »»»»» Theme
	let themes = handleTheme(event.cookies, event.locals.user);

	// »»»»» Rendering
	log.debug('Hooks finished.');

	console.log(
		'-------------------------------------------------------------------------------------'
	);

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace('%lang%', language)
				.replace('%theme%', themes?.theme)
				.replace('%color%', themes?.color)
	});
}
