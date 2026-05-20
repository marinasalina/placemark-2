<script lang="ts">
	//Svelte lifecycle functions
	// onMount - runs after component is first rendered, used to initialize Leaflet map and add placemarks
	// onDestroy - runs when component is removed from DOM, used to clean up map resources
	import { onDestroy, onMount } from 'svelte';
	//Loads Leaflet library and CSS for map rendering
	import 'leaflet/dist/leaflet.css';
	//Define expected placemark structure
	import type { Placemark } from '$lib/types/placemark-types';

	let { height = 60, placemarks = [] }: { height?: number; placemarks?: Placemark[] } = $props();
	//References to map container and Leaflet map instance
	let mapDiv: HTMLDivElement; //Map container. Reference to HTML div where Map renders
	let map: any; //Map object, stores leaflet map instance
	let L: any; //Leaflet library instance
	let categoryLayers: Record<string, any> = {}; //object holding marker group by category
	let layerControl: any; //stores category toggle control

	//Marker Icon (Creates custom marker icon)
	function getIcon(category: string) {
		return L.icon({
			iconUrl: '/placemark.png',
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32]
		});
	}
	//Adds a marker to the map with a popup containing placemark information. It checks if a layer for the placemark's category already exists, and if not, it creates a new layer group for that category and adds it to the map. The marker is then added to the appropriate category layer, and a popup is bound to the marker that displays the placemark's name, description, associated images, and current weather conditions at that location.
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
		//Fallback if category missing
		const layerName = category || 'Other';

		if (!categoryLayers[layerName]) {
			categoryLayers[layerName] = L.layerGroup().addTo(map); //Layer bacames visible
			//Add category check box to layer control, allowing users to toggle visibility of markers by category. This enhances the user experience by providing an easy way to filter the displayed placemarks on the map based on their categories.
			if (layerControl) {
				layerControl.addOverlay(categoryLayers[layerName], layerName);
			}
		}
		// Image galery feature, checks if there are any images associated with the placemark. If there are, it creates an HTML string that displays each image as a thumbnail. If there are no images, it displays a message indicating that no images were uploaded. This gallery is then included in the popup content for the marker on the map.
		const gallery = images.length
			? //if images exist, loop through images and create HTML for each one, otherwise show message
				images
					.map((image: any) => {
						const imageUrl = typeof image === 'string' ? image : image.url;

						if (!imageUrl) {
							return '';
						}
						// Build image HTML
						return `<img src="${imageUrl}" style="width:80px;height:60px;object-fit:cover;margin:3px;" />`;
					})
					//Combines multiple images into one HTML string
					.join('')
			: '<p>No uploaded images</p>';
		//Weather info
		const weatherInfo = weather
			? `<p><strong>Weather:</strong> ${weather.temp}°C, ${weather.condition}</p>`
			: '<p><strong>Weather:</strong> unavailable</p>';
		//Builds marker popup content, including placemark name, description, image gallery, category, and weather information. This content is displayed when the user clicks on the marker on the map, providing a comprehensive overview of the placemark's details in an easily accessible format.
		const popup = `
			<div style="text-align:center; width:220px;">
				<h3>${name}</h3>
				<div>${gallery}</div>
				<p>${description}</p>
				<b>${layerName}</b>
				${weatherInfo}
			</div>
		`;
		//Create markrer
		L.marker([lat, lng], { icon: getIcon(layerName) })
			.addTo(categoryLayers[layerName])
			.bindPopup(popup);
	}
	//Loops through every placemark in the list
	function addPlacemarks() {
		for (const placemark of placemarks) {
			//Checks if placemark has valid latitude and longitude values before adding a marker to the map. This ensures that only placemarks with valid geographic coordinates are displayed on the map, preventing errors and improving the overall user experience by avoiding markers that cannot be properly placed.
			if (placemark.lat !== undefined && placemark.lng !== undefined) {
				//Creates one marker for that placemark
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
	// Runs after the components appears in the browser
	//Leaflet needs a real HTML div to draw the map
	onMount(async () => {
		//L becomes the leaflet object
		L = (await import('leaflet')).default;
		//Creates the map instance, centered on Dublin with a zoom level of 6. This initializes the Leaflet map and sets the initial view to focus on Dublin, allowing users to see the placemarks in that area when they first load the map page.
		map = L.map(mapDiv).setView([53.3498, -6.2603], 6);
		//Adds the visible map background from OpenStreet Map, without can see only blank map area
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap'
		}).addTo(map);
		//Add layer control box to the map, allowing users to toggle visibility of different categories of placemarks. This enhances the user experience by providing an easy way to filter the displayed placemarks on the map based on their categories, making it easier for users to focus on specific types of locations.
		layerControl = L.control.layers(null, categoryLayers).addTo(map);
		//After map is ready adds all placemark markers
		addPlacemarks();
	});
	//Runs when user leavs the page or component is removed from the DOM, it checks if the map instance exists and if so, it removes the map from the DOM. This cleanup process is important to prevent memory leaks and ensure that resources are properly released when the user navigates away from the map page.
	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<!-- empty HTML container where leaflet draw the map -->
<div bind:this={mapDiv} style={`height:${height}vh;width:100%;`}></div>
