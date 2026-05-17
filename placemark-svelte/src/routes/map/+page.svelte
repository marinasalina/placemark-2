<script lang="ts">
	import Card from '$lib/ui/Card.svelte';
	import LeafletMap from '$lib/ui/leafletMap.svelte';
	import type { Placemark } from '$lib/types/placemark-types';

	let { data } = $props();

	let placemarks = $derived<Placemark[]>(data.placemarks || []);

	const categories = $derived(
		Array.from(new Set(placemarks.map((placemark) => placemark.category || 'Other')))
	);
</script>

<Card title="All Placemarks">
	<LeafletMap height={45} {placemarks} />
</Card>

{#each categories as category}
	<Card title={`${category} Map`}>
		<LeafletMap
			height={35}
			placemarks={placemarks.filter((placemark) => (placemark.category || 'Other') === category)}
		/>
	</Card>
{/each}
