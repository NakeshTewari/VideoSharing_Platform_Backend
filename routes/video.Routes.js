import { Router } from "express";
import {
  UplaodVideo,
  getAllVideos,
  getVideo,
} from "../controllers/video.controller.js";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/UploadVideo").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  UplaodVideo
);

router.route("/getAllVideos").get(getAllVideos);
router.route("/getVideo/:id").get(getVideo);
export default router;
