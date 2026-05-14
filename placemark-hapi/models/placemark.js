import mongoose from "mongoose";

const placemarkSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  rating: String,
  lat: Number,
  lng: Number,
  userId: String,
});

export const Placemark = mongoose.model("Placemark", placemarkSchema);
