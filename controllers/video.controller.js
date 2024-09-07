import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { VideoModel } from "../models/video.model.js";

const UplaodVideo = async (req, res) => {
  // console.log(req);

  const cloudinary_url_array = [];
  const files = req.files;
  // console.log(files);

  for (let key in files) {
    // console.log(files[key]);

    const array = files[key];
    const contentInArray = array[0];
    // console.log(contentInArray);

    const uploadedResult = await uploadOnCloudinary(contentInArray.path);
    cloudinary_url_array.push(uploadedResult.url);
    // console.log("Uploaded:", uploadedResult);c
  }

  const { title, description, duration, views } = req.body;
  const user_id = req.user._id;

  const video = cloudinary_url_array[0];
  const thumbnail = cloudinary_url_array[1];

  const videoInstance = await VideoModel.create({
    videoFile: video,
    thumbnail,
    title,
    description,
    duration,
    views,
    owner: user_id,
  });

  console.log(videoInstance);

  // console.log(req.files);

  res.json({ message: "Success" });
};

export { UplaodVideo };
