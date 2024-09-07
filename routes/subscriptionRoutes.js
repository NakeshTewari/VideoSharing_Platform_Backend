import { Router } from "express";
import { subscription } from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/subscription").post(verifyJWT, subscription);

export default router;
