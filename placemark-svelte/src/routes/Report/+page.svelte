<script lang="ts">
	import { subTitle } from '$lib/services/runes.svelte';

	let { data, form } = $props();
	console.log('Report page data:', data);

	subTitle.text = 'Placemark Report';
</script>

<h1 class="title">Placemark Report</h1>

{#if form?.message}
	<p class="notification is-danger">{form.message}</p>
{/if}

{#each data.placemarks as placemark}
	<div class="box">
		<h2 class="title is-4">{placemark.name}</h2>

		<p>{placemark.description}</p>
		<p><strong>Category:</strong> {placemark.category}</p>
		<p><strong>Rating:</strong> {placemark.rating}</p>
		<p><strong>Lat:</strong> {placemark.lat}</p>
		<p><strong>Lng:</strong> {placemark.lng}</p>

		<form method="POST" action="/Report?/addImage" enctype="multipart/form-data" class="mt-4">
			<input type="hidden" name="placemarkId" value={placemark._id} />

			<div class="field">
				<label class="label" for={`images-${placemark._id}`}> Add images to this placemark </label>

				<input
					id={`images-${placemark._id}`}
					class="input"
					type="file"
					name="images"
					multiple
					accept="image/*"
				/>
			</div>

			<button type="submit" class="button is-link is-small"> Upload images </button>
		</form>

		{#if placemark.images && placemark.images.length > 0}
			<div class="columns is-multiline mt-3">
				{#each placemark.images as image, index}
					<div class="column is-one-quarter">
						<img
							src={image.url}
							alt={placemark.name}
							style="width:100%; height:150px; object-fit:cover;"
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
			<p class="mt-3">No uploaded images</p>
		{/if}
	</div>
{/each}
