<script>
	// »»» Imports
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { translate as _ } from '$i18n/translate';
	import { addLoadingToast, replaceLoadingToast } from '$svc/toasts/lifecycle.svelte';

	// »»» Props
	let {
		formElement = $bindable(),
		class: classProp,
		action,
		redirect,
		callback,
		children
	} = $props();

	// »»» Logic
	let disabled = $state(false);

	// handling form disable
	function toggleFormDisable(disable = false) {
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

	// handling form submission
	async function handleEnhance() {
		disabled = true;

		addLoadingToast();

		return async ({ result }) => {
			disabled = false;

			let message = result?.data?.message;

			if (result.status >= 400 || result.error || result.type === 'error') {
				message = message || result.error?.message || _('error.genericError');
				replaceLoadingToast(message, true);
			} else {
				replaceLoadingToast(message);
			}

			if (result.status > 300) {
				return;
			}

			if (redirect) {
				goto(redirect);
				return;
			}

			// Callback function can be or not a promise,
			// so we need to deal with it accordingly
			let maybePromise = callback(result);

			if (maybePromise && typeof maybePromise.then === 'function') {
				await maybePromise;
			}

			formElement.reset();
		};
	}

	$effect(() => {
		toggleFormDisable(disabled);
	});
</script>

<form
	bind:this={formElement}
	{action}
	method="post"
	enctype="multipart/form-data"
	class="w-full {classProp}"
	use:enhance={handleEnhance}
>
	{@render children()}
</form>
