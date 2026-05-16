<script lang="ts">
	import { onMount } from 'svelte';
	import { subTitle } from '$lib/services/runes.svelte';
	import { placemarkService } from '$lib/services/placemark-service';
	import type { Placemark } from '$lib/types/placemark-types';
	import Chart from 'chart.js/auto';

	subTitle.text = 'Charts';

	let barCanvas: HTMLCanvasElement;
	let pieCanvas: HTMLCanvasElement;
	let lineCanvas: HTMLCanvasElement;

	let barChart: Chart;
	let pieChart: Chart;
	let lineChart: Chart;

	onMount(() => {
		async function loadCharts() {
			const placemarks: Placemark[] = await placemarkService.getPlacemarks();

			const categoryCounts: Record<string, number> = {};
			const dateCounts: Record<string, number> = {};

			for (const placemark of placemarks) {
				const category = placemark.category || 'Unknown';
				categoryCounts[category] = (categoryCounts[category] || 0) + 1;

				const date = placemark.createdAt
					? new Date(placemark.createdAt).toLocaleDateString()
					: 'Unknown';

				dateCounts[date] = (dateCounts[date] || 0) + 1;
			}

			const categoryLabels = Object.keys(categoryCounts);
			const categoryValues = Object.values(categoryCounts);

			const dateLabels = Object.keys(dateCounts);
			const dateValues = Object.values(dateCounts);

			barChart = new Chart(barCanvas, {
				type: 'bar',
				data: {
					labels: categoryLabels,
					datasets: [
						{
							label: 'Placemarks by Category',
							data: categoryValues
						}
					]
				}
			});

			pieChart = new Chart(pieCanvas, {
				type: 'pie',
				data: {
					labels: categoryLabels,
					datasets: [
						{
							data: categoryValues
						}
					]
				}
			});

			lineChart = new Chart(lineCanvas, {
				type: 'line',
				data: {
					labels: dateLabels,
					datasets: [
						{
							label: 'Placemarks Added Over Time',
							data: dateValues
						}
					]
				}
			});
		}

		loadCharts();

		return () => {
			barChart?.destroy();
			pieChart?.destroy();
			lineChart?.destroy();
		};
	});
</script>

<div class="columns is-multiline">
	<div class="column is-half box">
		<h1 class="title is-5">Placemarks by Category</h1>
		<canvas bind:this={barCanvas}></canvas>
	</div>

	<div class="column is-half box">
		<h1 class="title is-5">Category Distribution</h1>
		<canvas bind:this={pieCanvas}></canvas>
	</div>

	<div class="column is-full box">
		<h1 class="title is-5">Placemarks Added Over Time</h1>
		<canvas bind:this={lineCanvas}></canvas>
	</div>
</div>
