//used to send unauthenticated users to login
import { redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
//db access layer
import { placemarkStore } from '$lib/server/models/placemark-store';
//read secret key from .env
import { OPENWEATHER_API_KEY } from '$env/static/private';
//extracts user ID from login session or token
import { resolveUserId } from '$lib/server/auth';

//returned placemark + weather data
async function getWeather(lat: number, lng: number) {
	//weather conditions at POI
	//Creates request URL
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`;
// Sends HTTP request to Open weather
	const response = await fetch(url);

	if (!response.ok) {
		return null;
	}
//Convert API response into JS object
	const data = await response.json();

	return {
		temp: data.main.temp,
		condition: data.weather[0].description,
		icon: data.weather[0].icon
	};
}
//The load function runs on the server before the page is rendered. It checks if the user is authenticated by looking for an active authentication session and a valid token in the cookies. If the user is not authenticated, it redirects them to the login page. If the user is authenticated, it retrieves their placemarks from the database and makes them available to the page for rendering maps based on that data.
export async function load({ cookies, locals }) {
	await dbConnect();//connect to db

	const authSession = await locals.auth();
	const token = cookies.get('token');

	if (!authSession && !token) {
		throw redirect(303, '/login');
	}
//Check autohentication session and token, if not valid - redirect to login page. This ensures that only authenticated users can access the map page, which may contain sensitive data related to their placemarks. By checking for both an active authentication session and a valid token, we can effectively protect the map page from unauthorized access.
	const userId = resolveUserId(token, authSession);
//Load placemarks from MongoDB for the authenticated user. This retrieves all placemarks associated with the user's ID, allowing us to display them on the map and provide relevant information about each location.
	const placemarks = await placemarkStore.findByUser(userId);
//Add weather to each placemark
	const placemarksWithWeather = await Promise.all(//Promiss all for speed
		placemarks.map(async (placemark) => ({
			//Copes existing placemark properties
			...placemark,
			//Fetches the current weather conditions for the placemark's location using the OpenWeather API. This allows us to display relevant weather information alongside each placemark in the application.
			weather: await getWeather(placemark.lat, placemark.lng)
		}))
	);

	return {
		placemarks: placemarksWithWeather
	};
}
