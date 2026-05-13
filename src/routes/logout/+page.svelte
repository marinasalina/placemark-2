<script lang="ts">
	import { goto } from '$app/navigation';
	import { loggedInUser } from '$lib/services/runes.svelte';

	loggedInUser.email = '';
	loggedInUser.name = '';
	loggedInUser.token = '';
	loggedInUser._id = '';
	goto('/');
</script>
