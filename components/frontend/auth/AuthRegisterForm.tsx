"use client";
import Input from "../Input";
import Socials from "./Socials";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerUser } from "@/actions/register";
import * as z from "zod";
import ErrorMessage from "./ErrorMessage";
import Formerror from "@/components/Form-error";
import FormSuccess from "@/components/Form-success";

type registerFormValues = z.infer<typeof RegisterSchema>;
const AuthRegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm<registerFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      registerUser(values).then((data) => {
        if (data?.error) {
          setError(data?.error);
          reset()
        }
        if (data?.success) {
          setSuccess(data?.success);
          reset()
        }
      });
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center  py-20 contain">
      <div className="max-w-md w-full bg-white p-8 rounded-lg drop-shadow-sm border border-border">
        <div className="flex flex-col items-center justify-center mb-4">
        <Image src={"/logo.png"} width={56} height={56} alt="Jspeeps" className="object-cover h-14 w-14 rounded-full ring-2 ring-muted-foreground"  />
        <p className="font-bold text-xl text-black uppercase mt-2">Join Jspeeps</p>
        </div>
        <Socials />
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted-foreground uppercase">or</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="flex flex-col w-full space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Name
            </label>
            <Input
              placeholder="John Doe"
              {...register("name")}
              type="text"
              icon="LuUser2"
            />
          </div>
          
          {errors.name && typeof errors.name.message === "string" && (
                <ErrorMessage message={errors.name.message}/>
              )}
          <div className="flex flex-col w-full space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email address
            </label>
            <Input
              placeholder="jspeeps@gmail.com"
              icon="MdMailOutline"
              type="email"
              {...register("email")}
            />
          </div>
          {errors.email && typeof errors.email.message === "string" && (
                <ErrorMessage message={errors.email.message}/>
              )}
          <div className="flex flex-col w-full space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              placeholder="******"
              icon="SlLock"
              type="password"
              {...register("password")}
            />
            <div>
              <li className="list-disc text-xs text-muted-foreground font-normal">Password must be atleast 6 characters long</li>
              <li className="list-disc text-xs text-muted-foreground font-normal">Password must contain both uppercase and lowercase letters</li>
              <li className="list-disc text-xs text-muted-foreground font-normal">Password must not contain easily guessed personal information like your name, username, or birthdate</li>
            </div>
          </div>
          {errors.password && typeof errors.password.message === "string" && (
                <ErrorMessage message={errors.password.message}/>
              )}
               <Formerror message={error} />
               <FormSuccess message={success} />
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center gap-2 justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isPending && <div className="border-4 border-border animate-spin w-[36px] h-[36px] rounded-full border-l-transparent">
                </div> }
             {isPending ? "Creating": "Create account"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary hover:text-foreground transition-colors duration-500"
          >
            Sign in
          </Link>
        </p>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center bg-white text-black p-6 rounded-lg drop-shadow-sm border border-border border-l-4 border-l-primary ml-8 max-w-md w-full">
        <h2 className="text-2xl uppercase text-black text-center font-bold">
          Welcome to Jspeeps community
        </h2>
        <p className="mt-4 text-center text-base font-medium text-foreground">
          Personalized, updated daily, and beautifully presented. Create an
          account to find your dream new home and get full access to the
          platform's functionality.
        </p>
        <p className="mt-4 text-center text-muted-foreground">
          4k+ Javascript lovers joined us, now it’s your turn.
        </p>
      </div>
    </div>
  );
};

export default AuthRegisterForm;
