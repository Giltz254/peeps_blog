import { getDay } from "@/actions";
import { Blog } from "@/types/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdTrendingUp } from "react-icons/io";
interface trendingBlogsProps {
  trendingblogs: Blog[] | undefined;
  title: string;
}

const Trending = ({ trendingblogs, title }: trendingBlogsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold capitalize flex items-center gap-2 leading-7 text-black mb-6">
        {title}
      </h3>
      <div className="w-full">
        {trendingblogs ? (
          trendingblogs.map((blog, i) => (
            <Link
              title={blog.title}
              key={i}
              href={`/blog/${blog.slug}`}
              className={`flex group border-b border-b-muted transition-all py-2 duration-500 items-start justify-start w-full gap-4 blogItem`}
              style={{ animationDelay: `${i * 0.2}s`, opacity: 0 }}
            >
              <div className="relative min-h-20 min-w-20 h-20 w-20 overflow-hidden">
                <Image
                  src={blog.banner}
                  fill
                  alt={blog.title}
                  className="object-cover"
                  sizes="(max-width: 991px) 30vw, (max-width: 1200px) 30vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base group-hover:text-primary transition-colors duration-300 text-black text-pretty font-normal line-clamp-3">
                  {blog.title}
                </h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 text-white justify-center w-8 h-8 rounded-full bg-primary/70">
                    <span className="text-base font-bold">
                      {blog.authorDetails.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-black">
                      {blog.authorDetails.name}
                    </span>
                    <div className="flex items-center gap-2 text-dark">
                      <span className="text-xs text-muted-foreground font-semibold">
                        {getDay(blog.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex hover:bg-gray-200 transition-all duration-500 py-2 items-start justify-start w-full gap-4 animate-pulse">
            <div className="relative min-h-20 min-w-20 h-20 w-20 overflow-hidden bg-gray-200"></div>
            <div className="flex flex-col gap-2 w-2/3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                <div className="w-4 h-1 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                <div className="w-4 h-1 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
