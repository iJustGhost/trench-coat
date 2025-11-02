<script>
	import { goto } from '$app/navigation';
	import { getIdentity, verifyIdentity } from '$lib/openpgp';
	import { onMount } from 'svelte';

	var loginView = $state('mt-8 hidden');
	var createButtonView = $state('text-2xl mt-8');
	var password = $state('');
	var passwordStatus = $state('text-2xl')

	async function verify() {
		if (!(await verifyIdentity(password))) {
			passwordStatus = 'text-2xl invalid'
			return
		}
		passwordStatus = 'text-2xl'
		goto('/contacts')
	}

	onMount(async () => {
		if (await getIdentity()) {
			loginView = 'flex';
			createButtonView = 'text-2xl mt-8 hidden';
			return;
		}
		loginView = 'mt-8 hidden';
		createButtonView = 'text-2xl mt-8';
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
		<input class="mt-8" type="button" value="Enter" onclick={verify} />
	</div>
	<input
		type="button"
		value="Create New Identity"
		id="create-new"
		class={createButtonView}
		onclick={() => goto('/createidentity')}
	/>
</div>
