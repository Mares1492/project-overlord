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
    <div class="relative">
        <BaseMap/>
    </div>
</div>
