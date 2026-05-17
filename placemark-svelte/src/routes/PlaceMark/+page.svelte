<script lang="ts">
	import { goto } from '$app/navigation';
	import { subTitle } from '$lib/services/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import PlaceMarkForm from './PlaceMarkForm.svelte';
	import type { Placemark } from '$lib/types/placemark-types';

	let { data } = $props();

	$effect(() => {
		if (!data.session) {
			goto('/signup');
		}
	});

	subTitle.text = 'Create a Placemark';

	let placemarks = $state<Placemark[]>(data.placemarks);
</script>

{#if data.session}
	<Card title="Add a Placemark">
		<PlaceMarkForm {placemarks} />
	</Card>
{/if}
