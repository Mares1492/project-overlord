<script>
    import BaseMap from "$lib/components/map/BaseMap.svelte";
    
    let zoom = $state(1)

    const handleZoomIn = () => {
        if(zoom < 5){
            zoom+=0.2
            console.log(zoom)
            return
        }
        zoom = 5

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
        zoom = 1
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
