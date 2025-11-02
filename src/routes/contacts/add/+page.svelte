<script>
	import { goto } from '$app/navigation';
	import { armoredPublicKey, verifyContactKey } from '$lib/openpgp';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	var contactPublicKey = $state('');
	var feedbackStatus = $state('hidden mt-12 text-center text-1xl');
	var contactName = $state('');

	function copyPublicKey() {
		navigator.clipboard.writeText(btoa(armoredPublicKey));
	}

	async function addContactKey() {
		if (atob(contactPublicKey) === armoredPublicKey) {
			return;
		}

		var verifiedStatus = await verifyContactKey(contactPublicKey);
		if (verifiedStatus === 'invalid') {
			return;
		}

		feedbackStatus = 'mt-12 text-center text-1xl';
		contactName = verifiedStatus;
	}

	onMount(() => {
		if (!armoredPublicKey) {
			goto('/');
		}
	});
</script>

<p class="mt-8 text-center text-5xl">
	<span class="text-green-700">Add</span> Contact
</p>
<div class="mt-8 flex justify-around">
	<p class="w-1/2 text-sm">
		<span>
			Copy your <span class="text-green-700">public key</span> and send it to your
			<span class="text-green-700">contact</span>, copy theirs and paste it at the bottom.
		</span>
	</p>
	<button class="button flex items-center" onclick={copyPublicKey}>
		<Icon icon="material-symbols:content-copy-outline" class="h-full w-6" />
		Copy Public Key
	</button>
</div>

<div class="mt-12 flex flex-col items-center justify-around">
	<input
		class="w-md text-2xl"
		type="text"
		placeholder="Contact's public key"
		bind:value={contactPublicKey}
	/>
	<div class="mt-4">
		<input type="button" value="Add" onclick={addContactKey} />
		<input
			type="button"
			value="Back"
			onclick={() => {
				goto('/contacts');
			}}
		/>
	</div>
	<p class={feedbackStatus}>
		<span class="text-green-700">Added</span>
		{contactName}
	</p>
</div>
