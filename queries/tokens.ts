import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import { getCollection } from "@/lib/mongodb";
import PasswordResetToken from "@/models/passwordResetToken";
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  try {
    const collection = await getCollection("passwordResetTokens");
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
      await collection.findOneAndDelete({
        _id: existingToken._id,
      });
    }
    const newPasswordResetToken = new PasswordResetToken({
      email,
      token,
      expires,
    });
    const passwordResetToken = await collection.insertOne(newPasswordResetToken);
    return {
      email,
      token,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 3600 * 1000);

  try {
    const collection = await getCollection('verificationTokens');

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
      await collection.findOneAndDelete({ _id: existingToken._id });
    }

    const newVerificationToken = {
      email,
      token,
      expires,
    };

    const result = await collection.insertOne(newVerificationToken);
    if (result.acknowledged) {
      return {
        email,
        token,
        expires,
      };
    } else {
      throw new Error('Failed to insert verification token.');
    }
  } catch (error) {
    console.error('Error occurred while getting verification token:', error);
    throw error;
  }
};