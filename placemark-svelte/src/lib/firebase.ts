//Start firebase`s initialization and authentication setup. This file sets up the Firebase app using the provided configuration and exports the authentication object for use in other parts of the application, allowing for user authentication and management.
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth'; //loads Firebase authentication module
//Identify firebase project
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};
//Prevent dublicate initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
//create Firebase authentification object
export const auth = getAuth(app);
