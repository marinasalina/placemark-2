<script lang="ts">
	let { placemarks = [] } = $props();
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

	<tbody
		>//holds actual data rows
		{#each placemarks as p}//loops through the placemarks array and renders a table row for each
			placemark, displaying its properties in the corresponding columns. This allows users to see a
			list of all placemarks with their details in a tabular format.
			<tr
				>//Row for each placemark, displaying its properties in the corresponding columns. This
				allows users to see a list of all placemarks with their details in a tabular format.
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
