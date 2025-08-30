<script>
    import { fade } from 'svelte/transition';
    import {invertedItemRarity,invertedItemType} from '$lib/enums/enums'
	let {item,position} = $props()
</script>

{#if item}
	<div  
        in:fade|global={{duration:200}}
		class="absolute z-50 w-64 h-max-42 overflow-auto p-4 rounded-sm bg-black/80 border border-gray-300 text-sm max-w-sm"
		style={`left: ${position.x}px; top: ${position.y}px`}
	>
		<div class="flex flex-col space-y-2 mb-3.5 ">
			<h3 class="font-bold text-slate-100 text-base mb-1">{item.name}<br><span>{item.is_base?" (your base)":""}</span></h3>
            <button type="submit" class="rounded cursor-pointer hover:bg-slate-200 bg-slate-300 active:bg-slate-500 py-1">Equip</button>
            <span class=" text-slate-300 text-xs mb-2">Item type: {invertedItemType[item.type]}</span>
            <span class=" text-slate-100 text-sm mb-2">{item.description}</span>
			{#if invertedItemRarity[item.rarity]}
                <span class="text-xs text-slate-300">Rarity: <b>{invertedItemRarity[item.rarity].toUpperCase()}</b></span>
            {/if}
        </div>
    </div>
{/if}
