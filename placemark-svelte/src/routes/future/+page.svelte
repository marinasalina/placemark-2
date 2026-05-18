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

	const totalPlacemarks = placemarks.length;
	const projectedNextGoal = totalPlacemarks + 5;

	let futurePlaces = [
		'Paris - Louvre Museum',
		'Rome - Vatican Museums',
		'Athens - Acropolis',
		'Barcelona - Sagrada Familia'
	];
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

		<p>
			This suggests a strong interest in {topTrend[0]} destinations.
		</p>
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

	<ul>
		{#each futurePlaces as place}
			<li>{place}</li>
		{/each}
	</ul>
</div>

<div class="box">
	<h2 class="title is-4">Projection</h2>

	<p>
		You currently have <strong>{totalPlacemarks}</strong> saved placemarks. A simple future goal is
		to reach <strong>{projectedNextGoal}</strong> placemarks.
	</p>

	{#if topTrend}
		<p>
			Based on your current trend, your future travel plans may focus more on
			<strong>{topTrend[0]}</strong> destinations.
		</p>
	{/if}
</div>
