<script lang="ts">
	import Heading from '$lib/ui/Heading.svelte';
	import Menu from '$lib/ui/Menu.svelte';
</script>

<div class="container">
	<Menu />
	<Heading />
	<slot />
</div>