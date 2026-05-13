import mongoose from 'mongoose';

export async function connectMongo() {
	mongoose.set('strictQuery', false);
	await mongoose.connect('mongodb://localhost/placemark');
}
