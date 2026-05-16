import mongoose from "mongoose";

const placemarkSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  lat: Number,
  lng: Number,
  userId: String,
  // Store multiple image URLs for each placemark
  images: [String],
});

export const Placemark = mongoose.model("Placemark", placemarkSchema);
