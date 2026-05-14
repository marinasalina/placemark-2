<script lang="ts">
	import { onMount } from 'svelte';
	import { placemarkService } from '$lib/services/placemark-service';
	import type { Placemark } from '$lib/types/placemark-types';

	let placemarks = $state<Placemark[]>([]);

	onMount(async () => {
		placemarks = await placemarkService.getPlacemarks();
	});
</script>
<a class="button is-link mb-4" href="/PlaceMark">Back to Dashboard</a>
<h1 class="title">Placemark Report</h1>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Category</th>
			<th>Rating</th>
			<th>Latitude</th>
			<th>Longitude</th>
		</tr>
	</thead>

	<tbody>
		{#each placemarks as placemark}
			<tr>
				<td>{placemark.name}</td>
				<td>{placemark.description}</td>
				<td>{placemark.category}</td>
				<td>{placemark.rating}</td>
				<td>{placemark.lat}</td>
				<td>{placemark.lng}</td>
			</tr>
		{/each}
	</tbody>
</table>
