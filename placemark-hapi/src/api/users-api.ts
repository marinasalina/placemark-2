import { User } from "../models/mongo/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { ServerRoute } from "@hapi/hapi";
import { sanitizeText } from "../utils/sanitize.js";

// Type definition for login request payload
type LoginPayload = {
  email: string;
  password: string;
};

export const usersApi: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/users",
    //Register a new user
    //Sanitize input, hash password, and save user to database
    handler: async (request, h) => {
      try {
        const payload = request.payload as any;
        console.log("REGISTER:", payload.email);
        console.log("REGISTER PASSWORD:", payload.password);
        // Hash and salt password using bcrypt
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        // Create user with sanitized input
        const user = new User({
          firstName: sanitizeText(payload.firstName),
          lastName: sanitizeText(payload.lastName),
          email: sanitizeText(payload.email).toLowerCase(),
          password: hashedPassword,
        });

        await user.save();

        return { success: true };
      } catch (error: any) {
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
    //Authenticate user and return JWT token
    // Compare password with hashed password
    handler: async (request, h) => {
      const { email, password } = request.payload as LoginPayload;
      console.log("LOGIN:", email);
      const user = await User.findOne({
        email: sanitizeText(email).toLowerCase(),
      });
      console.log("FOUND USER:", !!user);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }
      // Check if password is valid using bcrypt's compare function
      const validPassword = await bcrypt.compare(password, user.password);
      console.log("VALID PASSWORD:", validPassword);
      if (!validPassword) {
        return {
          success: false,
          message: "Invalid password",
        };
      }
      // Generate JWT token with user ID as payoad and a secret key
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
