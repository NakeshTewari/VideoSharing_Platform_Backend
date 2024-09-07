import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/video.Routes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

app.use("/userauth/api", userRoutes);
app.use("/video/api", videoRoutes);
app.use("/subscription/api", subscriptionRoutes);

export { app };
