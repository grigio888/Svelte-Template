// »»» Imports
import { toast } from 'svelte-sonner';
import { translate as _ } from '$i18n/translate';
import { toastTimesEnum } from '$svc/enums';

// »»» Reactivity
let toastTarget = $state(null);

export function addLoadingToast(message) {
	if (toastTarget !== null) return;

	toastTarget = toast.loading(message || _('loading'), { duration: toastTimesEnum.INFINITE });
}

export function removeLoadingToast() {
	if (toastTarget === null) return;

	toast.dismiss(toastTarget);
	toastTarget = null;
}

export function replaceLoadingToast(message, isError = false) {
	let toastOptions = {
		id: toastTarget,
		duration: toastTimesEnum.MEDIUM
	};

	if (isError) toast.error(message || _('error.genericError'), toastOptions);
	else toast.success(message, toastOptions);
}
