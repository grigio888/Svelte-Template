<script>
	// Needs to be reviewed when first implemented

	// »»» Props
	let { user = {}, class: classProp } = $props();

	// »»» Components
	import { Avatar } from 'bits-ui';

	// »»» Logic
	let fallback = $state('お');

	if (user && user.first_name) {
		if (user.last_name) {
			fallback = `${user.first_name[0]}${user.last_name[0]}`;
		} else {
			fallback = user.first_name[0];
		}
	}
</script>

<Avatar.Root
	delayMs={200}
	class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground size-12
    rounded-full border text-[17px] font-medium uppercase data-[status=loading]:border-transparent
    {classProp}"
>
	<div
		class="flex h-full w-full items-center justify-center overflow-hidden rounded-full
        border-2 border-transparent"
	>
		<Avatar.Image src={user?.avatar} alt={user?.alt} class="h-full w-full object-cover" />
		<Avatar.Fallback class="text-[17px] font-medium uppercase">
			{fallback}
		</Avatar.Fallback>
	</div>
</Avatar.Root>
