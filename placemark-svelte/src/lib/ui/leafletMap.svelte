<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	let { height = 60 } = $props();

	let mapDiv: HTMLDivElement;
	let map: any;
	let L: any;
	let categoryLayers: any = {};
	let layerControl: any;

	function getIcon(category: string) {
		const cleanCategory = String(category || '')
			.trim()
			.toLowerCase();

		let iconUrl = '/city.png';

		if (cleanCategory === 'monument') {
			iconUrl = '/monument.png';
		}

		if (cleanCategory === 'library') {
			iconUrl = '/library.png';
		}

		return L.icon({
			iconUrl,
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
		description = '',
		images: string[] = []
	) {
		if (!map || !L) return;

		if (!categoryLayers[category]) {
			categoryLayers[category] = L.layerGroup().addTo(map);

			if (layerControl) {
				layerControl.addOverlay(categoryLayers[category], category);
			}
		}

		const gallery = images.length
			? images
					.map(
						(image) =>
							`<img src="${image}" style="width:80px;height:60px;object-fit:cover;margin:3px;" />`
					)
					.join('')
			: '<p>No uploaded images</p>';

		const popup = `
			<div style="text-align:center; width:220px;">
				<h3>${name}</h3>
				<div>${gallery}</div>
				<p>${description}</p>
				<b>${category}</b>
			</div>
		`;

		L.marker([lat, lng], { icon: getIcon(category) })
			.addTo(categoryLayers[category])
			.bindPopup(popup);
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
