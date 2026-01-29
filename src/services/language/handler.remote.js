import { getRequestEvent, command } from '$app/server';
import { PUBLIC_COOKIE_SECURE } from '$env/static/public';
import Logger from '$modules/log';

export const setLanguage = command('unchecked', async ({ language }) => {
	if (!language) {
		throw new Error('Language parameter is required.');
	}

	return changeLanguage({ language });
});

const changeLanguage = ({ language }) => {
	let log = new Logger('services » language.handler » changeLanguage');

	log.info('Toggling language to:', language);

	const event = getRequestEvent();
	event.cookies.set('language', language, { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });

	return { language };
};
