<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	let { height = 60 } = $props();

	let mapDiv: HTMLDivElement;
	let map: any;
	let L: any;
	let categoryLayers: any = {};
	let layerControl: any;

	function getImage(category: string) {
		const cleanCategory = category?.trim().toLowerCase();

		if (cleanCategory === 'city') return '/city.png';
		if (cleanCategory === 'monument') return '/monument.png';
		if (cleanCategory === 'library') return '/library.png';

		return '/city.png';
	}

	function getIcon(category: string) {
		return L.icon({
			iconUrl: getImage(category),
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32]
		});
	}

	export function addMarker(
		lat: number,
		lng: number,
		name: string,
		category: string,
		description = ''
	) {
		if (!map || !L) return;

		if (!categoryLayers[category]) {
			categoryLayers[category] = L.layerGroup().addTo(map);

			if (layerControl) {
				layerControl.addOverlay(categoryLayers[category], category);
			}
		}

const popup = `
	<div style="text-align:center; width:180px;">
		<h3>${name}</h3>
		<img src="${getImage(category)}" style="width:120px; height:90px; object-fit:cover;" />
		<p>${description}</p>
		<b>${category}</b>
	</div>
`;

L.marker([lat, lng], { icon: getIcon(category) })
	.addTo(categoryLayers[category])
	.bindPopup(popup);
	onMount(async () => {
		L = (await import('leaflet')).default;

		map = L.map(mapDiv).setView([53.3498, -6.2603], 6);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap'
		}).addTo(map);

		layerControl = L.control.layers(null, categoryLayers).addTo(map);
	});
</script>

<div bind:this={mapDiv} style={`height:${height}vh;width:100%;`}></div>
