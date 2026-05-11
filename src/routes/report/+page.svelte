<script lang="ts">
	import { subTitle } from '$lib/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import PlaceMarkList from '$lib/ui/PlaceMarkist.svelte';

	subTitle.text = 'Placemark to date';
</script>

<Card title="PlaceMark">
	<PlaceMarkList />
</Card>
