<script lang="ts">
	import { goto } from '$app/navigation';
	import { loggedInUser } from '$lib/services/runes.svelte';
	import { resolve } from '$app/paths';

	loggedInUser.email = '';
	goto(resolve('/'));
</script>
