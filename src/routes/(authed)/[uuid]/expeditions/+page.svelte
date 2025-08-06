<script>
    import ExpeditionSettings from "$lib/components/expeditions/ExpeditionSettings.svelte";
    import OngoingExpeditions from "$lib/components/expeditions/OngoingExpeditions.svelte";
    import BaseMap from "$lib/components/map/BaseMap.svelte";
    import { onMount, setContext } from 'svelte';

    const {data} = $props(); 
    
    const modes = ["MAP","EXPEDITION","EXPEDITION_OVERVIEW"];
    const oldCameraData = {x:0,y:0,scale:0.25}

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
    let expeditionsListToggle = $state(false);

    /**@type {HTMLElement}*/
    // svelte-ignore non_reactive_update
    let mapContainer;

    /** @type App.Location | undefined*/
    // svelte-ignore non_reactive_update
    let chosenLocation
    let mode = $state(modes[0]);

    // check in case handleLocalStorageLoad returns null
    onMount(() => {
        let savedMode = handleLocalStorageLoad("expedition_mode")
        if (savedMode) {
            mode = savedMode;
        }
        let savedChosenLocation = handleLocalStorageLoad("chosen_location",true);
        if (savedChosenLocation) {
            chosenLocation = savedChosenLocation;
        }  
    });
    
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

{#if mode === modes[0]}
    <div class="absolute z-1000 w-64 top-25 left-35 max-h-full flex flex-col space-y-1 items-left">
        <button onclick={()=>expeditionsListToggle = !expeditionsListToggle} class="border-2 text-xl select-none h-10 border-black bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300 cursor-pointer px-3 py-1.5">Ongoing Expeditions</button>
        {#if expeditionsListToggle}
            <OngoingExpeditions pathUUID={data.pathUUID}/>
        {/if}
    </div>
    <div class="absolute z-1000 select-none top-25 right-35 flex space-x-1 items-center h-10">
        <span class="bg-gray-500 border">{(zoom*100).toFixed(0)}%</span>
        <button onclick={handleZoomIn} class="border w-8 h-8 bg-yellow-500 cursor-pointer hover:saturate-150 active:saturate-50">+</button>
        <button onclick={handleZoomOut} class="border w-8 h-8 bg-yellow-500 cursor-pointer hover:saturate-150 active:saturate-50">-</button>
    </div>
    <div bind:this={mapContainer} class="w-full overflow-scroll bg-amber-900/50 h-full">
        <div class="relative w-full">
            <BaseMap zoom={zoom} mapContainer={mapContainer} locations={data.locations} />
        </div>
    </div>
{:else if mode === modes[1] && location}
    <ExpeditionSettings closeLocation={closeLocation} chosenLocation={chosenLocation}/>
{/if}

