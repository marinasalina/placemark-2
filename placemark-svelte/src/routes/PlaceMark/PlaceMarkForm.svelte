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
	let selectedFiles = $state<FileList | null>(null);

	async function uploadImages(): Promise<string[]> {
		if (!selectedFiles || selectedFiles.length === 0) {
			return [];
		}

		const formData = new FormData();

		for (const file of selectedFiles) {
			formData.append('images', file);
		}

		const response = await fetch('/images', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();

		return result.images || [];
	}

	async function addPlacemark() {
		const images = await uploadImages();

		const placemark = {
			name: PlaceMarkName,
			description: PlaceMarkDescription,
			category: selectedCategory,
			rating: selectedMethod,
			lat,
			lng,
			images,
			createdAt: new Date().toISOString()
		};

		const success = await placemarkService.addPlacemark(placemark);

		if (success) {
			placemarks.push(placemark);
			PlaceMarkName = '';
			PlaceMarkDescription = '';
			selectedCategory = 'City';
			selectedMethod = 'recommend';
			selectedFiles = null;
			lat = 0;
			lng = 0;
		}
	}
</script>

<div>
	<div class="field">
		<label class="label" for="placemark-name">Enter Placemark name:</label>
		<input id="placemark-name" class="input" bind:value={PlaceMarkName} type="text" />
	</div>

	<div class="field">
		<label class="label" for="placemark-description">Enter Placemark description:</label>
		<input id="placemark-description" class="input" bind:value={PlaceMarkDescription} type="text" />
	</div>

	<div class="field">
		<label class="label">Select Rating:</label>
		<label class="radio">
			<input type="radio" bind:group={selectedMethod} value="recommend" />
			Recommend
		</label>
		<label class="radio">
			<input type="radio" bind:group={selectedMethod} value="do not recommend" />
			Do not recommend
		</label>
	</div>

	<div class="field">
		<label class="label" for="category">Select Category:</label>
		<select id="category" bind:value={selectedCategory}>
			<option>City</option>
			<option>Monument</option>
			<option>Library</option>
		</select>
	</div>

	<div class="field">
		<label class="label" for="images">Upload Images:</label>
		<input
			id="images"
			class="input"
			type="file"
			multiple
			accept="image/*"
			onchange={(event) => {
				selectedFiles = event.currentTarget.files;
			}}
		/>
	</div>

	<Coordinates bind:lat bind:lng />

	<button class="button is-success is-fullwidth" onclick={addPlacemark}>Add Placemark</button>
</div>
