<script lang="ts">
	//reusable UI container, used to wrap each map in a styled box
	import Card from '$lib/ui/Card.svelte';
	//actual map component
	import LeafletMap from '$lib/ui/leafletMap.svelte';
	//TypeScript defenition for placemark object
	import type { Placemark } from '$lib/types/placemark-types';
	import { subTitle } from '$lib/services/runes.svelte';

	let { data } = $props();
	subTitle.text = 'Map';
	let placemarks = $derived<Placemark[]>(data.placemarks || []);

	const categories = $derived(
		Array.from(new Set(placemarks.map((placemark) => placemark.category || 'Other')))
	);
</script>

<!-- Multiple maps, one for each category, and one with all placemarks -->
<Card title="All Placemarks">
	<LeafletMap height={45} {placemarks} />
</Card>
<!-- 1 separate map for each category -->
{#each categories as category}
	<Card title={`${category} Map`}>
		<LeafletMap
			height={35}
			placemarks={placemarks.filter((placemark) => (placemark.category || 'Other') === category)}
		/>
	</Card>
{/each}
