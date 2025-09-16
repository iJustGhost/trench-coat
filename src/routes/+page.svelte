<script>
	import { goto } from '$app/navigation';
	import { getIdentity, verifyIdentity } from '$lib/openpgp';
	import { onMount } from 'svelte';

	var loginView = $state('hidden');
	var createButtonView = $state('');
	var password = $state('');
	var passwordStatus = $state('text-white border-2 border-green-700 text-2xl outline-0 p-2 my-1')

	async function verify() {
		if (!(await verifyIdentity(password))) {
			passwordStatus = 'text-white border-2 border-red-700 text-2xl outline-0 p-2 my-1'
			return
		}
		passwordStatus = 'text-white border-2 border-green-700 text-2xl outline-0 p-2 my-1'
		goto('/contacts')
	}

	onMount(async () => {
		if (await getIdentity()) {
			loginView = 'flex';
			createButtonView = 'hidden';
			return;
		}
		loginView = 'hidden';
		createButtonView = '';
	});
</script>

<p class="mt-8 text-center text-6xl">
	<span class="text-green-700">Trench</span> Coat<br /><span class="text-lg"
		><span class="text-green-700">They see</span> the text.<span class="text-green-700">You</span> hold
		the truth.</span
	>
</p>

<div class="absolute w-1/2 translate-1/2">
	<div id="login" class="{loginView} flex-col">
		<input type="password" name="password" placeholder="Password" bind:value={password} class={passwordStatus} />
		<input type="button" value="Enter" onclick={verify} />
	</div>
	<input
		type="button"
		value="Create New Identity"
		id="create-new"
		class={createButtonView}
		onclick={() => goto('/createidentity')}
	/>
</div>
