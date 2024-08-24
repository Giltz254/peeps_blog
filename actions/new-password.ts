"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/queries/user";
import { getPasswordResetTokenByToken } from "@/queries/password-reset-token";
import { getCollection } from "@/lib/mongodb";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const collection = await getCollection("users");
  await collection.updateOne(
    { _id: existingUser._id },
    { $set: { password: hashedPassword } }
  );
  const passwordCollection = await getCollection("passwordResetTokens");
  await passwordCollection.deleteOne({
    _id: existingToken._id,
  });
  return { success: "Password updated!" };
};
