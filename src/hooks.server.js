import { PUBLIC_COOKIE_SECURE } from '$env/static/public';
import { locale } from '$i18n/store.js';
import Logger from '$comp/modules/log';
import API from '$comp/modules/api';

let api = new API();
let log = new Logger();

async function handleLanguage(headers) {
	// handle user language
	let prefix = 'hooks » handleLanguage';
	log.debug(`${prefix} »»» Getting language from client`);

	let requestLanguage = headers.get('accept-language')?.split(',')[0].split('-')[0];

	log.debug(`${prefix} »»» requestLanguage = ${requestLanguage}`);

	let lang = requestLanguage ?? 'en';

	log.debug(`${prefix} »»» Final resolve » ${lang}`);

	return lang;
}

async function handleUser(cookies) {
	// handle user information
	let prefix = 'hooks » handleUser';
	log.debug(`${prefix} »»» Identifying user`);

	let tokens = cookies.get('tokens');

	log.debug(`${prefix} »»» Getting tokens from cookie`);

	if (!tokens) {
		log.debug(`${prefix} »»» Tokens not found. No user to retrieve.`);
		return undefined;
	}

	api._access_token = tokens.split(',')[0];
	api._refresh_token = tokens.split(',')[1];

	log.debug(`${prefix} »»» Tokens found.`);
	log.debug(`${prefix} »»» Retrieving user info.`);

	let userEndpoint = '/users/';
	let userInfo = await api.get(userEndpoint);

	if (api.res.status == 401) {
		log.debug(`${prefix} »»» Access token expired. Trying to refresh him.`);
		let refreshEndpoint = '/auth/refresh/';
		let refresh = await api.post(refreshEndpoint, {});

		if (api.res.status == 201) {
			log.debug(`${prefix} »»» Session refreshed.`);
			tokens = `${refresh.access_token},${refresh.refresh_token}`;
			cookies.delete('tokens', { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });
			cookies.set('tokens', tokens, { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });

			api._access_token = refresh.access_token;
			api._refresh_token = refresh.refresh_token;

			userInfo = await api.get(userEndpoint);
		} else {
			log.debug(`${prefix} »»» Not able to refresh tokens.`);
			log.debug(`${prefix} »»» Removing tokens.`);
			cookies.delete('tokens', { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });
			return;
		}
	} else if (api.res.status != 200) {
		log.debug(`${prefix} »»» Not able to reach ${userEndpoint}.`);
		log.debug(`${prefix} »»» Removing tokens.`);

		cookies.delete('tokens', { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });
		return undefined;
	}

	log.debug(`${prefix} »»» User ${userInfo.email}.`);

	let tokensObj = {
		access: tokens.split(',')[0],
		refresh: tokens.split(',')[1]
	};
	userInfo['tokens'] = tokensObj;

	log.debug(`${prefix} »»» Placed tokens inside user info.`);
	log.debug(`${prefix} »»» User successfully retrieved.`);

	return userInfo;
}

export async function handle({ event, resolve }) {
	log.info(`[${event.request.method}] ${event.request.url}`);
	let prefix = 'hooks » handle';
	// »»»»» Locals
	// create a locals object if it doesn't exist
	log.debug(`${prefix} »»» Initializating locals.`);

	event.locals = event.locals ?? {};

	// »»»»» User
	// configuring the user
	event.locals.user = await handleUser(event.cookies);
	// if (!event.locals.user) cookies.delete(
	//     'tokens',
	//     { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE)}
	// )

	// »»»»» Language
	// configuring the language
	let language = await handleLanguage(event.request.headers);

	event.locals.lang = language;
	locale.set(language);

	// »»»»» Theme
	// configuring the theme
	event.locals.theme = 'dark';

	// let theme = event.cookies.get('theme');
	// if (theme) {
	// 	event.locals.theme = theme;
	// }

	// »»»»» Rendering
	// transforming the page chunk
	log.debug(`${prefix} »»» Hooks finished.`);

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.locals.lang).replace('%theme%', event.locals.theme)
	});
}
