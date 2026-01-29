// »»» Imports
import { goto } from '$app/navigation';
import { translate as _ } from '$i18n/translate';
import { addLoadingToast, replaceLoadingToast } from '$svc/toasts/lifecycle.svelte';

// »»» Reactivity
let disabled = $state(false);

// handling form disable
export function getDisabled() {
	return disabled;
}

export function toggleFormDisable(formElement, disable = false) {
	if (formElement) {
		const elements = Array.from(formElement.children);
		elements.forEach((element) => {
			element.classList.toggle('disabled', disable);
			if (element.tagName === 'BUTTON' && element.type === 'submit') {
				element.disabled = disable;
			}
		});
	}
}

export function disableForm() {
	disabled = true;
	addLoadingToast();
}

export function enableForm({ message, isError = false }) {
	disabled = false;

	if (isError) replaceLoadingToast(message || _('error.genericError'), true);
	else replaceLoadingToast(message);
}

export async function handleAfterSubmit(redirect, callback, result) {
	if (redirect) {
		goto(redirect);
		return;
	}

	// Callback function can be or not a promise,
	// so we need to deal with it accordingly
	let maybePromise = callback(result ?? {});

	if (maybePromise && typeof maybePromise.then === 'function') {
		await maybePromise;
	}
}
