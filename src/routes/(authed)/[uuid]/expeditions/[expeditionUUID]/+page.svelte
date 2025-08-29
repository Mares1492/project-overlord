<script>
    import CharSlot from "$lib/components/servants/CharSlot.svelte";
    import { onMount } from "svelte";
    import {ExpeditionStatus} from '$lib/enums/enums.js'
    import Inventory from "$lib/components/inventory/Inventory.svelte";
    import { setServants,getServants,getServantByUUID } from '$lib/state/servants.svelte.js';
    import { enhance } from '$app/forms';
    
    const {data} = $props()
    let timeData = $state()

    onMount(()=>{
        setServants(data.servants)
        if (data.expedition.status.id === ExpeditionStatus.IN_PROGRESS) {
            const inverval = setInterval(()=>{
                let msLeft = data.expedition.endTime.getTime() - Date.now();
                if (msLeft <= 0) {
                    clearTimeout(inverval)
                    timeData = {msLeft:0}
                    return
                }
                let totalSeconds = Math.floor(msLeft / 1000);

                let hours = Math.floor(totalSeconds / 3600);
                let minutes = Math.floor((totalSeconds % 3600) / 60);
                let seconds = totalSeconds % 60;
                
                timeData = { 
                    hours,
                    minutes,
                    seconds,
                    msLeft
                };
            },1000)
            return () => clearTimeout(inverval)
        }
    })

</script>

{#snippet timeContainer(time)}
    <span 
        class="w-12 h-12 px-1 py-0.5 bg-gray-900 border border-gray-500 text-amber-100 content-center">
        {time}
    </span>
{/snippet}

<div class="flex flex-col w-full h-screen">
    {#if data.expedition}
        {#if data.expedition.servant && getServants().length}
            <span class="text-3xl py-2 px-10 text-amber-100 w-full bg-gray-900">{data.expedition.location.name}</span>
            <div class=" h-full pt-5 px-10 flex flex-col space-y-8 bg-amber-100">
                <div class="flex flex-col md:flex-row space-x-20 w-full">
                    <div class="flex flex-col text-2xl text-center justify-center space-x-5">
                        {data.expedition.servant.name}
                        <CharSlot servant={getServantByUUID(data.expedition.servant.uuid)} />
                    </div>
                    <div class="flex flex-col justify-around ">
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
                    <div class="flex self-center w-1/2">
                        <div class="flex flex-col w-full space-y-2.5 items-center h-32">
                            <div class="flex flex-row space-x-2"><span class="font-bold">Status:</span><i>{data.expedition.status.name.toUpperCase()}</i></div>
                            {#if data.expedition.status.id === ExpeditionStatus.IN_PROGRESS}
                                {#if timeData}
                                    {#if timeData.msLeft > 0}
                                        <div class="flex flex-row space-x-0.5">
                                            {@render timeContainer(timeData.hours)}
                                            {@render timeContainer(timeData.minutes)}
                                            {@render timeContainer(timeData.seconds)}
                                        </div>
                                    {:else}
                                        <form
                                            id='completeExpedition'  
                                            method="POST" 
                                            action="?/completeExpedition" 
                                            use:enhance
                                        >
                                            <button
                                                type="submit" 
                                                class="bg-green-500 h-20 w-46 content-center justify-end hover:bg-green-400 active:bg-green-300 rounded cursor-pointer text-white font-semibold">
                                                Complete
                                            </button>
                                        </form>
                                    {/if}
                                {:else}
                                    <span class="h-20 w-46 content-center border-dotted border-4">Loading...</span>
                                {/if}     
                            {:else if data.expedition.status.id === ExpeditionStatus.COMPLETED}
                                <form
                                    id='archiveExpedition'  
                                    method="POST" 
                                    action="?/archiveExpedition" 
                                    use:enhance
                                >
                                    <button
                                        type="submit" 
                                        class=" bg-orange-600 hover:bg-amber-500 active:bg-yellow-600 h-20 w-46 content-center justify-endrounded cursor-pointer text-slate-200 font-semibold">
                                        Archive
                                    </button>
                                </form>
                            {:else if data.expedition.status.id === ExpeditionStatus.ARCHIVED}
                                <span class="bg-gray-500 h-20 w-46 text-slate-50 content-center justify-end rounded">Archived</span>
                            {/if}
                        </div>
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
                    {#if data.expedition.status.id > ExpeditionStatus.IN_PROGRESS}
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
                            <div class="flex flex-row space-x-5"><span class="font-semibold ">Loot</span><span>💰{Math.round(Math.random()*1000 + 10)}</span></div>
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
