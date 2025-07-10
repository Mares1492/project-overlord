<script>
    import BaseMap from "$lib/components/map/BaseMap.svelte";
    import { setContext } from 'svelte';

    
    const modes = ["MAP","EXPEDITION"]
    
    let zoom = $state(0.25);
    let mode = $state(modes[0])
    let mapContainer;
    
    /**
     * @type App.Location
     */
    let chosenLocation;
    const oldCameraData = {x:0,y:0,scale:0.25}

    /**
     * 
     * @param location {App.Location}
     */
    const chooseLocation = (location) => {
        chosenLocation = location
        mode=modes[1]
    }
    setContext('chooseLocation', chooseLocation);

    const closeLocation = () => {
        mode = modes[0]

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
        <div class="relative min-w-2xl h-full font-medium bg-amber-50 py-2.5 max-w-3/4 flex flex-col space-y-5 text-lg">
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
                <span class="text-xl">Bidding</span>
                <!-- TODO: Bidding options (Scout, Loot, Foster Ties)--> 
            </div>
            <div class="border-t-2 py-3.5 flex flex-col">
                <span class="text-xl">Approach</span>
                <!-- TODO: Approach  options (Stealth, Action, Situational)--> 
            </div>
        </div>
    </div>
{/if}

