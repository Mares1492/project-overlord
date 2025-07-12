<script>
    import BaseMap from "$lib/components/map/BaseMap.svelte";
    import { onMount, setContext } from 'svelte';

    
    const modes = ["MAP","EXPEDITION"]
    const oldCameraData = {x:0,y:0,scale:0.25}

    const setTaskSettingsValue = (valueToSet) => {
        expeditionSettings.task.value = valueToSet
    }

    const setApproachSettingsValue = (valueToSet) => {
        expeditionSettings.approach.value = valueToSet
    }

    const expeditionSettings = $state({
        task:{
            options:[
                {
                    name:"Scout",
                    handleClick:setTaskSettingsValue
                },
                {
                    name:"Loot",
                    handleClick:setTaskSettingsValue
                },
                {
                    name:"Foster Ties",
                    handleClick:setTaskSettingsValue
                }
            ],
            value:0
        },
        approach:{
            options:[
                {
                    name:"Stealth",
                    handleClick:setApproachSettingsValue
                },
                {
                    name:"Action",
                    handleClick:setApproachSettingsValue
                },
                {
                    name:"Situational",
                    handleClick:setApproachSettingsValue
                }
            ],
            value:0
        }
    })

    /**
     * 
     * @param storeRef {string}
     * @param toParsed {boolean}
     */
    const handleLocalStorageLoad = (storeRef, toParsed = false) => {
        const stored = localStorage.getItem(storeRef);
        if (toParsed) {
            return stored ? JSON.parse(stored) : null;
        }
        return stored;
    }

    let zoom = $state(0.25);

    /**@type {HTMLElement}*/
    // svelte-ignore non_reactive_update
    let mapContainer;

    /** @type App.Location | undefined*/
    // svelte-ignore non_reactive_update
    let chosenLocation = handleLocalStorageLoad("chosen_location",true)
    let mode = $state(handleLocalStorageLoad("expedition_mode"))

    /**
     * 
     * @param location {App.Location}
     */
    const chooseLocation = (location) => {
        chosenLocation = location
        localStorage.setItem("chosen_location",JSON.stringify(chosenLocation));
        mode=modes[1]
        localStorage.setItem("expedition_mode",mode);
    }
    setContext('chooseLocation', chooseLocation);

    const closeLocation = () => {
        mode = modes[0]
        localStorage.setItem("expedition_mode",mode);
    }

    const handleZoomIn = () => {
        saveMapCenter()
        if(zoom + 0.1 < 1){
            zoom+=0.1
        }
        else{
            zoom = 1
        }
        loadMapCenter()
    }

    const handleZoomOut = () => {
        saveMapCenter()
        if(zoom - 0.1 > 0.25){
            zoom-=0.1
        }
        else{
            zoom = 0.25
        }
        loadMapCenter()
    }

    const saveMapCenter = () => {
        if (mapContainer) {
            oldCameraData.x = (mapContainer.scrollLeft + mapContainer.clientWidth * 0.5) / zoom;
            oldCameraData.y = (mapContainer.scrollTop + mapContainer.clientHeight * 0.5) / zoom;
        }
    }

    const loadMapCenter = () => {
        if (mapContainer) {
            mapContainer.scrollLeft = (oldCameraData.x * zoom) - mapContainer.clientWidth * 0.5;
            mapContainer.scrollTop = (oldCameraData.y * zoom) - mapContainer.clientHeight * 0.5;
        }
    }

</script>

{#snippet expeditionSettingBtn (title,handleClick,isChosen)}
    <button onclick={handleClick} class:bg-yellow-200={isChosen} class="w-26 h-26 hover:bg-yellow-300 bg-slate-200 cursor-pointer">{title}</button>
{/snippet}

{#if mode === modes[0]}
    <div class="absolute z-1000 select-none top-25 right-35">
        <span class="bg-gray-500 border">{(zoom*100).toFixed(0)}%</span>
        <button onclick={handleZoomIn} class="border w-8 h-8 bg-yellow-500 cursor-pointer hover:saturate-150 active:saturate-50">+</button>
        <button onclick={handleZoomOut} class="border w-8 h-8 bg-yellow-500 cursor-pointer hover:saturate-150 active:saturate-50">-</button>
    </div>
    <div bind:this={mapContainer} class="w-full overflow-scroll bg-amber-900/50 h-full">
        <div class="relative w-full">
            <BaseMap zoom={zoom} mapContainer={mapContainer} />
        </div>
    </div>
{:else if mode === modes[1] && location}
    <div class="w-full h-full flex justify-center bg-amber-900/50">
        <div class="relative min-w-2xl h-full font-medium overflow-y-auto bg-amber-50 py-2.5 max-w-3/4 flex flex-col space-y-5 text-lg">
            <button onclick={closeLocation} class="absolute top-1.5 right-5 px-2 pt-0.5 text-center text-2xl cursor-pointer hover:bg-gray-500">X</button>
            <div class="flex flex-col mt-5 space-y-5">
                <div class="text-2xl px-5">
                    <i class="font-thin">Expedition to:</i>
                    <span class="font-black">{chosenLocation.name}</span>
                    <!-- This section is for location icon--> 
                </div>
                <p class="px-5">{chosenLocation.description}</p>
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl mb-3.5">Task</span>
                <div class="flex flex-row justify-around w-5/6 self-center">
                    {#each expeditionSettings.task.options as task,i(task.name)}
                        {@render expeditionSettingBtn(task.name,()=>task.handleClick(i),expeditionSettings.task.value === i)}
                    {/each}
                </div>
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl mb-3.5">Approach</span>
                 <div class="flex flex-row justify-around w-5/6 self-center">
                    {#each expeditionSettings.approach.options as approach,i(approach.name)}
                        {@render expeditionSettingBtn(approach.name,()=>approach.handleClick(i),expeditionSettings.approach.value === i)}
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}

