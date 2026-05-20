import mongoose from 'mongoose';
//Blueprint for user Data in Mongo db
const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
