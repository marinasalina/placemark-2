<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		await fetch('/api/logout', { method: 'POST' });
		goto('/login');
	});
</script>

<p>Logging out...</p>
