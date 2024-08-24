"use server"
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/queries/tokens';
import { getUserByEmail } from '@/queries/user';
import { ResetSchema } from '@/schemas';
import * as z from 'zod';
export const resetPass = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid email!"}
    }
    const { email } = validatedFields.data
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "Email not found!"}
    }
    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken?.email as string, passwordResetToken?.token as string, existingUser.name as string)
    return {success: "Reset email sent!"}
}