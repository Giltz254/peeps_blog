"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import Formerror from "@/components/Form-error";

const EmailActivation = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) {
    return null
  }
  const hasSubmitted = useRef(false);

  const onSubmit = useCallback(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
        if (data?.success) {
          setTimeout(() => {
            router.push("/sign-in");
          }, 3000);
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-border p-8 rounded-lg shadow-lg text-center w-full max-w-md ">
        <h2 className="text-2xl font-bold capitalize mb-4">
          {success ? "Email Activated" : "Email Verification Status"}
        </h2>
        <div className="mb-4 flex items-center justify-center">
          <Image
            src={success ? "/success.png" : "/logo.png"}
            alt="Account Activated"
            width={64}
            height={64}
            className="object-cover rounded-full overflow-hidden"
          />
        </div>
        {success && (
          <p className="text-dark mb-6">
            Thank you, your email has been verified. Your account is now active.
            Please use the link below to login to your account if not redirected
            automatically.
          </p>
        )}
        {success && (
         <button>Login</button>
        )}
        {success && (
          <p className="text-dark text-sm font-medium mt-6">
            Thank you for Joinining JSPEEPS Community.
          </p>
        )}
        {error && (
          <Formerror message={error} />
        ) 
       } { !error && !success &&(
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-dark-grey border-2 rounded-full"></div>
              <div className="w-20 h-20 border-ndigo-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>

            <div className="relative">
              <div className="w-10 h-10 border-dark-grey border-2 rounded-full"></div>
              <div className="w-10 h-10 border-ndigo-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>

            <div className="relative">
              <div className="w-5 h-5 border-dark-grey border-2 rounded-full"></div>
              <div className="w-5 h-5 border-ndigo-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default EmailActivation;
