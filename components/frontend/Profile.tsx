import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect } from "react";

interface ProfileProps {
  isProfileOpen: boolean;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileToggleRef: React.RefObject<HTMLButtonElement>;
  profileMenuRef: React.RefObject<HTMLDivElement>;
}

export default function Profile({
  isProfileOpen,
  setIsProfileOpen,
  profileToggleRef,
  profileMenuRef,
}: ProfileProps) {
  const session = useCurrentUser();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !profileMenuRef.current?.contains(target) &&
        !profileToggleRef.current?.contains(target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, [profileMenuRef, profileToggleRef, setIsProfileOpen]);

  return (
    <div className="relative">
      <button
        ref={profileToggleRef}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={(e) => {
          e.preventDefault();
          setIsProfileOpen(!isProfileOpen);
        }}
      >
        {session?.image ? (
          <Image
            src={session.image}
            width={48}
            height={48}
            sizes="48px"
            alt={session.name || "User profile"}
            className="object-cover rounded-full box-border h-12 w-12 ring-2 ring-accent bg-accent"
          />
        ) : (
          <div className="h-[48px] w-[48px] rounded-full bg-foreground box-border ring-2 ring-muted-foreground flex items-center justify-center">
            <p className="text-3xl text-white uppercase font-bold">
              {session?.name?.charAt(0)}
            </p>
          </div>
        )}
      </button>
      {isProfileOpen && (
        <div
          className="absolute p-4 right-0 mt-4 w-72 bg-white border border-muted rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out"
          ref={profileMenuRef}
        >
          <div className="p-4 flex items-center justify-center flex-col gap-y-4">
            {session?.image ? (
              <Image
                src={session?.image || "/default-profile.png"}
                width={56}
                height={56}
                alt="User avatar"
                className="object-cover rounded-full h-14 w-14 ring-2 ring-muted"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-foreground text-white font-bold flex items-center justify-center text-4xl ring-2 ring-card-foreground">
                {session?.name?.charAt(0)}
              </div>
            )}
            <span className="block text-lg font-normal uppercase">
              {session?.name}
            </span>
          </div>
          <Link
            href="/profile"
            className="block px-4 py-2 text-black hover:text-muted-foreground text-base font-normal transition-colors duration-300"
          >
            Profile
          </Link>
          {session?.role === "ADMIN" && (
            <Link
              href="/editor"
              className="block px-4 py-2 text-black hover:text-muted-foreground text-base font-normal transition-colors duration-300"
            >
              Write
            </Link>
          )}
          <Link
            href="/settings"
            className="block px-4 py-2 text-black hover:text-muted-foreground text-base font-normal transition-colors duration-300"
          >
            Settings
          </Link>
          <button
            onClick={() => signOut()}
            className="block px-4 py-2 border-t w-full text-start text-black hover:text-muted-foreground transition-colors duration-300"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
