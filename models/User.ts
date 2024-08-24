import mongoose, { Schema, models } from "mongoose";

const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
  WRITER: "WRITER",
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    providerAccountId: {
      type: String,
      unique: true,
      required: false,
    },
    emailVerified: {
      type: Date,
    },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    blogs: {
      type: [String],
      ref: "blogs",
      default: [],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);
userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});
const User = models?.User || mongoose.model("User", userSchema);

export default User;
