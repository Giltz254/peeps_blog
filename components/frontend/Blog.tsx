import { Blog as uniqueBlog } from "@/types/index";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { getDay } from "@/actions";
import { CiHashtag } from "react-icons/ci";

type BlogProps = {
  blogs: uniqueBlog[] | undefined;
};

const Blog = ({ blogs }: BlogProps) => {
  return (
    <div className="mt-10">
      {blogs ? (
        blogs.map((blog, i) => (
          <Link
            key={i}
            href={`/blog/${blog.slug}`}
            className={`bg-white group relative px-8 flex max-md:flex-col flex-row max-md:items-center py-4 items-start gap-4 pb-10 ${
              i === blogs.length - 1 ? "" : "border-border border-b"
            } blogItem`}
            style={{ animationDelay: `${i * 0.2}s`, opacity: 0 }}
          >
            <div className="relative h-32 w-32 min-h-32 min-w-32 overflow-hidden rounded-full bg-muted ring-2 ring-border">
              <Image
                sizes="(max-width: 991px) 30vw, (max-width: 1200px) 30vw, 33vw"
                src={blog.banner}
                alt={blog.title}
                fill
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-y-4 max-md:text-center">
              <h3 className="text-xl group-hover:text-primary transition-colors duration-300 first-letter:capitalize text-pretty font-medium leading-8 text-black">
                {blog.title}
              </h3>
              <div className="flex flex-wrap items-center max-md:justify-center gap-4">
                <div className="flex items-center justify-center gap-2">
                  <CalendarDays size={20} />
                  <span className="text-sm font-medium text-dark">
                    {getDay(blog.createdAt)}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <CiHashtag size={24} />
                  <span className="text-sm font-medium capitalize">
                    {blog.tags[0]}
                  </span>
                </div>
              </div>
              <p className="text-wrap first-letter:capitalize text-foreground text-base font-normal line-clamp-3 leading-7">
                {blog.des}
              </p>
              <div className="absolute left-0 -top-9 mb-2 hidden group-hover:block bg-accent text-black text-sm max-sm:px-6 sm:px-4 py-1 mx-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform group-hover:translate-y-2">
                {blog.des}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Blog;
