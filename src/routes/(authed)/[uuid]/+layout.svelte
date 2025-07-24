<script>
	import '../../../app.css';
    import {goto} from '$app/navigation';
    import { enhance } from '$app/forms';
    import castle from "$lib/assets/bg/keep/castle.png";
    import {getAvailableExpeditionsNumber} from '$lib/state/expeditionState.svelte.js';
    import { onMount } from 'svelte';
    import {initAssets} from '$lib/state/servants.svelte.js';

    /** @type {import('./$types').LayoutProps} */
	let { children, data} = $props();

    onMount(() => {
        initAssets();
    });
</script>

{#snippet btn(icon,path='/',hasNotifications = false,notificationCount = 0)}

    <button class="relative text-3xl xl:text-5xl cursor-pointer grayscale-50 hover:grayscale-0 hover:saturate-200" onclick={()=>goto(path)}>
        {icon}
        {@html '<!--Add working notification system-->'}
        {#if hasNotifications && notificationCount > 0}
            <span class="absolute bg-red-500 border border-black text-white right-1 -top-3 rounded-full w-5 h-5 text-sm">{notificationCount}</span>
        {/if}
    </button>
{/snippet}

<div class="relative w-full h-screen overflow-y-hidden flex flex-row text-center text-2xl ">
    <img class="absolute w-full h-full -z-100" alt="castle" src={castle}>
    <div class="w-18 flex flex-col bg-black/50">
        <div class="h-16">
        </div>
        <div class="flex flex-col h-full pt-1 justify-around">
            {@render btn(`🏰`,`/${data.pathUUID}/keep`)}
            {@render btn(`⚔️`,`/${data.pathUUID}/expeditions`,true,getAvailableExpeditionsNumber())}
            {@render btn(`🧍‍♂️`,`/${data.pathUUID}/servants`)}
            {@render btn(`💰`,`/${data.pathUUID}/treasury`)}
            {@render btn(`📖`,`/${data.pathUUID}/academy`)}
            {@render btn(`🕯️`,`/${data.pathUUID}/tomb`)}
        </div>
    </div>
    <div class="flex flex-col w-full">
        <div class="flex h-18 items-center bg-black/50 py-5 justify-center space-x-10">
            <div><span class="select-none">💰</span><span class="bg-gray-200 cursor-cell inset-ring-2 inset-ring-gray-700/70 py-1 px-2">29175</span></div>
            <div><span class="select-none hue-rotate-50">💎</span><span class="bg-gray-200 cursor-cell inset-ring-2 inset-ring-gray-700/70 py-1 px-2">256</span></div>
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
            <button type='submit' class="text-2xl  xl:text-3xl bg-black rounded-3xl w-10 h-10 xl:w-12 xl:h-12 cursor-pointer place-end">👑</button>
        </form>
        <div>

        </div>
    </div>
</div>
