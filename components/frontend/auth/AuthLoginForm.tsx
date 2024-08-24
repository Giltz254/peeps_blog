"use client";
import Input from "../Input";
import { SlLock } from "react-icons/sl";
import { MdMailOutline } from "react-icons/md";
import Socials from "./Socials";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { login } from "@/actions/login";
import ErrorMessage from "./ErrorMessage";
import Formerror from "@/components/Form-error";
import FormSuccess from "@/components/Form-success";
import { useSearchParams } from "next/navigation";

type loginFormValues = z.infer<typeof LoginSchema>;
const AuthLoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Emil already in use with different provider"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: loginFormValues) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
            reset()
          }
          if (data?.success) {
            setSuccess(data?.success);
            reset()
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center  py-20 contain">
      <div className="max-w-md w-full bg-white p-8 rounded-lg drop-shadow-sm border border-border">
        <div className="flex flex-col items-center justify-center mb-4">
          <Image
            src={"/logo.png"}
            width={56}
            height={56}
            alt="Jspeeps"
            className="object-cover h-14 w-14 rounded-full ring-2 ring-muted-foreground"
          />
          <p className="font-bold text-xl text-black uppercase mt-2">
            Welcome back
          </p>
        </div>
        <Socials />
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted-foreground uppercase">
                or
              </span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
            <ErrorMessage message={errors.email.message} />
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
          </div>
          {errors.password && typeof errors.password.message === "string" && (
            <ErrorMessage message={errors.password.message} />
          )}
          <div className="flex w-full items-center">
            <Link
              href={"/reset-password"}
              className="text-primary underline hover:text-primary/80 transition-opacity duration-300 text-sm font-medium text-right w-full"
            >
              Forgot password
            </Link>
          </div>
          <Formerror message={error || urlError} />
            <FormSuccess message={success} />
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center gap-2 justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {
                isPending && <div className="border-4 border-border animate-spin w-[36px] h-[36px] rounded-full border-l-transparent">
                  </div>
              }
              {isPending ? "Signing in...": "Sign in to your account"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:text-foreground transition-colors duration-500"
          >
            Sign up
          </Link>
        </p>
      </div>
      <div className="hidden lg:flex flex-col items-center justify-center bg-white text-black p-6 rounded-lg drop-shadow-sm border border-border border-l-4 border-l-primary ml-8 max-w-md w-full">
        <h2 className="text-2xl uppercase text-black text-center font-bold">
          Welcome Back to Jspeeps community
        </h2>
        <p className="mt-4 text-center text-base font-medium text-foreground">
          Personalized, updated daily, and beautifully presented. Sign in to
          your account to find your daily insights and get full access to the
          platform's functionality.
        </p>
        <p className="mt-4 text-center text-muted-foreground">
          4k+ Javascript lovers joined us, now it’s your turn.
        </p>
      </div>
    </div>
  );
};

export default AuthLoginForm;
