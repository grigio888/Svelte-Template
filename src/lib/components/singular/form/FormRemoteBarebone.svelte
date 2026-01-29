<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';
	import {
		getDisabled,
		toggleFormDisable,
		disableForm,
		enableForm,
		handleAfterSubmit
	} from './commonFunctions.svelte.js';
	import Logger from '$modules/log.js';

	// »»» Props
	let {
		id = null,
		formElement = $bindable(),
		class: classProp,
		remoteFunction,
		redirect,
		callback = () => {},
		resetForm = true,
		children
	} = $props();

	// »»» Logic
	let log = new Logger('$comp.sing.form.FormRemoteBarebone');

	let currentRemoteFunction = $derived.by(() => {
		return id ? remoteFunction.for(id) : remoteFunction;
	});

	async function handleRemoteEnhance({ form, data, submit }) {
		disableForm();

		let isError;
		try {
			await submit(data);
		} catch (error) {
			log.error(_('error.genericError'), error);
			isError = true;
		}

		enableForm({
			message: currentRemoteFunction.result?.message || _('error.genericError'),
			isError: currentRemoteFunction.result?.status > 299 || isError
		});

		if (currentRemoteFunction.result?.status > 299 || isError) {
			return;
		}

		await handleAfterSubmit(redirect, callback, data);

		if (resetForm) {
			form.reset();
		}
	}

	$effect(() => {
		toggleFormDisable(formElement, getDisabled());
	});
</script>

<form
	bind:this={formElement}
	method="post"
	enctype="multipart/form-data"
	class="w-full {classProp}"
	{...currentRemoteFunction.enhance(handleRemoteEnhance)}
>
	{@render children()}
</form>
