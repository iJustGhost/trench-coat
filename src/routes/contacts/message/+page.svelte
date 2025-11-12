<script>
	import { goto } from '$app/navigation';
	import { armoredPublicKey, decryptMessage, encryptMessage } from '$lib/openpgp';
	import { onMount } from 'svelte';
	const params = new URLSearchParams(window.location.search);

	var decryptOverlay = $state('hidden');
	var stringMessage = $state('');
	var encryptedMessage = '';

	onMount(async () => {
		if (!armoredPublicKey) {
			goto('/');
			return;
		}
	});

	async function decrypt() {
		var message = await decryptMessage(atob(stringMessage));
		stringMessage = message.data;
	}

	async function encrypt() {
		encryptedMessage = await encryptMessage(stringMessage, params.get('filename'));
		stringMessage = btoa(encryptedMessage);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(stringMessage);
		stringMessage = '';
	}
</script>

<div class="mx-4 my-4 flex items-center justify-between">
	<div>
		<p class="mb-2 flex text-4xl">{params.get('name')}</p>
		<p>
			{params.get('email').length > 28
				? params.get('email').slice(0, 28) + '...'
				: params.get('email')}
		</p>
		<p>
			({params.get('comment').length > 28
				? params.get('comment').slice(0, 28) + '...'
				: params.get('comment')})
		</p>
	</div>
	<p class="text-center text-3xl">
		<span class="text-green-700">Encrypt</span><br />Message
	</p>
</div>

<p class="text-center text-yellow-400">File encryption is still WIP!</p>

<div class="mt-8 flex flex-col items-center">
	<textarea
		class="w-2/3 resize-none"
		rows="6"
		name=""
		id=""
		bind:value={stringMessage}
		onkeydown={async (key) => {
			if (key.ctrlKey && key.key === 'e') {
				await encrypt();
			}
			if (key.ctrlKey && key.key === 'd') {
				await decrypt();
			}
			if (key.ctrlKey && key.key === 'f') {
				copyToClipboard();
			}
		}}
		placeholder="CTRL + D: Decrypt
CTRL + E: Encrypt
CTRL + F: Copy and clear"
	></textarea>

	<div class="my-4">
		<button onclick={encrypt}>Encrypt</button>
		<button onclick={decrypt}>Decrypt Message</button>
		<button onclick={copyToClipboard}>Copy</button>
	</div>
</div>

<button
	class="absolute bottom-0 w-full"
	onclick={() => {
		goto('/contacts');
	}}>Return</button
>
