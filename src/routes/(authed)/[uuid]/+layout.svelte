<script>
	import '../../../app.css';
    import {goto} from '$app/navigation';
    import { enhance } from '$app/forms';

    /** @type {import('./$types').LayoutProps} */
	let { children, data} = $props();
</script>

{#snippet btn(icon,path='/')}
    <button class="text-3xl cursor-pointer grayscale-50 hover:grayscale-0 hover:saturate-200" onclick={()=>goto(path)}>
        {icon}
    </button>
{/snippet}

<div class="w-full h-screen overflow-y-hidden bg-gray-300">

    <div class="w-full flex flex-row h-full justify-between">
        <div class="min-w-16 ">
            <div class="h-1/2 flex flex-col space-y-5 mt-14 justify-around">
                {@render btn(`🏰`,`/${data.pathUUID}/keep`)}
                {@render btn(`⚔️`,`/${data.pathUUID}/expeditions`)}
                {@render btn(`🧍‍♂️`,`/${data.pathUUID}/servants`)}
                {@render btn(`🕯️`,`/${data.pathUUID}/tomb`)}
            </div>
        </div>
            <div class="min-w-64 w-full text-center text-2xl flex flex-col">
                <div class="h-12 my-2.5 flex flex-row space-x-10">
                    <div class="flex items-center w-1/2 justify-end">
                        <span>💰<span class="bg-gray-200 inset-ring-2 inset-ring-gray-700/70 py-1 px-2">29175</span></span>
                        <span>💎<span class="bg-gray-200 inset-ring-2 inset-ring-gray-700/70 py-1 px-2">256</span></span>
                    </div>
                    {@html '<!--Add logout and other profile actions-->'}
                    <div class="flex w-1/2 justify-end">
                        <form class='flex flex-col gap-y-2 self-center' id='signUp'  method="POST" action="../../?/signOut" use:enhance>
                            <button type='submit' class="text-3xl bg-black rounded-3xl w-12 cursor-pointer h-12 place-end">👑</button>
                        </form>
                    </div>
                </div>
                <div class="h-full w-full bg-gray-500">
                    {@render children()}
                </div>
            </div>
        <div class="min-w-16">

        </div>
    </div>
</div>
