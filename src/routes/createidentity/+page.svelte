<script>
	import { goto } from '$app/navigation';
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	import { createIdentity } from '$lib/openpgp';

	var usernameStatus = $state('');
	var username = $state('');

	var passwordStatus = $state('');
	var password = $state('');

	var commentStatus = $state('');
	var comment = $state('');

	var emailStatus = $state('')
	var email = $state('');
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	async function create() {
		var isInvalid = false;
		usernameStatus = ''
		passwordStatus = ''
		commentStatus = ''
		emailStatus = ''
		
		if (username === '') {
			usernameStatus = 'invalid'
			isInvalid = true;
		}
		if (password === '') {
			passwordStatus = 'invalid'
			isInvalid = true;
		}
		if (comment === '') {
			commentStatus = 'invalid'
			isInvalid = true;
		}
		if (!emailRegex.test(email)) {
			emailStatus = 'invalid'
			isInvalid = true;
		}
		if (isInvalid) {
			return;
		}
		
		await createIdentity(username, password, email, comment);

		username = ''
		password = ''
		email = ''
		comment = ''

		goto('/');
	}
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
	<input class={emailStatus} type="email" placeholder="Email" bind:value={email}/>
	<input type="button" value="Create" onclick={create} />
</div>