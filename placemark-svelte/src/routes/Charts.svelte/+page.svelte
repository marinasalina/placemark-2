<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';
	import { placemarkService } from '$lib/services/placemark-service';

	let chartDiv: HTMLDivElement;

	onMount(async () => {
		const placemarks = await placemarkService.getPlacemarks();

		const categories = ['City', 'Monument', 'Library'];

		const data = categories.map((category) => {
			return placemarks.filter((placemark) => placemark.category === category).length;
		});

		const chart = echarts.init(chartDiv);

		chart.setOption({
			title: {
				text: 'Placemarks by Category'
			},
			tooltip: {},
			xAxis: {
				data: categories
			},
			yAxis: {},
			series: [
				{
					name: 'Placemarks',
					type: 'bar',
					data
				}
			]
		});

		window.addEventListener('resize', () => chart.resize());
	});
</script>

<h1 class="title">Placemark Chart</h1>

<div bind:this={chartDiv}></div>

<style>
	div {
		width: 100%;
		height: 400px;
	}
</style>