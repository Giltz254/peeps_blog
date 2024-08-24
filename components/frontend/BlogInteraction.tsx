"use client";
import { DEFAULT_WEBSITE_URL } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";

interface BlogObj {
  blog_id: string;
  total_likes: number;
  author: string;
  title: string;
  loggedInUser: string | undefined;
  postId: string;
}
const BlogInteraction = ({
  blog_id,
  total_likes,
  author,
  title,
  loggedInUser,
  postId
}: BlogObj) => {
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [totalLikes, setTotalLikes] = useState<number>(total_likes);
  const [sessionError, setSessionError] = useState("")
  const pathname = usePathname();
  useEffect(() => {
    if (loggedInUser) {
      fetch(`${DEFAULT_WEBSITE_URL}/api/blog/like?postId=${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setIsLikedByUser(data.isLikedByUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedInUser, postId]);

  const handleLike = async () => {
    if (loggedInUser) {
      setIsLikedByUser((prev) => !prev);
      isLikedByUser ? setTotalLikes((prev) => prev - 1) : setTotalLikes((prev) => prev + 1);

      const response = await fetch(`${DEFAULT_WEBSITE_URL}/api/blog/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        next: { tags: ['blogs']},
        body: JSON.stringify({ slug: blog_id, isLikedByUser, postId })
      })
      if (response.ok) {
        await fetch(`${DEFAULT_WEBSITE_URL}/api/revalidate`);
      }
    } else {
      setSessionError("Login to like!");
      setTimeout(() => {
        setSessionError("");
      }, 2000);
    }
  };
  
  return (
      <>
      <hr className="border-border my-2" />
      <div className="flex gap-6 justify-between px-4 mb-2 relative">
        <div className="flex gap-3 items-center">
          <button
            onClick={handleLike}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-grey outline-0 border-0"
          >
            {isLikedByUser === true ? (
              <FcLike className="text-dark" size={24} />
            ) : (
              <IoMdHeartEmpty size={24} />
            )}
          </button>
          <p className="text-xl text-dark">{totalLikes}</p>
        </div>
        <div className="flex gap-6 items-center">
          {loggedInUser === author && (
            <Link
              href={`/editor/${blog_id}`}
              className="underline hover:text-purple text-primary transition-all duration-300"
            >
              Edit
            </Link>
          )}
          <Link
            href={`https://twitter.com/intent/tweet?text=Read ${title}&url=${DEFAULT_WEBSITE_URL}${pathname}`}
            className="w-10 text-twitter hover:text-twitter/50 transition-colors duration-500 h-10 bg-grey rounded-full flex items-center justify-center"
          >
            <RiTwitterXFill size={24} />
          </Link>
        </div>
        {
            sessionError && (
                <p className="absolute text-sm bg-red-100/90 w-full left-0 -top-full text-red-400 py-1 z-10 px-2">{sessionError}</p>
            )
          }
      </div>
    </>
  );
};

export default BlogInteraction;
