"use client";
import React, { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";

const MenuToggle = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 991);
    };
    if (typeof window !== "undefined") {
      setIsSmallScreen(window.innerWidth < 991);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const aside = document.body.querySelector<HTMLDivElement>("#side");
    if (aside) {
      if (isSmallScreen) {
        aside.classList.add("hide");
      } else {
        aside.classList.remove("hide");
        aside.classList.remove("show");
      }
    }
  }, [isSmallScreen]);

  const handleToggle = () => {
    const aside = document.body.querySelector<HTMLDivElement>("#side");
    if (isSmallScreen) {
      if (aside) {
        if (aside.classList.contains("hide")) {
          aside.classList.remove("hide");
          aside.classList.add("show");
        } else {
          aside.classList.remove("show");
          aside.classList.add("hide");
        }
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const aside = document.body.querySelector<HTMLDivElement>("#side");
    if (aside && isSmallScreen) {
      if (
        !aside.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        aside.classList.remove("show");
        aside.classList.add("hide");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSmallScreen]);

  return (
    <button
      ref={buttonRef}
      className="fixed top-16 z-40 mt-2 cursor-pointer h-10 w-10 p-[4px] text-white border border-muted rounded-lg drop-shadow-sm bg-primary left-2 lg:hidden max-lg:block"
      onClick={handleToggle}
    >
      <Menu size={24} className="w-full h-full" />
    </button>
  );
};

export default MenuToggle;
