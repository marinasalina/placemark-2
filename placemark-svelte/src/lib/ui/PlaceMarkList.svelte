<script lang="ts">
	let {
		placemarks = [
			{
				name: 'Dublin',
				description: 'Capital city',
				category: 'City',
				rating: 'recommend',
				lat: 52.16129,
				lng: -7.5154
			},
			{
				name: 'Trinity College',
				description: 'Library',
				category: 'Library',
				rating: 'recommend',
				lat: 52.26129,
				lng: -7.23154
			}
		]
	} = $props();
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Category</th>
			<th>Rating</th>
			<th>Lat</th>
			<th>Lng</th>
		</tr>
	</thead>

	<tbody>
		{#each placemarks as p}
			<tr>
				<td>{p.name}</td>
				<td>{p.description}</td>
				<td>{p.category}</td>
				<td>{p.rating}</td>
				<td>{p.lat}</td>
				<td>{p.lng}</td>
			</tr>
		{/each}
	</tbody>
</table>
