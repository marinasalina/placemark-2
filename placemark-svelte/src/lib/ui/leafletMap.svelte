<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	let { height = 60 } = $props();

	let mapDiv: HTMLDivElement;
	let map: any;
	let L: any;
	let categoryLayers: any = {};
	let layerControl: any;

	export function addMarker(lat: number, lng: number, text: string, category: string) {
		if (!map || !L) return;

		if (!categoryLayers[category]) {
			categoryLayers[category] = L.layerGroup().addTo(map);

			if (layerControl) {
				layerControl.addOverlay(categoryLayers[category], category);
			}
		}

		L.marker([lat, lng])
			.addTo(categoryLayers[category])
			.bindPopup(text + '<br>' + category);
	}

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
