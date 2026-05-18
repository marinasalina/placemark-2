<script lang="ts">
	import { onMount } from 'svelte';
	import { signOut } from '@auth/sveltekit/client';

	onMount(() => {
		signOut({ callbackUrl: '/signup' });
	});
</script>

<p>Logging out...</p>
