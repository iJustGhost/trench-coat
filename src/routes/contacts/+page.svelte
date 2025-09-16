<script>
	import { goto } from '$app/navigation';
	import { armoredPublicKey, comment, email, username } from '$lib/openpgp';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	function copyPublicKey() {
		navigator.clipboard.writeText(armoredPublicKey);
	}
</script>

<div class="mx-4 my-4">
	<p class="mb-2 flex text-5xl">{username}</p>
	<div class="flex items-center justify-between">
		<div class="flex">
			<p>{email}</p>
			<p class="ml-2">({comment})</p>
		</div>
		<button class="ml-2 cursor-pointer bg-green-700 p-1 text-sm" onclick={copyPublicKey}
			>Copy Public Key</button
		>
	</div>
</div>

<p class="text-2xl ml-4">Contacts</p>
<div class="mx-8 my-2 h-72 overflow-auto">
	<div class="contact">
		<p class="username">Lorem ipsum</p>
		<p class="email">Lorem ipsum@mail.com</p>
	</div>
	<div class="contact">
		<p class="username">Lorem ipsum</p>
		<p class="email">Lorem ipsum@mail.com</p>
	</div>
	<div class="contact">
		<p class="username">Lorem ipsum</p>
		<p class="email">Lorem ipsum@mail.com</p>
	</div>
	<div class="contact">
		<p class="username">Lorem ipsum</p>
		<p class="email">Lorem ipsum@mail.com</p>
	</div>
	<div class="contact">
		<p class="username">Lorem ipsum</p>
		<p class="email">Lorem ipsum@mail.com</p>
	</div>
	<div class="contact">
		<p class="username">Lorem ipsum</p>
		<p class="email">Lorem ipsum@mail.com</p>
	</div>
	<div class="contact">
		<p class="username">Lorem ipsum</p>
		<p class="email">Lorem ipsum@mail.com</p>
	</div>
	<div class="contact">
		<p class="username">Lorem ipsum</p>
		<p class="email">Lorem ipsum@mail.com</p>
	</div>
</div>
