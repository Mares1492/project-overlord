<script>
    import BaseMap from "$lib/components/map/BaseMap.svelte";
    import { setContext } from 'svelte';

    const modes = ["MAP","EXPEDITION"]
    
    let zoom = $state(0.25);
    let mode = $state(modes[0])
    let mapContainer;
    const oldCameraData = {x:0,y:0,scale:0.25}

    const chooseLocation = (location) => {
        mode=modes[1]
    }
    setContext('chooseLocation', chooseLocation);

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
<div class="absolute z-1000 select-none top-25 right-35">
        <span class="bg-gray-500 border">{(zoom*100).toFixed(0)}%</span>
        <button onclick={handleZoomIn} class="border w-8 h-8 bg-yellow-500 cursor-pointer hover:saturate-150 active:saturate-50">+</button>
        <button onclick={handleZoomOut} class="border w-8 h-8 bg-yellow-500 cursor-pointer hover:saturate-150 active:saturate-50">-</button>
</div>
<div bind:this={mapContainer} class="w-full overflow-scroll bg-amber-900/50 h-full">
    <div class="relative w-full">
        <BaseMap zoom={zoom} mapContainer={mapContainer}/>
    </div>
</div>
