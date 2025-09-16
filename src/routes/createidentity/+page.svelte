<script>
	import { goto } from '$app/navigation';
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	import { createIdentity } from '$lib/openpgp';

	var username = $state('');
	var password = $state('');
	var email = $state('');
	var comment = $state('');

	async function create() {
		await createIdentity(username, password, email, comment);
		goto('/');
	}
</script>

<p class="my-6 text-center text-4xl">
	Create New <span class="text-green-700">Identity</span>
</p>

<div class="mx-4 flex flex-col">
	<input type="text" placeholder="Username" bind:value={username} />
	<input class="text-white border-2 border-green-700 text-2xl outline-0 p-2 my-1" type="password" placeholder="Password" bind:value={password} />
	<p class="text-sm text-gray-500">* Will be seen in others contacts list</p>
	<input type="text" placeholder="Comment" bind:value={comment} />
	<p class="text-sm text-gray-500">* Just for identification</p>
	<input type="text" placeholder="Email" bind:value={email}/>
	<input type="button" value="Create" onclick={create} />
</div>