<script lang="ts">
	import Coordinates from '$lib/ui/Coordinates.svelte';

	let PlaceMarkName = $state('');
	let PlaceMarkDescription = $state('');
	let selectedCategory = $state('City');
	let selectedMethod = $state('recommend');
	let lat = $state(0);
	let lng = $state(0);
</script>

<form method="POST" enctype="multipart/form-data">
	<div class="field">
		<label class="label" for="placemark-name">Enter Placemark name:</label>
		<input id="placemark-name" class="input" bind:value={PlaceMarkName} type="text" name="name" />
	</div>

	<div class="field">
		<label class="label" for="placemark-description">Enter Placemark description:</label>
		<input
			id="placemark-description"
			class="input"
			bind:value={PlaceMarkDescription}
			type="text"
			name="description"
		/>
	</div>

	<div class="field">
		<label class="label">Select Rating:</label>
		<label class="radio">
			<input type="radio" bind:group={selectedMethod} value="recommend" name="rating" />
			Recommend
		</label>
		<label class="radio">
			<input type="radio" bind:group={selectedMethod} value="do not recommend" name="rating" />
			Do not recommend
		</label>
	</div>

	<div class="field">
		<label class="label" for="category">Select Category:</label>
		<select id="category" bind:value={selectedCategory} name="category">
			<option>City</option>
			<option>Monument</option>
			<option>Library</option>
			<option>Park</option>
			<option>Museum</option>
			<option>Experience</option>
			<option>Bridge</option>
		</select>
	</div>

	<Coordinates bind:lat bind:lng />

	<input type="hidden" name="lat" value={lat} />
	<input type="hidden" name="lng" value={lng} />

	<div class="field">
		<label class="label" for="images">Upload images:</label>
		<input id="images" class="input" type="file" name="images" multiple accept="image/*" />
	</div>

	<button class="button is-success is-fullwidth">Add Placemark</button>
</form>
