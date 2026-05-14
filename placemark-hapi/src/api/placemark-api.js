import { Placemark } from "../models/mongo/placemark.js";

export const placemarkApi = [
  // Get all placemarks
  {
    method: "GET",
    path: "/api/placemarks",
    handler: async () => {
      return await Placemark.find().lean();
    },
  },

  // Create a placemark
  {
    method: "POST",
    path: "/api/placemarks",
    handler: async (request, h) => {
      const placemark = new Placemark(request.payload);
      const saved = await placemark.save();

      return {
        success: true,
        placemark: saved,
      };
    },
  },
];
