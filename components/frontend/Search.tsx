"use client";
import { DEFAULT_WEBSITE_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { IoDocumentTextOutline, IoSearchOutline } from "react-icons/io5";

interface BlogPost {
  slug: string;
  title: string;
  banner: string;
}

const SearchPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!searchTerm) {
          const response = await fetch("/api/search", {
            next: {tags: ["blogs"]}, cache: "force-cache"
          });
          const data: BlogPost[] = await response.json();
          setSearchResults(data);
        } else {
          const response = await fetch(
            `${DEFAULT_WEBSITE_URL}/api/search?query=${encodeURIComponent(searchTerm)}`, {
              next: {tags: ["blogs"]}, cache: "force-cache"
            }
          );
          const data: BlogPost[] = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        return [];
      } finally {
        setLoading(false);
      }
    })();
  }, [searchTerm]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchTerm("");
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      overlayRef.current &&
      overlayRef.current === e.target &&
      popupRef.current &&
      !popupRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node) &&
      closeButtonRef.current &&
      !closeButtonRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleKeyboardShortcuts = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      togglePopup();
    }
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyboardShortcuts);
      if (popupRef.current) {
        popupRef.current.classList.remove("translate-y-full", "bottom-0");
        popupRef.current.style.top = "100px";
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyboardShortcuts);
      if (popupRef.current) {
        popupRef.current.classList.remove("top-0");
        popupRef.current.classList.add("translate-y-full", "bottom-0");
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyboardShortcuts);
    };
  }, [isOpen]);

  return (
    <div className="">
      <button
        ref={buttonRef}
        onClick={togglePopup}
        className="flex justify-between max-md:rounded-full max-md:p-2 max-md:justify-center items-center w-full md:border md:border-border rounded-sm max-md:bg-transparent max-md:text-black md:bg-muted md:pl-2 md:py-2 focus:outline-none"
      >
        <span className="text-foreground text-base font-normal pr-8 hidden md:inline">
          Search articles...
        </span>
        <span className="text-sm font-medium bg-white py-0.5 px-1 rounded-md mr-1 hidden md:inline">
          CtrlK
        </span>
        <IoSearchOutline className="inline md:hidden" size={24} />
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-white opacity-20"
        />
      )}

      <div
        ref={popupRef}
        className={`fixed left-1/2 max-h-[calc(100vh-120px)] transform -translate-x-1/2 py-8 bg-white shadow-lg border border-border rounded-md w-full max-w-xl z-[50] transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-full'
        } bottom-0`}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            className="w-full border-0 border-b pl-6 pr-14 py-2 text-xl font-medium placeholder:text-muted-foreground focus:outline-0"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            ref={closeButtonRef}
            onClick={togglePopup}
            className="text-foreground border absolute right-0 top-1/2 -translate-y-1/2 mr-4 border-border py-0.5 px-1 rounded-md text-xs"
          >
            Esc
          </button>
        </div>

        <div className="mt-4 px-4">
          {loading ? (
           <div className="flex items-center justify-center flex-col gap-2">
             <div className="border-4 border-primary animate-spin w-12 h-12 rounded-full border-l-transparent">
             </div>
             <p className="text-base font-normal text-black">Loading...</p>
           </div>
          ) : searchResults.length > 0 ? (
            <ul className="space-y-2 overflow-y-auto child pb-4 max-h-[350px] flex flex-col gap-y-6">
              {searchResults.map((result, i) => (
                <Link
                  className={`flex items-center ${
                    i < searchResults.length - 1 ? "border-b border-b-muted pb-4" : ""
                  } gap-4`}
                  key={i}
                  href={`${DEFAULT_WEBSITE_URL}/blog/${result.slug}`}
                >
                  <IoDocumentTextOutline size={24} />
                  <h2 className="text-sm font-normal text-pretty">{result.title}</h2>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-base font-normal text-center text-destructive">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
