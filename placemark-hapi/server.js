import Hapi from '@hapi/hapi';
import { usersApi } from './placemark-hapi/api/users-api.js';
import { placemarkApi } from './api/placemark-api.js';
import { connectMongo } from './models/db.js';

const server = Hapi.server({
	port: 4000,
	host: 'localhost',
	routes: { cors: true }
});

async function init() {
	await connectMongo();
	server.route(usersApi);
	server.route(placemarkApi);
	await server.start();
	console.log('Placemark API running at:', server.info.uri);
}

init();
