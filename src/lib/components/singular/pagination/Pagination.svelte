<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import API from '$modules/api';
	import Logger from '$modules/log';
	import {
		addLoadingToast,
		removeLoadingToast,
		replaceLoadingToast
	} from '$svc/toasts/lifecycle.svelte';

	// »»» Props
	let {
		pagination = $bindable(),
		showDetails = true,
		class: classWrapper,
		callback,
		asyncUrl
	} = $props();

	// »»» Icons
	import { CaretLeft, CaretRight } from 'phosphor-svelte';

	// »»» Reactivity
	// general stats
	let currentPage = $derived(pagination?.current_page);

	let perPage = $derived(pagination?.per_page);
	let totalPages = $derived(pagination?.total_pages);

	// page buttons lifecycle
	let prevAllowed = $derived(pagination?.previous_page);
	let nextAllowed = $derived(pagination?.next_page);

	// »»» Logic
	let api = new API();
	let log = new Logger('$comp.sing.pag.Pagination');

	// constructing pages section
	let limit = 1;
	let pages = $derived.by(() => {
		if (totalPages == 1) return [1];

		let pagination = [1];

		if (currentPage > 3) pagination.push('...');

		let start = Math.max(2, currentPage - limit);
		let end = Math.min(totalPages - 1, currentPage + limit);

		for (let i = start; i <= end; i++) {
			pagination.push(i);
		}

		if (end < totalPages - 1) {
			pagination.push('...');
		}

		if (totalPages > 1) {
			pagination.push(totalPages);
		}

		return pagination;
	});

	// fetch page content
	async function gotoPage(pageInteger) {
		let pageObj = get(page);
		let url = new URL(pageObj.url);
		url.searchParams.set('page', pageInteger);
		goto(url.pathname + url.search);
	}

	async function fetchPage(pageInteger) {
		if (!asyncUrl) return;

		addLoadingToast();

		let url = `${asyncUrl}?page=${pageInteger}`;

		try {
			pagination = await api.get(url);
			removeLoadingToast();
		} catch (error) {
			log.error(error);
			replaceLoadingToast(_('error.unableToFetchData'));
		}

		if (callback) {
			await callback(pageInteger);
		}
	}

	// handling page change
	async function handlePageChange(pageInteger) {
		if (asyncUrl) await fetchPage(pageInteger);
		else gotoPage(pageInteger);

		if (callback) await callback(pageInteger);
	}
</script>

<div class="my-8 flex w-fit flex-col gap-3 {classWrapper}">
	<div
		class="mx-auto flex w-fit items-center justify-between rounded-md border border-(--border-color)
        "
	>
		<button
			onclick={() => handlePageChange(currentPage - 1)}
			disabled={!prevAllowed}
			class="inline-flex
            size-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
			title={_('pagination.previous')}
		>
			<CaretLeft class="size-6 md:size-5" />
		</button>
		<div class="flex items-center">
			{#each pages as pageTarget, index (index)}
				{#if pageTarget == '...'}
					<div
						class="text-foreground-alt flex
                        size-10 items-center justify-center text-[15px] font-medium select-none"
					>
						...
					</div>
				{:else}
					<button
						onclick={() => handlePageChange(pageTarget)}
						class="text-foreground-alt flex
                        size-10 items-center justify-center from-(--theme-color-900) to-transparent to-60%
                        text-[15px] font-medium select-none
                        disabled:cursor-not-allowed disabled:opacity-50 {pageTarget == currentPage
							? 'bg-radial-[at_50%_50%]'
							: ''}"
						title={_('pagination.pageNumber', { pageNumber: pageTarget })}
					>
						{pageTarget}
					</button>
				{/if}
			{/each}
		</div>
		<button
			onclick={() => handlePageChange(currentPage + 1)}
			disabled={!nextAllowed}
			class="inline-flex
            size-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
			title={_('pagination.next')}
		>
			<CaretRight class="size-6 md:size-5" />
		</button>
	</div>
	{#if showDetails}
		<p class="text-center text-[13px]">
			{_('pagination.showText', {
				currentItemRange: `${(currentPage - 1) * perPage + 1} ~ ${pagination?.count > currentPage * perPage ? currentPage * perPage : pagination?.count}`,
				totalItems: pagination?.count
			})}
		</p>
	{/if}
</div>
