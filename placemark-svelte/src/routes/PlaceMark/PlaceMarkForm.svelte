<script lang="ts">
	import Coordinates from '$lib/ui/Coordinates.svelte';
	import { placemarkService } from '$lib/services/PlaceMark-service';

	let { placemarks } = $props();

	let PlaceMarkName = $state('');
	let PlaceMarkDescription = $state('');
	let selectedCategory = $state('City');
	let selectedMethod = $state('recommend');
	let lat = $state(0);
	let lng = $state(0);

	async function addPlacemark() {
		const placemark = {
			name: PlaceMarkName,
			description: PlaceMarkDescription,
			category: selectedCategory,
			rating: selectedMethod,
			lat,
			lng
		};

		const success = await placemarkService.addPlacemark(placemark);

		if (success) {
			placemarks.push(placemark);
			PlaceMarkName = '';
			PlaceMarkDescription = '';
			lat = 0;
			lng = 0;
		}
	}
</script>