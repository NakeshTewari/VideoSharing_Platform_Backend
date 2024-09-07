import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) return res.status(400).json({ msg: "Unauthorised request" });

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

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
