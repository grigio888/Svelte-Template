<script>
	// »»» Imports
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { translate as _ } from '$i18n/translate';

	// »»» Props
	let {
		formElement = $bindable(),
		reset,
		class: classProp,
		action,
		redirect,
		callback,
		children
	} = $props();

	// »»» Logic
	let disabled = $state(false);
	let toastTarget;

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

		toastTarget = toast.loading(_('Loading...'), { duration: Number.POSITIVE_INFINITY });

		return async ({ result }) => {
			disabled = false;

			let message = result?.data?.message;

			let toastOptions = {
				id: toastTarget,
				duration: 3000
			};

			if (result.status >= 400 || result.error || result.type === 'error') {
				message = message || result.error?.message || _('An unexpected error occurred');
				toast.error(message, toastOptions);
			} else {
				toast.success(message, toastOptions);
			}

			if (result.status < 300) {
				if (redirect) {
					goto(redirect);
				} else if (callback) {
					// The callback can be or not a promise,
					// so we need to deal with it accordingly
					let maybePromise = callback(result);

					if (maybePromise && typeof maybePromise.then === 'function') {
						await maybePromise;
					}
				}

				if (formElement && reset) {
					formElement.reset();
				}
			}
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
