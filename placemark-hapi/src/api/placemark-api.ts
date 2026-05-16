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
        userId: sanitizeText(payload.userId || ""),
        images: payload.images || [],
        createdAt: payload.createdAt || new Date().toISOString(),
      });

      const saved = await placemark.save();

      return {
        success: true,
        placemark: saved,
      };
    },
  },

  {
    method: "DELETE",
    path: "/api/placemarks/{id}/images/{imageIndex}",
    handler: async (request, h) => {
      const { id, imageIndex } = request.params as {
        id: string;
        imageIndex: string;
      };

      const placemark = await Placemark.findById(id);

      if (!placemark) {
        return h
          .response({
            success: false,
            message: "Placemark not found",
          })
          .code(404);
      }

      const index = Number(imageIndex);

      if (!placemark.images || index < 0 || index >= placemark.images.length) {
        return h
          .response({
            success: false,
            message: "Image not found",
          })
          .code(404);
      }

      placemark.images.splice(index, 1);
      await placemark.save();

      return {
        success: true,
        placemark,
      };
    },
  },
];
