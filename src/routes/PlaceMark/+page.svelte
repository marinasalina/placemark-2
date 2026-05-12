<script lang="ts">
	import { subTitle } from '$lib/services/runes.svelte';
	import Card from '$lib/ui/Card.svelte';
	import PlaceMarkForm from './PlaceMarkForm.svelte';

	subTitle.text = "Let's start your adventure here!";
</script>

<PlaceMarkForm />
