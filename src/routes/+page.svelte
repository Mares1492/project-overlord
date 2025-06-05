{#snippet btn(icon)}
    <button class="text-3xl cursor-pointer saturate-75 hover:saturate-200">
        {icon}
    </button>
{/snippet}

<div class="w-full h-dvh overflow-y-hidden bg-amber-50">
    <div class="w-full bg-gray-300 h-20 flex flex-row justify-around">
        {@render btn(`🏰`)}
        {@render btn(`⚔️`)}
        {@render btn(`🧍‍♂️`)}
        {@render btn(`🕯️`)}
    </div>
    <div class="w-full flex flex-row h-full justify-between">
        <div class="min-w-16 bg-gray-300 ">

        </div>
        <canvas class="min-w-48 bg-gray-500">

        </canvas>
        <div class="min-w-16 bg-gray-300 ">

        </div>
    </div>
</div>