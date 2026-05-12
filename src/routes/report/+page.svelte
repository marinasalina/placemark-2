<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import PlaceMarkList from '$lib/ui/PlaceMarkList.svelte';

	subTitle.text = 'Placemark to date';
</script>

<Card title="PlaceMark">
	<PlaceMarkList />
</Card>
