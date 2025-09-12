<script>
    import { enhance } from '$app/forms';
    import LoadingIcon from '../display/LoadingIcon.svelte';

    let { data = $bindable(), form, handleClose} = $props();
    let email = $state("");
    let password = $state("");
    let repeatPassword = $state("");
    let isLoading = $state(false)

    const onEnhance = () => {
        isLoading = true
        return async ({result,update}) => {
            await update()
            isLoading = false
        }
    }

    /**
     * @param email {string}
     * @param password {string}
     */


</script>

<div class='flex w-80 absolute min-h-72 bg-blue-100 pt-5 pb-8 justify-center content-center border-2 border-black  text-stone-50'>
    <div class='text-center px-5 space-y-3 self-center flex flex-col w-full max-md:m-2 xl:w-1/3 2xl:w-1/4'>
        <button
                type='button'
                class:bg-red-300={data.isError}
                class='text-xl absolute grayscale-75 saturate-150 right-2 top-2 cursor-pointer'
                onclick={handleClose}
        >☠️</button>
        <h1 class='text-2xl text-black'>Sign up</h1>
        {#if isLoading}
            <LoadingIcon/>
        {:else}
            <form class='flex flex-col self-center' id='signUp'  method="POST" action="?/signUp" use:enhance={onEnhance}>
                <div class="flex flex-col space-y-4">
                    <input
                            name="email"
                            class:border={data.isError}
                            class:border-red-300={data.isError}
                            placeholder='email'
                            autocomplete="email"
                            class='py-2 bg-white ring-1 px-4 rounded-sm text-gray-950 font-semibold'
                            bind:value={email}
                    />
                    <input
                            name="password"
                            class:border={data.isError}
                            class:border-red-300={data.isError}
                            placeholder='password'
                            type="password"
                            autocomplete="current-password"
                            class='py-2 bg-white ring-1 px-4 rounded-sm text-gray-950 font-semibold'
                            bind:value={password}
                    />
                    {#if form?.issues?.fieldErrors?.password?.length}
                        <div class="text-red-500">
                            {#each form?.issues.fieldErrors.password as message}
                                <p>{message}</p>
                            {/each}
                        </div>
                    {/if}
                    <input
                            name="repeatPassword"
                            class:border={data.isError}
                            class:border-red-300={data.isError}
                            placeholder='repeat password'
                            type="password"
                            autocomplete="current-password"
                            class='py-2 bg-white ring-1 px-4 rounded-sm text-gray-950 font-semibold'
                            bind:value={repeatPassword}
                    />
                    {#if form?.issues?.fieldErrors?.repeatPassword?.length}
                        <div class="text-red-500">
                            {#each form?.issues.fieldErrors.repeatPassword as message}
                                <p>{message}</p>
                            {/each}
                        </div>
                    {/if}
                    <button
                            type='submit'
                            class:bg-red-300={data.isError}
                            formaction="?/signUp"
                            class='bg-white  active:bg-amber-50 py-2 px-2 ring-1 cursor-pointer hover:bg-gray-100 text-gray-950 font-semibold rounded-sm '
                    >Sign up</button>
                </div>
            </form>
        {/if}
    </div>
</div>
