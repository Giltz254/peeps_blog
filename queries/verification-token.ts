import { getCollection } from "@/lib/mongodb";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const collection = await getCollection("verificationTokens");
    const verificationToken = await collection.findOne({
      token,
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const collection = await getCollection("verificationTokens");
    const verificationToken = await collection.findOne({
        email,
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
