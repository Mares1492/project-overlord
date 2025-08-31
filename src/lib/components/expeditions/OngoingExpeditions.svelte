<script>
    import {onMount} from 'svelte';
   	import { slide,scale } from 'svelte/transition';
    import {ExpeditionStatus} from '$lib/enums/enums.js';
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';
    
    //On expand consider creating ts classes
    /**
        * @typedef {Object.<string, TimeObject>} ExpeditionsTimeCounts
        * @typedef {Object} TimeObject
        * @property {number} seconds
        * @property {number} minutes
        * @property {number} hours
        * @property {number} msLeft
        * 
        * @typedef {Object} Location
        * @property {number} id
        * @property {string} name
        * 
        * @typedef {Object} Servant
        * @property {string} uuid
        * @property {string} name
        * 
        * @typedef {Object} Expedition
        * @property {string} uuid
        * @property {Date} endTime
        * @property {Location} location
        * @property {Servant} servant
        * @property {string} task
        * @property {string} approach
        * @property {string} scale
        * @property {number} status
        * 
        * @typedef {Object.<string, boolean>} ClickState
     */

    /** @type {{ pathUUID:string, ongoingExpeditions: Array<Expedition> }} */
    const {pathUUID,ongoingExpeditions} = $props()

    /**@type {ExpeditionsTimeCounts}*/
    let expeditionsTimeCounts = $state({});
    let chosenExpeditionUUID = $state("");
    /**@type {ClickState}*/
    let clickState = $state({})
    let pageState = $state({
        loading: true,
        isBlocking: false,
        error: false
    });

    const updateTimeCounts = () => {
        if (!ongoingExpeditions) {
            return 
        }
        ongoingExpeditions.forEach(/**@param {Expedition} exp*/ exp => {
            let msLeft = exp.endTime.getTime() - Date.now();
            if (msLeft <= 0) {
                expeditionsTimeCounts[exp.uuid] = {
                    hours:0,
                    minutes:0,
                    seconds:0,
                    msLeft
                }
                return
            }
            let totalSeconds = Math.floor(msLeft / 1000);

            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;
            
            expeditionsTimeCounts[exp.uuid] = {
                hours,
                minutes,
                seconds,
                msLeft
            }
            
            });
    }
    
    const setTimeCountsTimeout = () => {
        const interval = setInterval( () => {
            pageState.loading = false;
            updateTimeCounts()
        }, 1000);
        return () => clearInterval(interval);
    }

    onMount(() => {
        updateTimeCounts()
        setTimeCountsTimeout()
        
        for(let expedition of ongoingExpeditions){
            clickState[expedition.uuid] = true
        }
    });

    /**@param {string} expeditionUUID*/
    const handleExpeditionExpandBtnClick = (expeditionUUID) => {
        //TODO: use action with server check instead
        goto(`/${pathUUID}/expeditions/${expeditionUUID}`)
    }

    /**@param {string} expeditionUUID*/
    const setFocusedExpeditionUUID = (expeditionUUID) => {
        chosenExpeditionUUID=expeditionUUID;
    }

    const onEnhance = () => {
        clickState[chosenExpeditionUUID] = false
        return async (/**@type {{result:any,update:any}}*/{ result,update }) => {
            await update();
            clickState[result.data.expeditionUUID] = true
        }
    }

</script>

<form id="completeExpedition" method="POST" action="?/completeExpedition" use:enhance={onEnhance}>
    <input type="hidden" name="expeditionUUID" value={chosenExpeditionUUID}>
</form>

<form id="archiveExpedition" method="POST" action="?/archiveExpedition" use:enhance={onEnhance}>
    <input type="hidden" name="expeditionUUID" value={chosenExpeditionUUID}>
</form>


{#snippet expeditionSlot(/**@type {Expedition}*/expedition)}
    <div transition:slide={{delay:300}} class="relative flex flex-col text-sm w-full h-42 text-gray-800 space-y-1 items-center justify-center">
        <div class="flex flex-row items-center justify-center relative w-full">
            <span class="font-bold self-center">{expedition.location.name}</span>
            <button 
                class="absolute right-1 text-gray-800 cursor-pointer text-shadow-2xs hover:text-shadow-md text-shadow-yellow-600 text-xl hover:text-2xl transition-all hover:translate-x-0.5 hover:-translate-y-0.5"
                onclick={()=>handleExpeditionExpandBtnClick(expedition.uuid)}
                in:scale|global={{delay:500}}
                out:scale|global={{duration:100}}
            > 
                📜
            </button>
        </div>
        
        <div class="border-t-2 border-gray-800 h-1 w-full mb-2"></div>
        <span class="text-gray-800">{expedition.servant.name}</span>
        <span class="text-gray-600">Task: <i>{expedition.task}</i></span>
        <span class="text-gray-600">Approach: <i>{expedition.approach}</i></span>
        <span class="text-gray-600">Scale: <i>{expedition.scale}</i></span>
        <div class="mt-2 h-14">
            {#if expeditionsTimeCounts[expedition.uuid]}
                {#if expedition.status === ExpeditionStatus.in_progress && expeditionsTimeCounts[expedition.uuid].msLeft < 1 }
                    <button disabled={!clickState[expedition.uuid]} form="completeExpedition" onfocusin={()=>setFocusedExpeditionUUID(expedition.uuid)} onmouseenter={()=>setFocusedExpeditionUUID(expedition.uuid)} type="submit" class="disabled:bg-gray-400 disabled:text-slate-200 bg-green-500 hover:bg-green-400 active:bg-green-300 px-2 py-1 rounded cursor-pointer text-slate-100 font-semibold">Complete</button>
                {:else if expedition.status === ExpeditionStatus.completed}
                    <button disabled={!clickState[expedition.uuid]} form="archiveExpedition" onfocusin={()=>setFocusedExpeditionUUID(expedition.uuid)} onmouseenter={()=>setFocusedExpeditionUUID(expedition.uuid)} type="submit" class="disabled:bg-gray-400 disabled:text-slate-200 bg-orange-600 hover:bg-amber-600 active:bg-yellow-600 px-2 py-1 rounded cursor-pointer text-slate-100 font-semibold">Archive</button>
                {:else}
                    <div class="flex flex-row items-center justify-center font-semibold ">
                        <span class="border w-12 px-2">{expeditionsTimeCounts[expedition.uuid].hours}h</span>:
                        <span class="border w-12 px-2">{expeditionsTimeCounts[expedition.uuid].minutes}m</span>:
                        <span class="border w-12 px-2">{expeditionsTimeCounts[expedition.uuid].seconds}s</span>
                    </div>
                {/if}
            {/if}
        </div>
    </div>
{/snippet}

{#if ongoingExpeditions.length === 0}
    {#if pageState.loading}
        <div class="flex w-full flex-col items-center justify-center ">
            <span class="text-2xl w-full font-bold">Loading ongoing expeditions...</span>
        </div>
    {:else}
        <div transition:slide|global class="flex w-full flex-col items-center justify-center">
            <span class="text-2xl w-full font-bold">No ongoing expeditions</span>
            <span class="text-lg w-full">Start one by choosing a location first!</span>
        </div>
    {/if}
{:else}
    <div transition:slide|global={{duration:300}}  class="flex flex-col max-h-264 overflow-y-auto mini-scrollbar bg-amber-400/70 border-2 p-5 justify-start space-y-7 items-center">
        {#each ongoingExpeditions as expedition(expedition.uuid)}
            {@render expeditionSlot(expedition)}
        {/each}
    </div>
{/if}
{#if pageState.error}
    <div class="flex w-full flex-col items-center justify-center ">
        <span class="text-2xl w-full font-bold">Error loading expeditions</span>
    </div>
{/if}

<style>
    .mini-scrollbar {
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #666 transparent;
    }

    /* scrollbar track (background) */
    .mini-scrollbar::-webkit-scrollbar {
        width: 6px;   /* makes it thin */
        height: 6px;  /* for horizontal scroll */
    }

    /* scrollbar thumb (the draggable part) */
    .mini-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.5);
        border-radius: 10px;
    }

    /* optional: hover effect */
    .mini-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(100, 100, 100, 0.8);
    }
</style>