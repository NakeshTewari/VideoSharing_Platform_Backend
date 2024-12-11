import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
// import { app } from "./app.js";
import { httpserver } from "./app.js";
import { Server } from "socket.io";

dotenv.config({ path: "./.env" });

console.log("PORT:", process.env.PORT);

connectDB()
  .then(() => {
    httpserver.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server is running at port: http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed!", error);
  });

 