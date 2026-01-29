import { get } from 'svelte/store';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { languageEnums } from '$svc/language/enums';

import { locale } from '$i18n/store.js';

export function relativeTime(date) {
	let options = { addSuffix: true };

	if (get(locale) === languageEnums.pt_br) {
		options.locale = ptBR;
	}

	return formatDistanceToNow(date, options);
}
