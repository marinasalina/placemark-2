import mongoose from "mongoose";
import dotenv from "dotenv";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";

dotenv.config();

export const db = {
  userStore: null,
  placemarkStore: null,

  async init() {
    mongoose.set("strictQuery", false);

    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Mongo connected"))
      .catch((err) => console.log("Mongo connection error:", err));

    this.userStore = userMongoStore;
    this.placemarkStore = placemarkMongoStore;
  },
};
