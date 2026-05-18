<script lang="ts">
	import { subTitle } from '$lib/services/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import PlaceMarkForm from './PlaceMarkForm.svelte';

	let { form } = $props();

	subTitle.text = 'Create a Placemark';
</script>

<Card title="Add a Placemark">
	{#if form?.message}
		<p class="has-text-danger">{form.message}</p>
	{/if}

	<PlaceMarkForm />
</Card>
