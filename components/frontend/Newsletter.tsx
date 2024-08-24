"use client";
import Input from "@/components/frontend/Input";
import * as z from "zod";
import { SubscribeSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Formerror from "../Form-error";
import FormSuccess from "../Form-success";
import ErrorMessage from "./auth/ErrorMessage";
import Button from "./Button";

const Newsletter = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  type subscribeFormValues = z.infer<typeof SubscribeSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<subscribeFormValues>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  // const onSubmit = (values: z.infer<typeof SubscribeSchema>) => {
  //   setSuccess("");
  //   setError("");
  //   startTransition(() => {
  //     subscribeUser(values).then((data) => {
  //       setError(data.error);
  //       setSuccess(data.success);
  //       setTimeout(() => {
  //         setError("");
  //         setSuccess("");
  //       }, 3000)
  //       if (data.success || data.error) {
  //         reset();
  //       }
  //     });
  //   });
  // };

  return (
    <div className="bg-white border-t-4 border rounded-md border-border border-b-4 drop-shadow-sm animated-border">
      <h3 className="text-lg font-bold px-3 py-2 text-foreground text-center border-b border-border uppercase leading-7 tracking-wide mb-6">
        Newsletter
      </h3>
      <form className="flex flex-col gap-y-4 p-3">
        <Input
          type="email"
          placeholder="Email address"
          {...register("email")}
          required
          icon="MdMailOutline"
        />
        {errors.email && typeof errors.email.message === "string" && (
          <ErrorMessage message={errors.email.message} />
        )}
        <Formerror message={error} />
        <FormSuccess message={success} className="bg-white" />
        <Button
          type="submit"
          disabled={isPending}
          title={isPending ? "Subscribing..." : "Subscribe"}
        />
      </form>
    </div>
  );
};

export default Newsletter;
