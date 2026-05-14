<script lang="ts">
	import Coordinates from '$lib/ui/Coordinates.svelte';
	import { placemarkService } from '$lib/services/placemark-service';

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

<div>
	<div class="field">
		<label class="label">Enter Placemark name:</label>
		<input class="input" bind:value={PlaceMarkName} type="text" />
	</div>

	<div class="field">
		<label class="label">Enter Placemark description:</label>
		<input class="input" bind:value={PlaceMarkDescription} type="text" />
	</div>

	<div class="field">
		<label class="label">Select Rating:</label>
		<input type="radio" bind:group={selectedMethod} value="recommend" /> Recommend
		<input type="radio" bind:group={selectedMethod} value="do not recommend" /> Do not recommend
	</div>

	<div class="field">
		<label class="label">Select Category:</label>
		<select bind:value={selectedCategory}>
			<option>City</option>
			<option>Monument</option>
			<option>Library</option>
		</select>
	</div>

	<Coordinates bind:lat bind:lng />

	<button class="button is-success is-fullwidth" onclick={addPlacemark}>
		Add Placemark
	</button>
</div>