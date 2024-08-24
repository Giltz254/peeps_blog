import { getFullDay } from "@/actions";
import { Blog } from "@/types/index";
import Image from "next/image";
import BlogContent from "@/components/BlogContent";
interface singleBlogProps {
  blog: Blog | undefined;
}
const SingleBlog = ({ blog }: singleBlogProps) => {
  return (
    <>
      {blog ? (
        <div className="flex flex-col w-full px-4">
          <div className="relative aspect-video mt-4 border border-border bg-muted">
            <Image
              src={blog.banner}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 991px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold my-4 text-black text-wrap leading-9 max-sm:text-xl">{blog.title}</h2>
          <div className="flex items-center gap-2">
            {blog.authorDetails.image ? (
              <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-border bg-grey">
                <Image
                  src={blog.authorDetails.image}
                  fill
                  alt={blog.authorDetails.name}
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ) : (
              <div className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden ring-2 ring-border bg-secondary text-white text-xl uppercase font-bold">
                {blog.authorDetails.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col items-start">
              <span className="capitalize text-base text-black font-medium">
                {blog.authorDetails.name}
              </span>
              <span className="font-medium text-dark capitalize">
                Published on: {getFullDay(new Date(blog.createdAt))}
              </span>
            </div>
          </div>
          <div className="content">
            {
                blog.content?.map((blog, i) => (
                    <div key={i} className="my-4 md:my-8">
                        <BlogContent blog={blog} />
                    </div>
                ))
            }
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full px-4 mt-10 animate-pulse">
          <div className="relative aspect-video border border-border bg-gray-200 h-48"></div>
          <div className="h-8 bg-gray-200 rounded w-full my-4"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="flex flex-col items-start">
              <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="content">
            <div className="h-8 bg-gray-200 rounded w-full my-4"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
