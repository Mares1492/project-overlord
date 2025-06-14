<script>
    import '../app.css';
    import SignIn from "$lib/components/user/SignIn.svelte";
    import SignUp from "$lib/components/user/SignUp.svelte";

    const states = ["landing","sign_in","sign_out"]
    let currState = $state(states[0])

    /** @type {import('./$types').PageProps} */
    let { data,form } = $props();

    const handleCloseSignWindow = () => currState = states[0]

</script>

<div class="w-full h-screen flex justify-center align-middle  bg-[url($lib/assets/bg/landing/field.png)] grayscale-25">
    <div class="xl:w-1/3 md:w-2/3 w-3/4 place-items-center font-semibold bg-blue-200 flex justify-center flex-col text-center space-y-6 px-7 border-x-4">
        <div class="md:text-3xl text-lg">
            <span>Welcome to </span><h1>⚔️Idle Mercenary Lords</h1>
        </div>
        <div class="w-full flex justify-center">
            <div class="flex flex-col space-y-5 justify-center">
                <button
                        onclick={()=>currState = states[1]}
                        class="border-2 px-3 py-2 w-28 h-12 text-2xl cursor-pointer bg-yellow-100 hover:bg-blue-300 active:bg-blue-100"
                >
                    Sign in
                </button>
                <button
                        onclick={()=>currState = states[2]}
                        class="border-2 px-3 py-2 w-28 h-12 text-2xl cursor-pointer bg-gray-200 hover:bg-blue-300 active:bg-blue-100"
                >
                    Sign up
                </button>
            </div>
            {#if currState === states[1]}
                <SignIn bind:data handleClose={handleCloseSignWindow} form={form}/>
            {:else if currState === states[2]}
                <SignUp bind:data handleClose={handleCloseSignWindow} form={form}/>
            {/if}
        </div>
        <p class="md:text-xl xl:leading-8 text-sm leading-5">
            The world lies in ruin — kingdoms burned, empires shattered.
            From the chaos, only those who command survive.
            <br>
            You are a Mercenary Lord — no crown, no bloodline, only ambition.
            Raise a warband of outcasts, beasts, sorcerers, and blades-for-hire.
            Build your stronghold from rubble. Send your forces into the dark.
            Let them fight, bleed, and die — again and again — for your cause.
            <br>
            In this broken age:
            <br>
            Gold buys loyalty. Blood earns power.
            <br>
            Servants fall... and rise stronger.
            <br>
            The world remembers only victory — not mercy.
            <br><br>
            🩸
            <br><br>
            <i class="text-lg">
                "Command the forgotten.
                Conquer the forsaken.
                And carve your name into the bones of the world..."
            </i>
        </p>
    </div>
</div>