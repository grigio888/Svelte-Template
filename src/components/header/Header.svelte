<script>
    // »»» Imports
    import { translate as _ } from "../../i18n/translate";
    import { toast } from "svelte-sonner";

    // »»» Components
    import Button from "$comp/ui/button/Button.svelte";

    // »»» Icons
    import { List, X } from "phosphor-svelte";

    // »»» Logic
    let isOpen = $state(false);

    let items = [
        { title: _("About"), href: "/about" },
        { title: _("Contact"), href: "/contact" }
    ];
</script>

<div
    class="fixed top-0 left-0 w-full h-20 px-8
        flex items-center gap-8 justify-between md:justify-normal
        bg-(--color-theme-200-50) backdrop-blur-[2px] border-b border-(--border-color)
        z-50"
    >
    <a
        href="/"
        class="text-2xl md:text-xl font-bold text-(--color-theme-900)"
    >
        MyApp
    </a>

    <!-- Desktop Menu -->
    <div
        class="h-full w-full p-0 hidden md:flex flex-row items-center justify-between"
    >
        <div class="flex items-start md:items-center h-full gap-4">
            <nav>
                <ul class="flex flex-col md:flex-row items-end gap-4">
                    {#each items as item}
                        <li>
                            <a href={item.href}>
                                {item.title}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
        <div class="flex items-center gap-4">
            <Button
                href="/auth/login"
                class="w-25! text-sm!"
            >
                {_("Login")}
            </Button>
            <Button
                href="/auth/register"
                class="w-25! text-sm!"
                secondary
            >
                {_("Register")}
            </Button>
        </div>
    </div>

    <!-- Mobile Menu -->
    <Button
        class="md:hidden size-10!"
        onclick={() => isOpen = !isOpen}
    >
        <List size={24} weight="bold" />
    </Button>
    <div
        class="md:hidden absolute top-0 right-0 h-screen {isOpen ? 'w-screen px-10' : 'w-0 px-0'} py-6
        overflow-hidden flex flex-col items-end gap-4 bg-(--color-bg-100) transition-right duration-300
        ease-in-out"
    >
        <Button
            class="w-fit! bg-transparent! border-none shadow-none!"
        >
            <X
                size={24} weight="bold"
                onclick={() => isOpen = !isOpen}
            />
        </Button>
        <div class="flex items-start h-full mt-8">
            <nav>
                <ul class="flex flex-col items-end gap-8">
                    <li>
                        <a
                            href="/"
                            class="text-xl"
                            onclick={() => isOpen = false}
                        >
                            {_("Home")}
                        </a>
                    </li>
                    {#each items as item}
                        <li>
                            <a
                                href={item.href}
                                class="text-xl"
                                onclick={() => isOpen = false}
                            >
                                {item.title}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
        <div class="flex flex-col items-end gap-4 w-full">
            <Button
                href="/auth/login"
                onclick={() => isOpen = false}
            >
                {_("Login")}
            </Button>
            <Button
                href="/auth/register"
                secondary
                onclick={() => isOpen = false}
            >
                {_("Register")}
            </Button>
        </div>
    </div>
</div>