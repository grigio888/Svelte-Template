import Logger from '$modules/log';

export async function handleLanguage({ user, cookies, headers }) {
	let log = new Logger('services » language.hook » handleLanguage');

	// handle user language
	log.debug('Getting language from user');

	if (user?.preferences?.language) {
		log.debug(`Found user language: ${user.preferences.language}`);
		return user.preferences.language.split('_')[0];
	}

	log.debug('Getting language from cookies');

	let cookieLanguage = cookies.get('language');
	if (cookieLanguage) {
		log.debug(`Found cookie language: ${cookieLanguage}`);
		return cookieLanguage;
	}

	log.debug('Getting language from client');

	let requestLanguage = headers.get('accept-language')?.split(',')[0].split('-')[0];

	log.debug(`requestLanguage = ${requestLanguage}`);

	let lang = requestLanguage ?? 'en';

	log.debug(`Final resolve » ${lang}`);

	return lang;
}
