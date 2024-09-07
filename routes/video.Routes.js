import { Router } from "express";
import { UplaodVideo } from "../controllers/video.controller.js";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/UploadVideo").post(
  verifyJWT,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  UplaodVideo
);
export default router;
