import { getCollection } from "@/lib/mongodb";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const collection = await getCollection("passwordResetTokens");
    const passwordToken = await collection.findOne({
      token,
    });
    return passwordToken;
  } catch (error) {
    return null;
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const collection = await getCollection("passwordResetTokens");
    const passwordToken = await collection.findOne({
      email,
    });
    return passwordToken;
  } catch (error) {
    return null;
  }
};
