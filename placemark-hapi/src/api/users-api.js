import { User } from "../models/mongo/user.js";
import jwt from "jsonwebtoken";

export const usersApi = [
  {
    method: "POST",
    path: "/api/users",
    handler: async (request, h) => {
      try {
        console.log("Signup payload:", request.payload);

        const user = new User(request.payload);
        await user.save();

        return { success: true };
      } catch (error) {
        console.log("SIGNUP ERROR:", error);
        return h.response({ success: false, message: error.message }).code(500);
      }
    },
  },

  {
    method: "POST",
    path: "/api/users/authenticate",
    handler: async (request, h) => {
      const { email, password } = request.payload;

      const user = await User.findOne({ email });

      if (!user) {
        return { success: false, message: "User not found" };
      }

      if (user.password !== password) {
        return { success: false, message: "Invalid password" };
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
