//Used to send user to another page
import { redirect } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/db';
//Data access layer
import { placemarkStore } from '$lib/server/models/placemark-store';
//get user ID from login information
import { resolveUserId } from '$lib/server/auth';

//load function runs on the server before the page is rendered. It checks if the user is authenticated by looking for an active authentication session and a valid token in the cookies. If the user is not authenticated, it redirects them to the login page. If the user is authenticated, it retrieves their placemarks from the database and makes them available to the page for rendering charts based on that data.
export async function load({ cookies, locals }) {
	//await conects to MongoDB
	await dbConnect();
//get auth session and token from cookies
	const authSession = await locals.auth();
	const token = cookies.get('token');

	if (!authSession && !token) {
		//Redirect user to login page if they are not authenticated. This ensures that only logged-in users can access the charts page, which may contain sensitive data related to their placemarks. By checking for both an active authentication session and a valid token, we can effectively protect the charts page from unauthorized access.
		throw redirect(303, '/login');
	}
//Resolve user identity, because Login can come from different methods
	const userId = resolveUserId(token, authSession);

	//load user placemark
	return {
		placemarks: await placemarkStore.findByUser(userId)
	};
}
