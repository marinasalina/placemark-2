import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async findAll() {
    return Placemark.find().lean();
  },

  async findById(id: string) {
    return Placemark.findById(id).lean();
  },

  async addPlacemark(placemark: any) {
    const newPlacemark = new Placemark(placemark);
    const savedPlacemark = await newPlacemark.save();
    return savedPlacemark.toObject();
  },

  async updatePlacemark(id: string, updatedPlacemark: any) {
    return Placemark.findByIdAndUpdate(id, updatedPlacemark, {
      new: true,
    }).lean();
  },

  async deleteById(id: string) {
    await Placemark.findByIdAndDelete(id);
  },

  async deleteAll() {
    await Placemark.deleteMany({});
  },
};
