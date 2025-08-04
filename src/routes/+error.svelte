<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';
	import { page } from '$app/stores';

	// »»» Components
	import Metadata from '$comp/meta/Metadata.svelte';
	import Button from '$ui/button/Button.svelte';

	// »»» Icons
	import { ArrowLeft } from 'phosphor-svelte';
</script>

<Metadata title="{_('Error')} {$page.status}" />

<div class="flex h-screen w-full flex-col items-center justify-center">
	<div
		class="relative flex min-h-60 w-[90%] flex-col items-center justify-center gap-10
        rounded-md border border-(--border-color) p-12 pt-16 shadow-xl
        shadow-(color:--color-theme-300) md:max-w-80"
	>
		<h1
			class="absolute top-0 left-1/2 translate-x-[-50%] -translate-y-1/2 transform
            bg-(--color-bg-100) px-3 text-center text-6xl font-semibold"
		>
			{$page.status}
		</h1>
		<p class="text-center text-2xl font-semibold">
			{_($page.error.message)}
		</p>

		<div class="flex flex-col items-center justify-center gap-4">
			<Button secondary href="/" class="gap-4 px-4">
				<ArrowLeft class="size-4" />
				{_('Go back home')}
			</Button>
		</div>
	</div>
</div>
