<script>
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

    import { createIdentity } from '$lib/openpgp'

    var username = $state('');
    var password = $state('');
    var email = $state('');

    function setIdentity() {
        createIdentity(username, password, email)
        goto('/')
    }
</script>

<p class="m-8 text-center text-4xl">
	Create New <span class="text-green-700">Identity</span>
</p>

<div class="mx-4 flex flex-col">
	<input type="text" placeholder="Username" bind:value={username}/>
	<input type="password" placeholder="Password" bind:value={password} />
	<p class="text-sm text-gray-500">* Just for identification</p>
	<input type="text" placeholder="Email" />
	<input type="button" value="Create" onclick={setIdentity()} />
</div>
