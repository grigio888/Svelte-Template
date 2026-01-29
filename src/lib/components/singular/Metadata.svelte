<script>
	// »»»»» Imports
	import { PUBLIC_APP_URL, PUBLIC_APP_NAME } from '$env/static/public';
	import { page } from '$app/stores';

	import { generateSlug } from '$modules/utils.js';
	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let {
		robots = 'index, follow',
		title,
		description = _('metadata.app.description'),
		keywords,
		image = '/favicon.png'
	} = $props();

	let page_url = $state($page.url.pathname);

	$effect(() => {
		if (description.length > 166) description = description.substring(0, 166) + '...';
	});
</script>

<svelte:head>
	<meta name="robots" content={robots} />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	{#if title}
		<title>{title} - {PUBLIC_APP_NAME}</title>
	{:else}
		<title>{PUBLIC_APP_NAME}</title>
	{/if}

	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-title" content={PUBLIC_APP_NAME} />
	<link rel="apple-touch-icon" href="{PUBLIC_APP_URL}{image}" />
	<meta name="apple-touch-fullscreen" content="yes" />

	<meta property="og:description" content={description} />
	<meta property="og:image" content="{PUBLIC_APP_URL}{image}" />
	<meta property="og:image:alt" content={description} />
	<meta property="og:site_name" content={PUBLIC_APP_NAME} />
	<meta property="og:title" content="{title ? title + ' - ' : ''}{PUBLIC_APP_NAME}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{PUBLIC_APP_URL}{page_url}" />
	<meta property="og:locale" content="en_US" />

	<meta name="description" content={description} />
	<meta
		name="keywords"
		itemprop="keywords"
		content="{PUBLIC_APP_NAME}, {keywords ? keywords.join(', ') : ''}"
	/>
	<link rel="shortcut icon" href="{PUBLIC_APP_URL}{image}" />
	<link rel="icon" href="{PUBLIC_APP_URL}{image}" />
	<link rel="canonical" href="{PUBLIC_APP_URL}{page_url}" />
	<meta name="theme-color" content="#030712" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@{generateSlug(PUBLIC_APP_NAME)}" />
	<meta name="twitter:creator" content="@{generateSlug(PUBLIC_APP_NAME)}" />
	<meta name="twitter:title" content="{title ? title + ' - ' : ''}{PUBLIC_APP_NAME}" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{PUBLIC_APP_URL}{image}" />
</svelte:head>
