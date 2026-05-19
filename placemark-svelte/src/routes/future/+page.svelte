<script lang="ts">
	import { subTitle } from '$lib/services/runes.svelte';

	let { data } = $props();

	subTitle.text = 'Trends and Projections';

	const placemarks = data.placemarks || [];

	const counts = placemarks.reduce((totals, placemark) => {
		const category = placemark.category || 'Other';
		totals[category] = (totals[category] || 0) + 1;
		return totals;
	}, {});

	const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
	const topTrend = sorted[0];

	const visitedPlaces = placemarks.length;

	let newPlace = $state('');

	let futurePlaces = $state([]);

	function addFuturePlace() {
		if (newPlace.trim()) {
			futurePlaces.push(newPlace.trim());
			newPlace = '';
		}
	}
</script>

<h1 class="title">Analytics: Trends & Projections</h1>

<div class="box">
	<h2 class="title is-4">Trend Analysis</h2>

	{#if topTrend}
		<p>
			Most saved category:
			<strong>{topTrend[0]}</strong>
			({topTrend[1]} placemarks)
		</p>

		<p>This suggests a strong interest in {topTrend[0]} destinations.</p>
	{:else}
		<p>No placemark data yet.</p>
	{/if}
</div>

<div class="box">
	<h2 class="title is-4">Category Breakdown</h2>

	<table class="table is-fullwidth">
		<thead>
			<tr>
				<th>Category</th>
				<th>Saved Placemarks</th>
			</tr>
		</thead>

		<tbody>
			{#each sorted as [category, count]}
				<tr>
					<td>{category}</td>
					<td>{count}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="box">
	<h2 class="title is-4">Future Travel Wishlist</h2>

	<div class="field has-addons">
		<div class="control is-expanded">
			<input
				class="input"
				type="text"
				placeholder="Add destination, e.g. London - Tower Bridge"
				bind:value={newPlace}
			/>
		</div>

		<div class="control">
			<button class="button is-link" type="button" on:click={addFuturePlace}>Add</button>
		</div>
	</div>

	<ul>
		{#each futurePlaces as place}
			<li>✈️ {place}</li>
		{/each}
	</ul>
</div>

<div class="box">
	<h2 class="title is-4">Projection</h2>

	<p>You have saved <strong>{visitedPlaces}</strong> placemarks so far.</p>

	{#if topTrend}
		<p>
			Based on your current saved placemarks, your future travel plans may focus more on
			<strong>{topTrend[0]}</strong> destinations.
		</p>
	{/if}
</div>
