<script lang="ts">
	import Heading from '$lib/ui/Heading.svelte';
	import Menu from '$lib/ui/Menu.svelte';

	let { data, children } = $props();

	const publicPages = ['/', '/signup', '/login'];
</script>

<div class="container">
	{#if data.session && !publicPages.includes(data.url)}
		<Heading />
		<Menu {data} />
	{/if}

	{@render children()}
</div>
