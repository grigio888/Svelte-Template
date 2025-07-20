<script>
	// »»» Imports
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { translate as _ } from '$i18n/translate';

	// »»» Props
	let { pagination, showDetails = true, class: classWrapper, callback } = $props();

	// »»» Icons
	import { CaretLeft, CaretRight } from 'phosphor-svelte';

	// »»» Logic
	// general stats
	let currentPage = $state(pagination?.current_page);

	let perPage = $state(pagination?.per_page);
	let totalPages = $state(pagination?.total_pages);

	// page buttons lifecycle
	let prevAllowed = $state(pagination?.previous_page);
	let nextAllowed = $state(pagination?.next_page);

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

	// handling page change
	async function handlePageChange(pageInteger) {
		if (callback) return await callback(pageInteger);
		return gotoPage(pageInteger);
	}
</script>

<div class="my-8 flex w-fit flex-col gap-3 {classWrapper}">
	<div
		class="flex items-center rounded-md border border-(--border-color)
        "
	>
		<button
			onclick={() => handlePageChange(currentPage - 1)}
			disabled={!prevAllowed}
			class="inline-flex
            size-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
		>
			<CaretLeft class="size-6 md:size-5" />
		</button>
		<div class="flex items-center">
			{#each pages as pageTarget (pageTarget)}
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
                        size-10 items-center justify-center from-(--color-theme-900) to-[transparent] to-60%
                        text-[15px] font-medium select-none
                        disabled:cursor-not-allowed disabled:opacity-50 {pageTarget == currentPage
							? 'bg-radial-[at_50%_50%]'
							: ''}"
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
		>
			<CaretRight class="size-6 md:size-5" />
		</button>
	</div>
	{#if showDetails}
		<p class="text-center text-[13px]">
			{_('Showing')}
			{(currentPage - 1) * perPage + 1} - {pagination?.count > perPage
				? currentPage * perPage
				: pagination?.count}
			{_('of')}
			{pagination?.count}
		</p>
	{/if}
</div>
