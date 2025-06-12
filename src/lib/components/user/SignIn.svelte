<script>
    import { enhance } from '$app/forms';

    let { data = $bindable(), handleClose, form } = $props();
    let email = $state("");
    let password = $state("");

</script>

<div class='flex w-80 absolute h-60 bg-blue-100 justify-center content-center border-2 border-black  text-stone-50'>
    <div class='text-center pt-2 self-center flex flex-col gap-y-5 w-full max-md:m-2 xl:w-1/3 2xl:w-1/4'>
        <button
                type='button'
                class:bg-red-300={data.isError}
                class='text-xl absolute right-2 top-2 grayscale-75 saturate-150 cursor-pointer'
                onclick={handleClose}
        >☠️</button>
        <h1 class='text-2xl'>{data.title}</h1>
        <form class='flex flex-col gap-y-2 self-center' id='signIn'  method="POST" action="?/signIn" use:enhance>
            <div class="flex flex-col space-y-3">
                <input
                        name="email"
                        class:border={form?.error}
                        class:border-red-300={form?.error}
                        placeholder='email'
                        autocomplete="email"
                        class='py-2 bg-white ring-1 px-4 rounded-sm text-gray-950 font-semibold'
                        bind:value={email}
                />
                <input
                        name="password"
                        class:border={form?.error}
                        class:border-red-300={form?.error}
                        placeholder='password'
                        type="password"
                        autocomplete="current-password"
                        class='py-2 bg-white ring-1 px-4 rounded-sm text-gray-950 font-semibold'
                        bind:value={password}
                />
                <button
                        type='submit'
                        class:bg-red-300={form?.error}
                        class='bg-white py-2 px-2 ring-1 cursor-pointer hover:bg-gray-100 text-gray-950 font-semibold rounded-sm '
                >Sign in</button>
            </div>
        </form>
        <div class:text-red-500={form?.error} class="h-8">
            {#if form?.message}
                <p>{form.message}</p>
            {/if}
        </div>
    </div>
</div>
