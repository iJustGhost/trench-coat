<script>
	import { goto } from '$app/navigation';
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	import { createIdentity, isIdentityExists } from '$lib/openpgp';
	import { onMount } from 'svelte';

	var usernameStatus = $state('text-2xl');
	var username = $state('');

	var passwordStatus = $state('text-2xl');
	var password = $state('');

	var commentStatus = $state('text-2xl');
	var comment = $state('');

	var emailStatus = $state('text-2xl');
	var email = $state('');
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	async function create() {
		var isInvalid = false;
		usernameStatus = 'text-2xl';
		passwordStatus = 'text-2xl';
		commentStatus = 'text-2xl';
		emailStatus = 'text-2xl';

		if (username === '') {
			usernameStatus = 'text-2xl invalid';
			isInvalid = true;
		}
		if (password === '') {
			passwordStatus = 'text-2xl invalid';
			isInvalid = true;
		}
		if (comment === '') {
			commentStatus = 'text-2xl invalid';
			isInvalid = true;
		}
		if (!emailRegex.test(email)) {
			emailStatus = 'text-2xl invalid';
			isInvalid = true;
		}
		if (isInvalid) {
			return;
		}

		await createIdentity(username, password, email, comment);

		username = '';
		password = '';
		email = '';
		comment = '';

		goto('/');
	}

	onMount(async () => {
		if (await isIdentityExists()) {
			goto('/');
		}
	});
</script>

<p class="my-6 text-center text-4xl">
	Create New <span class="text-green-700">Identity</span>
</p>

<div class="mx-4 flex flex-col">
	<input class={usernameStatus} type="text" placeholder="Username" bind:value={username} />
	<input class={passwordStatus} type="password" placeholder="Password" bind:value={password} />
	<p class="text-sm text-gray-500">* Will be seen in others contacts list</p>
	<input class={commentStatus} type="text" placeholder="Comment" bind:value={comment} />
	<p class="text-sm text-gray-500">* Just for identification</p>
	<input class={emailStatus} type="email" placeholder="Email" bind:value={email} />
	<input class="text-2xl mt-8" type="button" value="Create" onclick={create} />
</div>
