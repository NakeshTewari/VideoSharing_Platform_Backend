import { UserModel } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const jwtPassword = process.env.JWT_PASSWORD;

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error generating access and refresh token");
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESSS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      //Payload
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const RegisterUser = async (req, res) => {
  const { username, password, email, fullName } = req.body;
  console.log(req.body);
  console.log(req.file);

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ msg: "username or email or password or fullName not present" });
  }

  const existedUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res.json({ msg: "username or email already existed" });
  }

  let avatarLocalPath;
  if (req.file) {
    avatarLocalPath = req.file.path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    return res.status(400).json({ msg: "Avatar file in not recognised" });
  }
  const user = await UserModel.create({
    username,
    email,
    password,
    fullName,
    avatar: avatar.url,
    // nickusername,
    // avatar,
  });

  // let avatarLocalPath;
  // if(req.files.avatar && req.files.avatar.length>0){
  //   avatarLocalPath= req.files.avatar[0].
  // }

  if (!user) console.log("User is not created");

  console.log("console log of user:" + user);
  return res.status(200).json({ user });
};

const loginUser = async (req, res) => {
  const { password, username } = req.body;

  if (!username && !password)
    return res.json({ msg: "username or password not given" });

  const user = await UserModel.findOne({
    $or: [{ username }],
  });

  if (!user) {
    return res.json({ msg: "user does not exist" });
  }

  if (user.password !== password) {
    return res.json({ msg: "password is not correct", user });
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await UserModel.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
  };

  console.log(loggedInUser, accessToken, refreshToken);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
};

const currentUserDetails = async (req, res) => {

  return res.json(req.user);
};

const logoutUser = async (req, res) => {
  // console.log(req);

  const user = await UserModel.findByIdAndUpdate(req.user?._id, {
    refreshToken: "",
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ msg: "User logged out" });
};

export { RegisterUser, loginUser, logoutUser, currentUserDetails };
