<script lang="ts">
	import { subTitle } from '$lib/services/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import PlaceMarkForm from './PlaceMarkForm.svelte';
	import type { Placemark } from '$lib/types/placemark-types';

	subTitle.text = 'Create a Placemark';

	let { data } = $props();

	let placemarks = $state<Placemark[]>(data.placemarks);
</script>

<Card title="Add a Placemark">
	<PlaceMarkForm {placemarks} />
</Card>
