import mongoose from 'mongoose';
//Mongo DB chema for image data in MongoDB
export const imageSchema = new mongoose.Schema({
	url: String,
	publicId: String
});
