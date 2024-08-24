"use server";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/index';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';
import { sendVerificationEmail } from '@/lib/mail';
import { getUserByEmail } from '@/queries/user';
import { getVerificationToken } from '@/queries/tokens';
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "invalid credentials!"}
    }
    const {password, email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist."}
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await getVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken?.email as string,   verificationToken?.token as string, existingUser.name as string)
        return { success: "Confirmation email sent!"}
    }
    try {
        await signIn("credentials", {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials."}
                default:
                    return {error: "Something went wrong"}
            }
        }
        throw error;
    }
}