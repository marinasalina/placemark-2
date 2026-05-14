<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';
	import { placemarkService } from '$lib/services/placemark-service';

	let chartDiv: HTMLDivElement;
	let chart: echarts.ECharts | null = null;

	onMount(async () => {
		try {
			// Wait a bit for DOM to be fully ready
			await new Promise(resolve => setTimeout(resolve, 100));

			const placemarks = await placemarkService.getPlacemarks();

			const categories = ['City', 'Monument', 'Library'];

			const data = categories.map((category) => {
				return placemarks.filter((placemark) => placemark.category === category).length;
			});

			if (!chartDiv) {
				console.error('Chart div not found');
				return;
			}

			chart = echarts.init(chartDiv);

			chart.setOption({
				title: {
					text: 'Placemarks by Category'
				},
				tooltip: {},
				xAxis: {
					type: 'category',
					data: categories
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: 'Placemarks',
						type: 'bar',
						data
					}
				]
			});

			const handleResize = () => {
				if (chart) chart.resize();
			};

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
				chart?.dispose();
			};
		} catch (error) {
			console.error('Chart error:', error);
		}
	});
</script>

<h1 class="title">Placemark Chart</h1>

<div class="chart-container" bind:this={chartDiv}></div>

<style>
	.chart-container {
		width: 100%;
		height: 500px;
		min-height: 500px;
	}
</style>