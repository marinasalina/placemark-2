<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	let { height = 60 } = $props();

	let mapDiv: HTMLDivElement;
	let map: any;
	let L: any;
	let categoryLayers: any = {};
	let layerControl: any;

	function getImages(category: string) {
		const cleanCategory = String(category || '')
			.trim()
			.toLowerCase();

		if (cleanCategory === 'city') return ['/city.png', '/city2.png'];
		if (cleanCategory === 'monument') return ['/monument.png', '/monument2.png'];
		if (cleanCategory === 'library') return ['/library.png', '/library2.png'];

		return ['/city.png', '/city2.png'];
	}

	function getIcon(category: string) {
		return L.icon({
			iconUrl: getImages(category)[0],
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
		const gallery = getImages(category)
			.map(
				(image, index) => `
			<img
				class="popup-image"
				data-index="${index}"
				src="${image}"
				style="width:70px;height:55px;object-fit:cover;margin:3px;cursor:pointer;"
				title="Click image to delete"
			/>
		`
			)
			.join('');

		const popup = `
			<div style="text-align:center; width:190px;">
				<h3>${name}</h3>
				<div>${gallery}</div>
				<p>${description}</p>
				<b>${category}</b>
			</div>
		`;

		const marker = L.marker([lat, lng], { icon: getIcon(category) })
			.addTo(categoryLayers[category])
			.bindPopup(popup);

		marker.on('popupopen', () => {
			document.querySelectorAll('.popup-image').forEach((img) => {
				img.addEventListener('click', function () {
					this.remove();
				});
			});
		});
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
