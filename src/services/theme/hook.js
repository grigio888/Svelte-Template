import Logger from '$modules/log';

export function handleTheme(cookies, user) {
	let log = new Logger('services » theme.hook » handleTheme');

	// handle theme information
	log.debug('Configuring theme and color.');

	log.debug('Identifying theme');

	let theme = user?.preferences?.theme ?? cookies.get('theme');
	let color = user?.preferences?.color ?? cookies.get('color');

	log.debug('Getting theme and color from cookie');

	if (!theme) {
		log.debug('Theme not found. Using default.');
		theme = 'dark';
	} else {
		log.debug(`Theme found: ${theme}.`);
	}

	if (!color) {
		log.debug('Color not found. Using default.');
		color = 'purple';
	} else {
		log.debug(`Color found: ${color}.`);
	}

	log.debug('Theme and color successfully configured.');

	return { theme, color };
}
