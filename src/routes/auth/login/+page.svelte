<script>
	// »»» Imports
	import { translate as _ } from '$i18n/translate';
    import { toast } from 'svelte-sonner';

	// »»» Props
	let { data } = $props();

	// »»» Components
	import Metadata from '$comp/meta/Metadata.svelte';
	import Slogan from '$ui/slogan/Slogan.svelte';
    import Frame from '$comp/ui/frame/Frame.svelte';
	import FormBarebone from '$ui/form/FormBarebone.svelte';
	import Input from '$comp/ui/input/Input.svelte';
    import Button from '$comp/ui/button/Button.svelte';
    import Checkbox from '$comp/ui/checkbox/Checkbox.svelte';
    import Tooltip from '$comp/ui/tooltip/Tooltip.svelte';

    // »»» Icons
    import { Eye } from 'phosphor-svelte';
</script>

<Metadata {...data?.metadata} />

<div class="flex h-screen w-full flex-col items-center justify-center">
	<Slogan />

    <Frame
        class="w-full max-w-[90%] md:max-w-md mt-8 bg-transparent backdrop-blur-[2px]"
    >
        <FormBarebone class="p-2">
            <Input
                label={_("User")}
                tooltip={_("Enter your username or email")}
                class="w-full mb-4"
                type="text"
                id="username"
                name="username"
                placeholder={_("user123 or user@example.com")}
                required
            />
            <Input
                label={_("Password")}
                tooltip={_("Enter your password")}
                class="w-full mb-4"
                type="password"
                id="password"
                name="password"
                placeholder={_('Password')}
                required
            />
            <div class="mb-4 flex justify-end">
                <Checkbox
                    id="remember_me"
                    name="remember_me"
                    label={_("Remember me")}
                    class="text-sm"
                >
                    <p>{_("Keep me logged in")}</p>
                </Checkbox>
            </div>
            <Button
                class="w-full mt-4 cursor-pointer"
                type="submit"
            >
                {_("Login")}
            </Button>
            <Button
                href="/register"
                class="w-full mt-2"
                type="button"
                secondary
            >
                {_("Register")}
            </Button>
        </FormBarebone>
    </Frame>
    <div class="mt-8 text-sm text-gray-700">
        {_("Forgot your password?")}
        <a href="/forgot-password" class="text-blue-500 hover:underline">{_("Reset it")}</a>
    </div>
</div>
