<script>
	// »»» Imports
	import { marked } from 'marked';

	// »»» Props
	let { content } = $props();
</script>

<div class="body max-w-none">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html marked(content)}
</div>

<style>
	.body,
	.body :global(*:not(a)) {
		color: var(--color-text-200) !important;
	}

	.body {
		display: grid;
		gap: 1.5rem;
	}

	.body :global(h1),
	.body :global(h2),
	.body :global(h3) {
		font-weight: 700;
		margin-bottom: 1.5rem;
	}

	.body :global(h1) {
		font-size: 2.25rem;
	}

	.body :global(h2) {
		font-size: 1.875rem;
	}

	.body :global(h3) {
		font-size: 1.5rem;
	}

	.body :global(p) {
		font-size: 1.125rem;
	}

	.body :global(p code),
	.body :global(pre) {
		border: 1px solid var(--border-color);
		padding: 0.25rem 0.5rem;
		border-radius: var(--border-radius);
		background-color: var(--color-bg-900);
		font-size: 0.875rem;
	}

	.body :global(code) {
		font-family: 'Courier New', Courier, monospace !important;
	}

	.body :global(pre) {
		overflow-x: auto;
	}

	.body :global(img) {
		max-width: 100%;
		height: auto;
	}

	.body :global(blockquote) {
		border-left: 4px solid var(--color-theme-500);
		padding-left: 1rem;
		margin-left: 0;
		padding-block: 0.5rem;
		background-color: var(--color-bg-900);
	}

	.body :global(ul),
	.body :global(ol) {
		padding-left: 0.5rem;
	}

	.body :global(ul li),
	.body :global(ol li) {
		margin-bottom: 0.5rem;
		list-style-type: disc;
		list-style-position: inside;
	}

	.body :global(a) {
		color: var(--color-theme-500);
		transition: color 0.2s;
	}

	.body :global(a:hover) {
		color: var(--color-theme-600);
	}
</style>
