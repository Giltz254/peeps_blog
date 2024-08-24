// components/Navbar.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, MouseEvent } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SearchPopup from "./Search";
import { useCurrentUser } from "@/hooks/use-current-user";
import Profile from "./Profile";
import NavLinks from "@/components/navbar/NavLinks"; // Import NavLinks
import { SessionProps } from "@/types/index";
import MobileNavLinks from "../navbar/MobileNavLinks";

export default function Navbar() {
  const router = useRouter();
  const session = useCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileOpenMobile, setIsProfileOpenMobile] = useState(false);

  const menuRef = useRef<HTMLButtonElement>(null);
  const profileToggleRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileToggleMobileRef = useRef<HTMLButtonElement>(null);
  const profileMenuMobileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
    setIsProfileOpenMobile(false);
  };

  const handleOutsideClick = (event: Event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      !menuRef.current?.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white border-b border-border fixed top-0 left-0 w-full z-50 h-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div
              onClick={() => router.push("/")}
              className="relative cursor-pointer flex-shrink-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-muted"
            >
              <Image
                src={"/logo.png"}
                alt="Jspeeps"
                fill
                sizes="48px"
                priority
                className="object-cover rounded-full"
              />
            </div>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex md:items-center md:space-x-4 ml-10">
              <NavLinks /> {/* Render NavLinks for desktop */}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:flex items-center">
            <SearchPopup />
          </div>

          {/* Profile & Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {session ? (
              <Profile
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
                profileToggleRef={profileToggleRef}
                profileMenuRef={profileMenuRef}
              />
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push("/sign-in")}
                  className="bg-primary text-white cursor-pointer px-6 py-2 h-12 hover:bg-primary/80 transition-opacity duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="group relative z-0 h-12 border border-border hover:border-0 overflow-hidden overflow-x-hidden bg-white px-6 py-2 text-black hover:text-white transition-all duration-500"
                >
                  <span className="relative z-10 text-sm font-medium">
                    Sign up
                  </span>
                  <span className="absolute inset-0 overflow-hidden">
                    <span className="absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-primary transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-6">
            <div className="relative flex items-center">
              <SearchPopup />
            </div>
            <button
              ref={menuRef}
              className="text-secondary-foreground rounded-md text-black flex items-center justify-center box-content h-12 w-12 focus:outline-none"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? (
                <FiX size={32} />
              ) : (
                <FiMenu size={32} />
              )}
            </button>
            {session ? (
              <Profile
                isProfileOpen={isProfileOpenMobile}
                setIsProfileOpen={setIsProfileOpenMobile}
                profileToggleRef={profileToggleMobileRef}
                profileMenuRef={profileMenuMobileRef}
              />
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push("/sign-in")}
                  className="bg-primary text-sm font-medium text-white cursor-pointer px-6 py-2 h-12 hover:bg-primary/80 transition-opacity duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="group relative z-0 h-12 border border-border hover:border-0 overflow-hidden overflow-x-hidden bg-white px-6 py-2 text-sm font-medium text-black hover:text-white transition-all duration-500"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className={`md:hidden max-[300px]:w-full px-4 w-[300px] h-[100vh] space-y-2 fixed top-0 left-0 bg-white drop-shadow-sm border border-muted z-[60]
                transform transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
          >
            <div className="flex justify-between items-center py-4">
              <div
                onClick={() => router.push("/")}
                className="relative cursor-pointer flex-shrink-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-muted"
              >
                <Image
                  src={"/logo.png"}
                  alt="Jspeeps"
                  fill
                  sizes="48px"
                  priority
                  className="object-cover rounded-full"
                />
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <MobileNavLinks /> {/* Render NavLinks for mobile */}
          </div>
        )}
      </div>
    </nav>
  );
}
