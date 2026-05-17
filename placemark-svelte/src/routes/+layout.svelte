<script lang="ts">
	import Heading from '$lib/ui/Heading.svelte';
	import Menu from '$lib/ui/Menu.svelte';

	let { data, children } = $props();
</script>

<div class="container">
	<Heading />
	<Menu {data} />

	{@render children()}
</div>
