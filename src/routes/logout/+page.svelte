<script lang="ts">
	import { goto } from '$app/navigation';
	import { loggedInUser } from '$lib/runes.svelte';
	import { resolve } from '$app/paths';

	loggedInUser.email = '';
	goto(resolve('/'));
</script>
