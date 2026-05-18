<script lang="ts">
	import { subTitle } from '$lib/services/runes.svelte';

	subTitle.text = 'Future Travel Plans';

	let futurePlaces = [
		'Paris - Louvre Museum',
		'Rome - Vatican Museums',
		'Athens - Acropolis',
		'Barcelona - Sagrada Familia'
	];
</script>

<h1 class="title">Travel Trends & Future Plans</h1>

<div class="box">
	<h2 class="title is-4">My Travel Trend</h2>
	<p>
		I am mostly interested in cultural places, museums, historic monuments, and city experiences.
	</p>
</div>

<div class="box">
	<h2 class="title is-4">Future Travel Wishlist</h2>

	<ul>
		{#each futurePlaces as place}
			<li>✈️ {place}</li>
		{/each}
	</ul>
</div>

<div class="box">
	<h2 class="title is-4">Projection</h2>
	<p>
		Based on my saved placemarks, my future travel plans focus on historical and cultural
		destinations.
	</p>
</div>
