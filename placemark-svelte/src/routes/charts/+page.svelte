<script lang="ts">
	import { onMount } from 'svelte';
	import * as echarts from 'echarts';
	import { subTitle } from '$lib/services/runes.svelte';
	import { placemarkService } from '$lib/services/placemark-service';
	import type { Placemark } from '$lib/types/placemark-types';

	subTitle.text = 'Charts';

	let barDiv: HTMLDivElement;
	let pieDiv: HTMLDivElement;
	let lineDiv: HTMLDivElement;

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

			const barChart = echarts.init(barDiv);
			barChart.setOption({
				title: { text: 'Placemarks by Category' },
				tooltip: {},
				xAxis: { type: 'category', data: categoryLabels },
				yAxis: { type: 'value' },
				series: [{ type: 'bar', data: categoryValues }]
			});

			const pieChart = echarts.init(pieDiv);
			pieChart.setOption({
				title: { text: 'Category Distribution' },
				tooltip: { trigger: 'item' },
				series: [
					{
						type: 'pie',
						data: categoryLabels.map((label, index) => ({
							name: label,
							value: categoryValues[index]
						}))
					}
				]
			});

			const lineChart = echarts.init(lineDiv);
			lineChart.setOption({
				title: { text: 'Placemarks Added Over Time' },
				tooltip: {},
				xAxis: { type: 'category', data: dateLabels },
				yAxis: { type: 'value' },
				series: [{ type: 'line', data: dateValues }]
			});

			return () => {
				barChart.dispose();
				pieChart.dispose();
				lineChart.dispose();
			};
		}

		loadCharts();
	});
</script>

<div class="columns is-multiline">
	<div class="column is-half box">
		<div bind:this={barDiv} style="height: 400px;"></div>
	</div>

	<div class="column is-half box">
		<div bind:this={pieDiv} style="height: 400px;"></div>
	</div>

	<div class="column is-full box">
		<div bind:this={lineDiv} style="height: 400px;"></div>
	</div>
</div>
