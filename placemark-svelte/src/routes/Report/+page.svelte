<script lang="ts">
	import { subTitle } from '$lib/services/runes.svelte';

	let { data } = $props();

	subTitle.text = 'Placemark Report';
</script>

<h1 class="title">Placemark Report</h1>

{#each data.placemarks as placemark}
	<div class="box">
		<h2 class="title is-4">{placemark.name}</h2>

		<p>{placemark.description}</p>
		<p><strong>Category:</strong> {placemark.category}</p>
		<p><strong>Rating:</strong> {placemark.rating}</p>
		<p><strong>Lat:</strong> {placemark.lat}</p>
		<p><strong>Lng:</strong> {placemark.lng}</p>

		{#if placemark.images && placemark.images.length > 0}
			<div class="columns is-multiline mt-3">
				{#each placemark.images as image, index}
					<div class="column is-one-quarter">
						<img
							src={image.url}
							alt={placemark.name}
							style="width: 100%; height: 150px; object-fit: cover;"
						/>

						<form method="POST" action="/Report?/deleteImage">
							<input type="hidden" name="placemarkId" value={placemark._id} />
							<input type="hidden" name="imageIndex" value={index} />
							<button type="submit" class="button is-danger is-small mt-2"> Delete image </button>
						</form>
					</div>
				{/each}
			</div>
		{:else}
			<p>No uploaded images</p>
		{/if}
	</div>
{/each}
