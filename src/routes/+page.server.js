import { translate as _ } from '$i18n/translate';
import Logger from '$comp/modules/log';

let log = new Logger();

export async function load() {
	let prefix = 'root » page.server';

	let metadata = {
		title: _('Homepage'),
		description: 'Here goes a description',
		keywords: ['some', 'keywords', 'here']
	};

	log.debug(`${prefix} »»» Page metadata created » metadata:`, metadata);

	return {
		metadata
	};
}
