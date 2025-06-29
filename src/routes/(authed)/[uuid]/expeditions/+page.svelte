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
</script>

<div class="w-full overflow-auto bg-amber-900/50 h-full">
    <div class="relative w-full h-full">
        <div class="absolute right-5 top-3 z-1000 select-none">
            <button onclick={handleZoomIn} class="border w-8 h-8 bg-yellow-500 cursor-pointer hover:saturate-150 active:saturate-50">+</button>
            <button onclick={handleZoomOut} class="border w-8 h-8 bg-yellow-500 cursor-pointer hover:saturate-150 active:saturate-50">-</button>
        </div>
        <BaseMap scale={zoom}/>
    </div>
</div>
