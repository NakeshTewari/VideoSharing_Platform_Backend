import { CommentModel } from "../models/comment.model.js";

const getCommentsByVideoId = async (req,res) => {

  try {
    console.log("videoId", req.body);
    const { videoId } = req.body;
   
   
    if (!videoId ) {
      return res.status(400).json({ msg: "videoId are required." });
    }  
  
    const comments= await CommentModel.find({
     videoId: videoId
    });


    return res.status(200).json({msg: comments});

  } catch (error) {
  
    return res.status(500).json({  error: error.message });
  }
  

}

export  {getCommentsByVideoId};
