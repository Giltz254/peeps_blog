"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { projectSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { projectEmail } from "@/actions/project";
import Formerror from "../Form-error";
import FormSuccess from "../Form-success";
type mailFormValues = z.infer<typeof projectSchema>;
const MailTemplate = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<mailFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      email: "",
      textarea: "",
    },
  });
  const onSubmit = (values: mailFormValues) => {
    startTransition(() => {
      projectEmail(values).then((data) => {
        if (data?.error) {
          setError(data?.error);
          reset();
          setTimeout(() => {
            setError("");
          }, 3000);
        }
        if (data?.success) {
          setSuccess(data?.success);
          reset();
          setTimeout(() => {
            setSuccess("");
          }, 3000);
        }
      });
    });
  };
  return (
    <div className="w-full text-dark flex flex-col gap-5 box-border rounded-lg">
      <h3 className="text-lg leading-9 underline capitalize font-bold animate-textColorChange">
        Make your online presence dream to reality. Submit your website request
        to our team of developers
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-0.5">
          <label className="mb-1 text-dark font-medium text-sm">
            Your email address
          </label>
          <Input
            type="email"
            placeholder="jspeeps@gmail.com"
            className="rounded-sm focus-visible:ring-secondary"
            {...register("email")}
          />
          {errors.email && typeof errors.email.message === "string" && (
            <p className="text-destructive/90 font-normal text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="mb-1 text-dark font-medium text-sm first-letter:capitalize">
            Give a blueprint of your site?
          </label>
          <Textarea
            placeholder="Describe your e-commerce site needs (e.g., platform, features, design preferences)."
            className="overflow-hidden"
            {...register("textarea")}
          />
          {errors.textarea && typeof errors.textarea.message === "string" && (
            <p className="text-destructive/90 font-normal text-sm">
              {errors.textarea.message}
            </p>
          )}
        </div>
        <Formerror message={error} />
        <FormSuccess message={success} />
        <Button
          disabled={isPending}
          type="submit"
          variant={"default"}
          size={"lg"}
        >
          {isPending && (
            <div className="border-4 border-border animate-spin w-[36px] h-[36px] rounded-full border-l-transparent"></div>
          )}
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default MailTemplate;
