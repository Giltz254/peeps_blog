import { Schema, models } from "mongoose";
import mongoose from "mongoose";
const likeSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }
  },
  {
    timestamps: false,
  }
);
likeSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Like = models?.Like || mongoose.model("Like", likeSchema);

export default Like;
