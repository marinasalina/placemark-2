<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Placemark } from '$lib/types/placemark-types';

	let { height = 60, placemarks = [] }: { height?: number; placemarks?: Placemark[] } = $props();

	let mapDiv: HTMLDivElement;
	let map: any;
	let L: any;
	let categoryLayers: Record<string, any> = {};
	let layerControl: any;

	function getIcon(category: string) {
		return L.icon({
			iconUrl: '/placemark.png',
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
		images: any[] = [],
		weather: any = null
	) {
		if (!map || !L) return;

		const layerName = category || 'Other';

		if (!categoryLayers[layerName]) {
			categoryLayers[layerName] = L.layerGroup().addTo(map);

			if (layerControl) {
				layerControl.addOverlay(categoryLayers[layerName], layerName);
			}
		}

		const gallery = images.length
			? images
					.map((image: any) => {
						const imageUrl = typeof image === 'string' ? image : image.url;

						if (!imageUrl) {
							return '';
						}

						return `<img src="${imageUrl}" style="width:80px;height:60px;object-fit:cover;margin:3px;" />`;
					})
					.join('')
			: '<p>No uploaded images</p>';

		const weatherInfo = weather
			? `<p><strong>Weather:</strong> ${weather.temp}°C, ${weather.condition}</p>`
			: '<p><strong>Weather:</strong> unavailable</p>';

		const popup = `
			<div style="text-align:center; width:220px;">
				<h3>${name}</h3>
				<div>${gallery}</div>
				<p>${description}</p>
				<b>${layerName}</b>
				${weatherInfo}
			</div>
		`;

		L.marker([lat, lng], { icon: getIcon(layerName) })
			.addTo(categoryLayers[layerName])
			.bindPopup(popup);
	}

	function addPlacemarks() {
		for (const placemark of placemarks) {
			if (placemark.lat !== undefined && placemark.lng !== undefined) {
				addMarker(
					placemark.lat,
					placemark.lng,
					placemark.name,
					placemark.category,
					placemark.description,
					placemark.images || [],
					placemark.weather
				);
			}
		}
	}

	onMount(async () => {
		L = (await import('leaflet')).default;

		map = L.map(mapDiv).setView([53.3498, -6.2603], 6);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap'
		}).addTo(map);

		layerControl = L.control.layers(null, categoryLayers).addTo(map);
		addPlacemarks();
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<div bind:this={mapDiv} style={`height:${height}vh;width:100%;`}></div>
