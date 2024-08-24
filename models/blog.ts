import mongoose, { models, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      maxlength: 200,
      required: true,
    },
    content: {
      type: [],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    total_likes: {
      type: Number,
      default: 0,
    },
    total_comments: {
      type: Number,
      default: 0,
    },
    total_reads: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
    draft: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);
blogSchema.pre("save", function (next) {
  const now = new Date();
  if (this.isNew) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});
const Blog = models?.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
