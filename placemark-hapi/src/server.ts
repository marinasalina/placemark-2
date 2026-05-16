import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import { usersApi } from "./api/users-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { db } from "./models/db.js";

dotenv.config();

const server = Hapi.server({
  port: Number(process.env.PORT) || 4000,
  host: "localhost",
  routes: { cors: true },
});

async function init() {
  await db.init();

  server.route(usersApi);
  server.route(placemarkApi);

  await server.start();
  console.log("Placemark API running at:", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

await init();
