import { dbConnect } from '$lib/server/db';
import { Placemark } from '$lib/server/models/placemark';
import { OPENWEATHER_API_KEY } from '$env/static/private';

async function getWeather(lat: number, lng: number) {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`;

	const response = await fetch(url);

	if (!response.ok) {
		return null;
	}

	const data = await response.json();

	return {
		temp: data.main.temp,
		condition: data.weather[0].description,
		icon: data.weather[0].icon
	};
}

export async function load() {
	await dbConnect();

	const placemarks = JSON.parse(JSON.stringify(await Placemark.find().lean()));

	const placemarksWithWeather = await Promise.all(
		placemarks.map(async (placemark) => ({
			...placemark,
			weather: await getWeather(placemark.lat, placemark.lng)
		}))
	);

	return {
		placemarks: placemarksWithWeather
	};
}
