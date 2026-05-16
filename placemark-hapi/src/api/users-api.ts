import { User } from "../models/mongo/user.js";
import jwt from "jsonwebtoken";
import type { ServerRoute } from "@hapi/hapi";
import { sanitizeText } from "../utils/sanitize.js";

type LoginPayload = {
  email: string;
  password: string;
};

export const usersApi: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/users",
    handler: async (request, h) => {
      try {
        console.log("Signup payload:", request.payload);

        const payload = request.payload as any;

        const user = new User({
          firstName: sanitizeText(payload.firstName),
          lastName: sanitizeText(payload.lastName),
          email: sanitizeText(payload.email).toLowerCase(),
          password: payload.password,
        });
        await user.save();

        return { success: true };
      } catch (error: any) {
        console.log("SIGNUP ERROR:", error);

        return h
          .response({
            success: false,
            message: error.message,
          })
          .code(500);
      }
    },
  },

  {
    method: "POST",
    path: "/api/users/authenticate",
    handler: async (request, h) => {
      const { email, password } = request.payload as LoginPayload;

      const user = await User.findOne({ email });

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      if (user.password !== password) {
        return {
          success: false,
          message: "Invalid password",
        };
      }

      const token = jwt.sign({ id: user._id }, "secret");

      return {
        success: true,
        name: `${user.firstName} ${user.lastName}`,
        _id: user._id,
        token,
      };
    },
  },
];
