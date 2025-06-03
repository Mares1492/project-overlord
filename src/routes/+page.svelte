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
        <div class="w-20 bg-gray-300 ">

        </div>
        <div class="w-20 bg-gray-300 ">

        </div>
    </div>
</div>