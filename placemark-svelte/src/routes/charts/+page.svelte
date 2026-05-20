<script lang="ts">
//runs code after component is rendered in the browser
	import { onMount } from 'svelte';
	import * as echarts from 'echarts';
	//shared subtatle state used across the application
	import { subTitle } from '$lib/services/runes.svelte';
//receive data passed from the server-side load function, which includes the list of placemarks to be visualized in the charts
	let { data } = $props();
//set page subtitle
	subTitle.text = 'Charts';
//References to HTML div containers where charts will be rendered
	let barDiv: HTMLDivElement;
	let pieDiv: HTMLDivElement;
	let lineDiv: HTMLDivElement;
//Run once when component is mounted in browser
	onMount(() => {
		//Get placemark data from server-side load function
		const placemarks = data.placemarks;
//store counts by category and by date for the charts
		const categoryCounts: Record<string, number> = {};
		//store dates by creation date
		const dateCounts: Record<string, number> = {};
//loop through all placemarks
		for (const placemark of placemarks) {
			//Use category of placemark or 'Unknown' if not specified, and count how many placemarks fall into each category. This data will be used to create the bar and pie charts that show the distribution of placemarks by category.
			const category = placemark.category || 'Unknown';
			//increment category count for this placemark's category, initializing to 0 if it doesn't exist yet. This allows us to keep track of how many placemarks belong to each category, which is essential for generating the charts that visualize the distribution of placemarks across different categories.
			categoryCounts[category] = (categoryCounts[category] || 0) + 1;
//Format creation date of placemark as a human-readable string (e.g., 'MM/DD/YYYY'). If the creation date is not available, use 'Unknown'. This formatted date will be used to count how many placemarks were created on each date, which is essential for generating the line chart that shows the trend of placemark creation over time.
			const date = placemark.createdAt
				? new Date(placemark.createdAt).toLocaleDateString()
				: 'Unknown';
//increment date counter
			dateCounts[date] = (dateCounts[date] || 0) + 1;
		}
//extract category and split object into array
		const categoryLabels = Object.keys(categoryCounts);
		//extract categories values
		const categoryValues = Object.values(categoryCounts);
//Extract dates for line chart labels
		const dateLabels = Object.keys(dateCounts);
		//Total per date
		const dateValues = Object.values(dateCounts);
//Create bar chart inside barDiv container using ECharts library, with category labels on the x-axis and category values on the y-axis. The chart will have a title and tooltips enabled for better visualization of the distribution of placemarks by category.
		const barChart = echarts.init(barDiv);
		barChart.setOption({
			title: { text: 'Placemarks by Category' },
			tooltip: {},
			xAxis: { type: 'category', data: categoryLabels },
			yAxis: { type: 'value' },
			series: [{ type: 'bar', data: categoryValues }]
		});
//Pie chirt
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
//line chart
		const lineChart = echarts.init(lineDiv);
		lineChart.setOption({
			title: { text: 'Placemarks Added Over Time' },
			tooltip: {},
			xAxis: { type: 'category', data: dateLabels },
			yAxis: { type: 'value' },
			series: [{ type: 'line', data: dateValues }]
		});
//Cleanup function to dispose of charts when component is destroyed, preventing memory leaks and ensuring that resources are properly released when the user navigates away from the charts page.
		return () => {
			barChart.dispose();
			pieChart.dispose();
			lineChart.dispose();
		};
	});
</script>
//Page layout with three columns: one for the bar chart, one for the pie chart, and one for the line chart. Each chart is rendered inside a box with a specified height, allowing users to visualize different aspects of the placemark data through interactive charts.	
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
