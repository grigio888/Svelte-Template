import { getRequestEvent, form, command } from '$app/server';
import { PUBLIC_COOKIE_SECURE } from '$env/static/public';
import Logger from '$modules/log';

export const toggleTheme = form('unchecked', async ({ theme, color }) => {
	return changeTheme({ theme, color });
});

export const setTheme = command('unchecked', async ({ theme, color }) => {
	return changeTheme({ theme, color });
});

const changeTheme = ({ theme, color }) => {
	let log = new Logger('services » theme.handler » changeTheme');

	log.info('Toggling theme/color to:', theme, color);

	if (theme != undefined) {
		const event = getRequestEvent();
		event.cookies.set('theme', theme, { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });
	}
	if (color != undefined) {
		const event = getRequestEvent();
		event.cookies.set('color', color, { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });
	}

	return { theme, color };
};
