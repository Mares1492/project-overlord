<script>
    const {data} = $props()
</script>

<div class="w-full h-screen bg-amber-100">
    <div class="pt-5 px-10 flex flex-col space-y-8">
        <span class="text-3xl">{data.expedition.location.name}</span>
        <div class="flex flex-row justify-center space-x-20">
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
        <span class="w-full h-1 bg-black"></span>
        <span class="flex flex-col text-xl space-y-3">
            <span class="font-semibold">Edict</span>
            <span class="text-left">
                {data.expedition.overviewText}
            </span>
        </span>
    </div>
</div>
