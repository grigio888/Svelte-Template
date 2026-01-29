<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';
	import { page } from '$app/stores';

	// »»» Components
	import Metadata from '$comp/singular/Metadata.svelte';
	import Button from '$comp/singular/button/Button.svelte';
	import Frame from '$comp/singular/frame/Frame.svelte';
	import BackButton from '$comp/composed/BackButton.svelte';

	// »»» Icons
	import { House } from 'phosphor-svelte';

	// »»» Reactivity
	let status = $derived($page.status);
	let error = $derived($page.error);
</script>

<Metadata title="{_('error')} {status}" />

<div class="flex h-[90vh] w-full flex-col items-center justify-center">
	<Frame class="min-h-60 w-[90%] gap-10 p-12 pt-16 md:w-100">
		<h1
			class="absolute top-0 left-1/2 translate-x-[-50%] -translate-y-1/2 transform
            px-3 text-center text-8xl font-semibold"
		>
			{status}
		</h1>
		<p class="text-center text-2xl font-semibold">
			{error?.message ?? _('error.unexpected')}
		</p>

		<div class="flex flex-col items-center justify-center gap-4">
			<BackButton border class="w-60! gap-4 px-4 text-base!">
				{_('error.goBack')}
			</BackButton>
			<Button secondary href="/" class="w-60! gap-4 px-4">
				<House size={20} />
				{_('error.goBackHome')}
			</Button>
		</div>
	</Frame>
</div>
