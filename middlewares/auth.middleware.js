import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    // console.log(req.headers);
    // const token = req.headers?.authorization?.split(" ")[1];
    const token = req.headers.authorization;
     

    const accessToken = token.split(" ")[1];

    // console.log(accessToken);
    if (!accessToken)
      return res.status(401).json({ msg: "Unauthorised request" });

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    
    const user = await UserModel.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) return res.status(400).json({ msg: "Invalid access token" });

    req.user = user;
    next();
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

export { verifyJWT };
