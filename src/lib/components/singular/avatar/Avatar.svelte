<script>
	// »»» Props
	let { user = {}, class: classProp } = $props();

	// »»» Components
	import { Avatar } from 'bits-ui';

	// »»» Logic
	let fallback = $state('お');

	$effect(() => {
		if (user && user.first_name) {
			if (user.last_name) {
				fallback = `${user.first_name[0]}${user.last_name[0]}`;
			} else {
				fallback = user.first_name[0];
			}
		}
	});
</script>

<Avatar.Root
	delayMs={200}
	class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground size-10
    rounded-full border text-[17px] font-medium uppercase data-[status=loading]:border-transparent
    {classProp}"
>
	<div class="flex h-full w-full items-center justify-center overflow-hidden">
		<Avatar.Image src={user?.avatar} alt={user?.alt} class="h-full w-full object-cover" />
		<Avatar.Fallback class="text-[17px] font-medium text-(--theme-color) uppercase">
			{fallback}
		</Avatar.Fallback>
	</div>
</Avatar.Root>
