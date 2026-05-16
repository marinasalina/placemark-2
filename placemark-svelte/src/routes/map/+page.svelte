<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/ui/Card.svelte';
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import { placemarkService } from '$lib/services/placemark-service';

	let map: LeafletMap;

	onMount(async () => {
		const placemarks = await placemarkService.getPlacemarks();
		console.log('PLACEMARKS:', placemarks);
		for (const placemark of placemarks) {
			console.log('PLACEMARK:', placemark);

			if (placemark.lat !== undefined && placemark.lng !== undefined) {
				map.addMarker(
					placemark.lat,
					placemark.lng,
					placemark.name,
					placemark.category,
					placemark.description
				);
			}
		}
	});
</script>

<Card title="Placemark Map">
	<LeafletMap height={60} bind:this={map} />
</Card>
