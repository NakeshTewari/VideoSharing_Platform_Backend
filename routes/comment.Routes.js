import { Router } from "express";
import {getCommentsByVideoId} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getComments").post(getCommentsByVideoId);

export default router;
