<script>
    import {ItemType} from "$lib/enums/enums.js";
    import {itemsIcons} from '$lib/state/items'
    
    const itemTypeDisplayClasses = {
        [ItemType.helmet]: "top-5",
        [ItemType.hood]: "top-3",
        [ItemType.armor]: "-top-5",
        [ItemType.off_hand]: "-left-8 -top-14",
        [ItemType.weapon]: "-top-15 left-3",
        [ItemType.magic_off_hand]: "-top-18 -left-9",
        [ItemType.hands]:"-top-12"
    }

    const {path,name,itemTypeId} = $props()

    /**@param {number} itemType*/
    const getItemDisplayClass = (itemType) => itemTypeDisplayClasses[itemType] ?? "";
</script>

{#await itemsIcons[`/src/lib/assets/items/${path}`]() then src}
    <span class="pointer-events-none">
        <img class={`absolute select-none inset-0 ${getItemDisplayClass(itemTypeId)}`} src={src.default} alt={name} />
    </span>
{:catch _error}
    <p>Error loading image</p>
{/await}
