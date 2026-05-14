import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async findAll() {
    return Placemark.find().lean();
  },

  async findById(id) {
    return Placemark.findById(id).lean();
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    const savedPlacemark = await newPlacemark.save();
    return savedPlacemark.toObject();
  },

  async deleteById(id) {
    await Placemark.findByIdAndDelete(id);
  },

  async deleteAll() {
    await Placemark.deleteMany({});
  },
};
