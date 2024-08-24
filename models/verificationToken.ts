import mongoose, { Schema, models } from "mongoose";

const verificationTokenSchema = new Schema({
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
const modelName = "VerificationToken";
const VerificationToken = models[modelName] || mongoose.model(modelName, verificationTokenSchema);

export default VerificationToken;
