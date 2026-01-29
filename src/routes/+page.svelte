<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»» Components
	import Metadata from '$comp/singular/Metadata.svelte';

	// »»» Data
	const chips = [_('app.tag.liveSync'), _('app.tag.analogChaos'), _('app.tag.signalBloom')];

	const metrics = [
		{ label: _('app.dashboard.param.latency'), value: '72ms' },
		{ label: _('app.dashboard.param.uptime'), value: '99.97%' },
		{ label: _('app.dashboard.param.parallel'), value: '∞' }
	];
</script>

<Metadata />

{#snippet card(label, value)}
	<div
		class="flex w-full flex-row-reverse items-center justify-between gap-1 rounded-2xl border border-white/15 bg-black/40
        px-3.5 py-3 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:aspect-6/2 md:w-70
        md:flex-row md:px-5"
	>
		<span class="text-xl font-bold tracking-tight sm:text-2xl">{value}</span>
		<span class="text-[0.7rem] font-semibold tracking-[0.12em] text-slate-200/70 uppercase">
			{label}
		</span>
	</div>
{/snippet}

<section
	class="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden
    px-4 pt-8 pb-4 text-slate-100"
>
	<div class="relative grid w-full items-center gap-10 sm:gap-12 md:grid-cols-[1.1fr,0.9fr]">
		<div class="mx-auto grid max-w-6xl gap-8 text-center md:gap-4 md:text-left">
			<p
				class="w-full rounded-full border border-white/15 bg-gradient-to-r from-[#9f78ff66] to-[#5af9ff66]
                px-3 py-1 text-[0.78rem] font-semibold tracking-[0.18em] text-slate-200/80 uppercase
                backdrop-blur-md md:w-fit"
			>
				{_('app.tagline')}
			</p>
			<h1
				class="relative inline-flex items-center gap-3 text-6xl leading-[1.05]
                font-bold text-slate-50"
			>
				{_('app.title')}
				<span
					class="absolute top-1/2 inline-block h-10 w-10 animate-[spin_9s_linear_infinite] rounded-full bg-[conic-gradient(from_120deg,#ffd166,#7cf2ff,#d66bff,#ffd166)] opacity-90
                    blur-[6px]
                    md:static"
					aria-hidden="true"
				></span>
			</h1>
			<p class="mx-auto max-w-full text-lg leading-relaxed text-slate-200/80 md:mx-0 md:text-xl">
				{_('app.description')}
			</p>
			<ul
				class="mt-2 flex flex-wrap justify-center gap-2 md:justify-start"
				aria-label="Live system pills"
			>
				{#each chips as chip (chip)}
					<li
						class="relative w-full overflow-hidden rounded-full border
                        border-white/15 bg-white/5 px-3.5 py-2 text-sm font-semibold
                        text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                        backdrop-blur-lg md:w-fit"
					>
						{chip}
					</li>
				{/each}
			</ul>
		</div>

		<div class="relative flex justify-center md:justify-end" aria-hidden="true">
			<div
				class="
                relative mx-auto grid
                w-full place-items-center gap-6 overflow-hidden
                rounded-[28px] border border-white/15
                bg-linear-to-br from-white/15 via-white/10 to-white/5 p-6
                shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:flex md:w-fit
                md:p-8
                "
			>
				<div
					class="absolute inset-[12%] rounded-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(124,242,255,0.24),transparent_40%)] opacity-90
                    blur-sm"
				></div>
				<div class="relative grid aspect-square w-60 place-items-center md:w-100">
					<div
						class="absolute inset-[12%] animate-[pulse_18s_ease-in-out_infinite] rounded-full border border-white/20 mix-blend-screen shadow-[0_0_50px_rgba(124,242,255,0.5)]"
					></div>
					<div
						class="absolute inset-[6%] animate-[pulse_18s_ease-in-out_infinite] rounded-full border border-[#d66bff80] mix-blend-screen [animation-delay:-3s]"
					></div>
					<div
						class="absolute inset-0 animate-[pulse_18s_ease-in-out_infinite] rounded-full border border-[#ffd16666] mix-blend-screen [animation-delay:-6s]"
					></div>
					<div
						class="relative grid aspect-square w-[42%] place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#7cf2ff,transparent_50%),radial-gradient(circle_at_70%_70%,#d66bff,transparent_45%)] drop-shadow-[0_0_30px_rgba(124,242,255,0.5)]"
					>
						<span
							class="absolute -inset-[18%] animate-[spin_12s_linear_infinite] rounded-full bg-[conic-gradient(from_120deg,rgba(124,242,255,0.4),rgba(214,107,255,0.4),rgba(255,209,102,0.5),rgba(124,242,255,0.4))] opacity-80 blur-xl"
						></span>
						<span
							class="relative size-4.5 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.8),0_0_60px_rgba(124,242,255,0.7)]"
						></span>
					</div>
				</div>
				<div class="relative grid w-full gap-3 sm:gap-4 md:w-fit">
					{#each metrics as metric (metric.label)}
						{@render card(metric.label, metric.value)}
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
