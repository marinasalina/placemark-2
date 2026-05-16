<script lang="ts">
	import Heading from '$lib/ui/Heading.svelte';
	import Menu from '$lib/ui/Menu.svelte';

	let { children } = $props();
</script>

<div class="container">
	<Heading />
	<Menu />

	{@render children()}
</div>
