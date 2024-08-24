"use client";
import { ToastContainer, Slide, ToastContent, ToastOptions, toast, Id } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
export const defaultToastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  };
  
  type ToastType = "success" | "error" | "info" | "warning" | "default";
  
  export const showToast = (
    type: ToastType,
    content: ToastContent,
    options: Partial<ToastOptions> = {},
  ): Id => {
    const optionsToApply = { ...defaultToastOptions, ...options };
  
    switch (type) {
      case "success":
        return toast.success(content, optionsToApply);
      case "error":
        return toast.error(content, optionsToApply);
      case "info":
        return toast.info(content, optionsToApply);
      case "warning":
        return toast.warn(content, optionsToApply);
      case "default":
        return toast(content, optionsToApply);
      default:
        return toast(content, optionsToApply);
    }
  };