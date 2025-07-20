import { get } from 'svelte/store';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { locale } from '$i18n/store';

export function relativeTime(date) {
	let options = { addSuffix: true };

	if (get(locale) === 'pt') {
		options.locale = ptBR;
	}

	return formatDistanceToNow(date, options);
}
