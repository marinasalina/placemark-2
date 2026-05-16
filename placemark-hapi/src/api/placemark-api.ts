import type { ServerRoute } from "@hapi/hapi";
import { Placemark } from "../models/mongo/placemark.js";
import { sanitizeText } from "../utils/sanitize.js";

export const placemarkApi: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/placemarks",
    handler: async () => {
      return await Placemark.find().lean();
    },
  },

  {
    method: "POST",
    path: "/api/placemarks",
    handler: async (request, h) => {
      const payload = request.payload as any;

      const placemark = new Placemark({
        name: sanitizeText(payload.name),
        description: sanitizeText(payload.description),
        category: sanitizeText(payload.category),
        rating: sanitizeText(payload.rating),
        lat: Number(payload.lat),
        lng: Number(payload.lng),
        userId: sanitizeText(payload.userId),
      });
      const saved = await placemark.save();

      return {
        success: true,
        placemark: saved,
      };
    },
  },
];
