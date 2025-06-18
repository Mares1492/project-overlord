<script>
	import '../../../app.css';
    import {goto} from '$app/navigation';
    import { enhance } from '$app/forms';
    import castle from "$lib/assets/bg/keep/castle.png";

    /** @type {import('./$types').LayoutProps} */
	let { children, data} = $props();
</script>

{#snippet btn(icon,path='/')}
    <button class="text-3xl cursor-pointer grayscale-50 hover:grayscale-0 hover:saturate-200" onclick={()=>goto(path)}>
        {icon}
    </button>
{/snippet}

<div class="relative w-full h-screen overflow-y-hidden flex flex-row text-center text-2xl ">
    <img class="absolute w-screen -z-100" alt="castle" src={castle}>
    <div class="w-18 flex flex-col bg-black/50">
        <div class="h-16">
        </div>
        <div class="flex flex-col space-y-28 pt-1 justify-around">
            {@render btn(`🏰`,`/${data.pathUUID}/keep`)}
            {@render btn(`⚔️`,`/${data.pathUUID}/expeditions`)}
            {@render btn(`🧍‍♂️`,`/${data.pathUUID}/servants`)}
            {@render btn(`💰`,`/${data.pathUUID}/treasury`)}
            {@render btn(`📚`,`/${data.pathUUID}/academy`)}
            {@render btn(`🕯️`,`/${data.pathUUID}/tomb`)}
        </div>
    </div>
    <div class="flex flex-col w-full">
        <div class="flex h-16 items-center bg-black/50 justify-center space-x-10">
            <span>💰<span class="bg-gray-200 inset-ring-2 inset-ring-gray-700/70 py-1 px-2">29175</span></span>
            <span>💎<span class="bg-gray-200 inset-ring-2 inset-ring-gray-700/70 py-1 px-2">256</span></span>
        </div>
        <div class="w-full flex flex-row h-full justify-between">
            <div class="min-w-64 w-full flex flex-col">
                <div class="h-full w-full bg-gray-500/25">
                    {@render children()}
                </div>
            </div>
        </div>
    </div>
    <div class="w-18 flex flex-col bg-black/50">
        {@html '<!--Add logout and other profile actions-->'}
        <form class='flex flex-col self-center h-16 justify-center' id='signUp'  method="POST" action="../../?/signOut" use:enhance>
            <button type='submit' class="text-3xl bg-black rounded-3xl w-12 cursor-pointer h-12 place-end">👑</button>
        </form>
        <div>

        </div>
    </div>
</div>
