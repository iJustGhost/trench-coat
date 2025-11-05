<script>
	import { goto } from '$app/navigation';
    const params = new URLSearchParams(window.location.search);
    
</script>

<p>{params.get('name')}</p>
<p>{params.get('email')}</p>
<p>{params.get('filename')}</p>

<button onclick={() => {
    goto('/contacts')
}}>Return</button>