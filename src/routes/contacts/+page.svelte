<script>
	import { goto } from '$app/navigation';
    import { getUsername } from '$lib/openpgp';

    /** @type {import('./$types').PageProps} */
    let { data } = $props();

</script>

<p class="text-6xl text-center">{getUsername()}</p>

<div class="flex items-center m-2">
    <p>Public Key: cf44f87d-4967-448b-93d6-17385f5714c5</p>
    <button class="bg-green-700 cursor-pointer p-1 ml-2 text-sm">Copy</button>
</div>

<p class="text-2xl">Contacts</p>
<div class="mx-8 my-2 overflow-auto h-72">
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