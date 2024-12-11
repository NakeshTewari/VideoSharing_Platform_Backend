import mongoose from "mongoose";
import { subscriptionModel } from "../models/subscription.model.js";

const subscription = async (req, res) => {
  // get channelId from client
  
  const { channel } = req.body;
  const user = req.user;
  console.log(channel, user);
  

  const alreadySubscribed = await subscriptionModel.findOne({ channel });
  if (alreadySubscribed) return res.json({message: "Already subscribed to this channel"});

  const subscriptionInstance = await subscriptionModel.create({
    subscriber: user._id,
    channel: channelId,
  });
  return res.json({ subscriptionInstance, message: "Subscription Success" });
};

export { subscription };
