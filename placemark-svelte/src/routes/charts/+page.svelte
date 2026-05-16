<script lang="ts">
	import { onMount } from 'svelte';
	import { subTitle } from '$lib/services/runes.svelte';
	import { placemarkService } from '$lib/services/placemark-service';
	import type { Placemark } from '$lib/types/placemark-types';
	import Chart from 'chart.js/auto';

	subTitle.text = 'Charts';

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	onMount(() => {
		async function loadChart() {
			const placemarks: Placemark[] = await placemarkService.getPlacemarks();

			const categoryCounts: Record<string, number> = {};

			for (const placemark of placemarks) {
				const category = placemark.category || 'Unknown';
				categoryCounts[category] = (categoryCounts[category] || 0) + 1;
			}

			chart = new Chart(canvas, {
				type: 'bar',
				data: {
					labels: Object.keys(categoryCounts),
					datasets: [
						{
							label: 'Placemarks by Category',
							data: Object.values(categoryCounts)
						}
					]
				}
			});
		}

		loadChart();

		return () => {
			chart?.destroy();
		};
	});
</script>

<div class="columns">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemarks by Category</h1>
		<canvas bind:this={canvas}></canvas>
	</div>
</div>
