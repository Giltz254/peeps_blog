import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "valid email required",
  }),
  password: z.string().min(1, {
    message: "Password required.",
  }),
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Valid email required",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password should be at least 6 characters",
    })
    .refine((value) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
      message: "Password must contain both uppercase and lowercase letters",
    }),
  name: z.string().min(3, {
    message: "Name should be at least 3 characters long",
  }),
});
export const ResetSchema = z.object({
  email: z.string().email({
    message: "valid email required",
  }),
});
export const SubscribeSchema = z.object({
  email: z.string().email({
    message: "valid email required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password should be atleast 6 characters",
  }),
});
export const projectSchema = z.object({
  email: z.string().email({
    message: "valid email required",
  }),
  textarea: z.string().min(3, {
    message: "Blueprint should be at least 3 characters long",
  }),
});
