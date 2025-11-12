<script>
	import { goto } from '$app/navigation';
	import { armoredPublicKey, comment, email, getContactsList, username } from '$lib/openpgp';
	import Icon from '@iconify/svelte';
	import { BaseDirectory, remove } from '@tauri-apps/plugin-fs';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	var searchString = $state('');
	var contacts = [];
	var results = $state('');

	onMount(async () => {
		if (!armoredPublicKey) {
			goto('/');
			return;
		}
		contacts = await getContactsList();
		results = contacts;
	});

	function searchContacts() {
		results = [];

		contacts.forEach((contact) => {
			if (
				contact.name.toLowerCase().includes(searchString.toLowerCase()) ||
				contact.email.toLowerCase().includes(searchString.toLowerCase())
			) {
				results.push(contact); // append to results if match found
			}
		});
	}

	function addNewContact() {
		goto('/contacts/add');
	}
</script>

<div class="mx-4 my-4 flex items-center justify-between">
	<div>
		<p class="mb-2 flex text-4xl">{username}</p>
		<p>{email}</p>
		<p>({comment.length > 25 ? comment.slice(0, 25) + '...' : comment})</p>
	</div>
	<p class="text-3xl">
		<span class="text-green-700">Contacts</span> List
	</p>
</div>

<div class="flex w-full items-center justify-evenly">
	<button class="button" onclick={addNewContact}>
		<Icon icon="material-symbols:add" class="h-full w-full" />
	</button>

	<input
		class="text-2xl"
		type="text"
		name="search"
		placeholder="Search"
		bind:value={searchString}
		oninput={searchContacts}
	/>
</div>

<div class="mx-8 my-2 h-72 overflow-auto">
	{#each results as result}
		<div class="flex w-full items-center justify-between">
			<a
				href="#none"
				class="contact flex w-full items-center justify-between"
				onclick={() => {
					goto(
						`/contacts/message?name=${result.name}&email=${result.email}&comment=${result.comment}&filename=${result.filename}`
					);
				}}
			>
				<div>
					<p>{result.name} ({result.email})</p>
					<p>{result.comment}</p>
				</div>
			</a>
			<Icon
				icon="material-symbols:delete-outline"
				class="cursor-pointer text-5xl text-red-800 hover:text-red-400"
				onclick={async () => {
					await remove('contacts/' + result.filename, { baseDir: BaseDirectory.AppConfig });
					contacts = await getContactsList();
					results = contacts;
				}}
			/>
		</div>
	{/each}
</div>
