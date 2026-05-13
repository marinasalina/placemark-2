<script lang="ts">
	import { loggedInUser, subTitle } from '$lib/services/runes.svelte';
	import { placemarkService } from '$lib/services/PlaceMark-service';
	import Card from '$lib/ui/Card.svelte';
	import { onMount } from 'svelte';
	import PlaceMarkForm from './PlaceMarkForm.svelte';
	import type { Placemark } from '$lib/types/placemark-types';

	subTitle.text = 'Create a Placemark';

	let placemarks: Placemark[] = [];

	onMount(async () => {
		// Load existing placemarks for this user
		placemarks = await placemarkService.getPlacemarks();
	});
</script>

<Card title="Add a Placemark">
	<PlaceMarkForm {placemarks} />
</Card>
