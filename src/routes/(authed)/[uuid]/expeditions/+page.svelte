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
        if(zoom > 1){
            zoom-=0.2
            console.log(zoom)
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
<div class="w-full overflow-auto bg-amber-900/50 h-full">
    <div class="relative w-full h-9/12">
        <BaseMap zoom={zoom}/>
    </div>
</div>
