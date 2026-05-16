import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

const mongoConnection = {
	isConnected: 0
};

/*
0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
*/

export async function dbConnect() {
	try {
		if (mongoConnection.isConnected === 1) {
			console.log('already connected');
			return;
		}

		if (mongoose.connections.length > 0) {
			mongoConnection.isConnected = mongoose.connections[0].readyState;

			if (mongoConnection.isConnected === 1) {
				console.log('using existing connection');
				return;
			}

			await mongoose.disconnect();
		}

		await mongoose.connect(MONGO_URL);

		mongoConnection.isConnected = 1;

		console.log('Mongo connected');
	} catch (error) {
		console.error('Mongo connection error:', error);
	}
}

export async function dbDisconnect() {
	if (process.env.NODE_ENV === 'development') return;

	if (mongoConnection.isConnected === 0) return;

	await mongoose.disconnect();
	mongoConnection.isConnected = 0;

	console.log('Mongo disconnected');
}
