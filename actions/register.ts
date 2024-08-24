"use server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail } from "@/queries/user";
import User from "@/models/User";
import { getVerificationToken } from "@/queries/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getCollection } from "@/lib/mongodb";
export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid credentials!" };
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 12);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already taken!" };
  }
  try {
    const collection = await getCollection("users");
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    await collection.insertOne(newUser);
    const verificationToken = await getVerificationToken(email)
  await sendVerificationEmail(verificationToken?.email as string, verificationToken?.token as string, name)
    return { success: "Confirmation email sent!" };
  } catch (error: any) {
    console.log(error);
  }
};
