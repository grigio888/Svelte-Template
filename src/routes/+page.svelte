<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»» Props
	let { data } = $props();

	// »»» Components
	import Metadata from '$comp/meta/Metadata.svelte';
	import Slogan from '$ui/slogan/Slogan.svelte';
</script>

<Metadata {...data?.metadata} />

<div class="flex h-screen w-full flex-col items-center justify-center">
	<Slogan />

    <p>{_("Welcome back!")}</p>
</div>
