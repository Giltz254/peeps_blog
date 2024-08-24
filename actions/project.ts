"use server"
import { sendProjectSubmissionEmail } from "@/lib/mail";
import { projectSchema } from "@/schemas";
import * as z from "zod";

export const projectEmail = async (values: z.infer<typeof projectSchema>) => {
    const validatedFields = projectSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "invalid credentials!" };
    }
    const { email, textarea } = validatedFields.data;
    await sendProjectSubmissionEmail(email, textarea);
    return { success: "Your request has been submitted" }
}