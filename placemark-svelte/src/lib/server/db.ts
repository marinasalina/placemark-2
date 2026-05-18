import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

let connection: Promise<typeof mongoose> | null = null;

export async function dbConnect() {
	if (mongoose.connection.readyState === 1) {
		console.log('already connected');
		return mongoose;
	}

	if (!connection) {
		connection = mongoose.connect(MONGO_URL);
	}

	await connection;

	console.log('Mongo connected');
	return mongoose;
}
