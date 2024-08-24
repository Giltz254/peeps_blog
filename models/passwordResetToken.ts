import mongoose, { Schema, models } from "mongoose";
const passwordResetTokenSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  expires: {
    type: Date,
  },
});
const PasswordResetToken =
  models?.PasswordResetToken ||
  mongoose.model("PasswordResetToken", passwordResetTokenSchema);
export default PasswordResetToken;
