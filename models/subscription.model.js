import mongoose from "mongoose";
import { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);
export { subscriptionModel };
