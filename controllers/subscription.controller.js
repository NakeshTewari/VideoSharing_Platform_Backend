import mongoose from "mongoose";
import { subscriptionModel } from "../models/subscription.model.js";

const subscription = async (req, res) => {
  // get channelId from client
  const { channelId } = req.body;
  const user = req.user;

  console.log(channelId);

  const alreadySubscribed = await subscriptionModel.findOne({ channelId });
  if (alreadySubscribed) return res.json("Already subscribed to this channel");

  const subscriptionInstance = await subscriptionModel.create({
    subscriber: user._id,
    channel: channelId,
  });
  return res.json({ subscriptionInstance, message: "Subscription Success" });
};

export { subscription };
