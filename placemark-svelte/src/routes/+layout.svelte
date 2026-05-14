<script lang="ts">
	import { loggedInUser } from '$lib/services/runes.svelte';
	import Heading from '$lib/ui/Heading.svelte';
	import Menu from '$lib/ui/Menu.svelte';
	import { placemarkService } from "$lib/services/placemark-service";
	
</script>

<div class="container">
	{#if loggedInUser && loggedInUser.email}
		<Menu />
		<Heading />
	{/if}
	<slot />
</div>
