import { redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
import { placemarkStore } from '$lib/server/models/placemark-store';
import { OPENWEATHER_API_KEY } from '$env/static/private';
import { resolveUserId } from '$lib/server/auth';

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

export async function load({ cookies }) {
	await dbConnect();

	const token = cookies.get('token');

	if (!token) {
		throw redirect(303, '/login');
	}

	const userId = resolveUserId(token, null);
	const placemarks = await placemarkStore.findByUser(userId);

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
