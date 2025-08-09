<script>
    import CharSlot from "$lib/components/servants/CharSlot.svelte";
    import { getServantById } from "$lib/state/servants.svelte";
    import { onMount } from "svelte";
    import {ExpeditionStatus} from '$lib/enums/enums.js'
    import Inventory from "$lib/components/inventory/Inventory.svelte";
    import {completeExpedition,archiveExpedition } from '$lib/state/expeditionState.svelte.js';

    const {data} = $props()
    let servant = $state()
    let timeData = $state()

    onMount(()=>{
        if (data.expedition) {
            servant = getServantById(data.expedition.servantId)
        }
        const inverval = setInterval(()=>{
            let msLeft = data.expedition.endTime - Date.now();
            if (msLeft <= 0) {
                if (data.expedition.status === ExpeditionStatus.IN_PROGRESS) {
                    completeExpedition(data.expedition.id);
                }
                return undefined
            }
            let totalSeconds = Math.floor(msLeft / 1000);

            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;
            
            timeData = { 
                hours,
                minutes,
                seconds
            };
        })
        return () => clearTimeout(inverval)
    })
</script>

<div class="flex flex-col w-full h-screen">
    {#if data.expedition}
        {#if servant}
            <span class="text-3xl py-2 px-10 text-slate-200 w-full bg-gray-900">{data.expedition.location.name}</span>
            <div class=" h-full pt-5 px-10 flex flex-col space-y-8 bg-amber-100">
                <div class="flex flex-col md:flex-row space-y-7 space-x-20">
                    <div class="flex flex-col text-2xl text-center justify-center space-x-5">
                        {servant.name}
                        <CharSlot {servant} status={data.expedition.status}/>
                    </div>
                    <div class="md:place-self-center space-y-2">
                        <span class="flex flex-row text-xl space-x-2">
                            <span class="font-semibold">Task:</span>
                            <span class="text-left">
                                {data.expedition.task}
                        </span>
                        </span>
                        <span class="flex flex-row text-xl space-x-2">
                            <span class="font-semibold">Approach:</span>
                            <span class="text-left">
                                {data.expedition.approach}
                            </span>
                        </span>
                        <span class="flex flex-row text-xl space-x-2">
                            <span class="font-semibold">Scale:</span>
                            <span class="text-left">
                                {data.expedition.scale}
                            </span>
                        </span>
                    </div>
                </div>
                <span class="w-full h-1 bg-black"></span>
                <span class="flex flex-col text-xl space-y-3">
                    <span class="font-semibold self-start">Edict</span>
                    <span class="text-left">
                        {data.expedition.overviewText}
                    </span>
                </span>
                    <span class="w-full h-1 bg-black"></span>
                    {#if data.expedition.status > ExpeditionStatus.IN_PROGRESS}
                        <div class="flex flex-col text-xl space-y-3 self-start items-start">
                            <span class="font-semibold">Report</span>
                                {#each data.expedition.events as event} 
                                    <div>
                                        {event}
                                    </div>
                                {/each}
                        </div>
                        <span class="w-full h-1 bg-black"></span>
                        <div class="flex flex-col self-start items-start h-64">
                            <span class="font-semibold ">Loot</span>
                            <Inventory inventoryData={{maxSlots:5,items:[]}} showCounter={false}/>
                        </div>
                    {:else}
                        <span>Results will be available after the expedition's end.</span>
                    {/if}
            </div>
        {:else}
            <span class="py-5 text-slate-200 w-full bg-gray-900">Servant not found</span>
        {/if}
    {:else}
            <span class="py-5 text-slate-200 w-full bg-gray-900">Expedition not found</span>
    {/if}
</div>
