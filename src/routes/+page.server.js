import { redirect } from '@sveltejs/kit';
import { translate as _ } from '$i18n/translate';
import Logger from '$comp/modules/log';

let log = new Logger();

export async function load({ locals }) {
	let prefix = 'root » page.server';

	let metadata = {
		title: _('Login'),
		description: _('Login into your account'),
		keywords: ['some', 'keywords', 'here']
	};

	log.debug(`${prefix} »»» Page metadata created » metadata:`, metadata);

	return {
		metadata,
        user: locals.user || null
	};
}
