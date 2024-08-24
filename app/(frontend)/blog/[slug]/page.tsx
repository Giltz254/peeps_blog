import { getData } from "@/actions/get-single-blog";
import BlogInteraction from "@/components/frontend/BlogInteraction";
import BlogShare from "@/components/frontend/BlogShare";
import MenuToggle from "@/components/frontend/MenuToggle";
import RightBar from "@/components/frontend/RightBar";
import SingleBlog from "@/components/frontend/SingleBlog";
import SingleBlogAside from "@/components/frontend/SingleBlogAside";
import { DEFAULT_WEBSITE_URL } from "@/constants";
import { currentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
type BlogSlug = {
  slug: string;
};
// export async function generateStaticParams() {
//   const response = await fetch(`${DEFAULT_WEBSITE_URL}/api/blog/slug`, {
//     next: { tags: ["blogs"] },
//   });
//   if (!response.ok) {
//     return [];
//   }
//   const slugs: BlogSlug[] = await response.json();
//   return slugs.map((slug) => ({
//     slug: slug.slug,
//   }));
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { singleblog: blog } = await getData({ slug });
  return {
    title: blog ? blog.title : "",
    description: blog ? blog.des : "",
    openGraph: {
      images: [
        {
          url: blog ? blog.banner : "",
        },
      ],
    },
  };
}
const Singlepage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const session = await currentUser();
  const userId = session?._id.toString();
  const { singleblog: blog, similarBlogs: similar } = await getData({ slug });
  if (!blog || !blog.title) {
    notFound();
  }
  return (
    <div className="min-h-screen">
      <div className=" flex flex-row w-full min-h-screen mx-auto px-4 sm:px-6 lg:px-8 container">
        <SingleBlogAside />
        <div className="flex flex-1 w-full max-xl:flex-col min-h-screen">
          <MenuToggle />
          <div className="xl:flex-1 pt-16 flex  overflow-x-hidden flex-col max-lg:w-full bg-white">
            <SingleBlog blog={blog} />
            <BlogShare
              tags={blog.tags}
              imageUrl={blog.banner}
              url={slug}
              title={blog.title}
              des={blog.des}
            />
            <BlogInteraction
              title={blog && blog.title}
              blog_id={slug}
              postId={blog && blog._id}
              loggedInUser={userId}
              author={blog && blog.author.toString()}
              total_likes={blog && blog.total_likes}
            />
          </div>
          <RightBar
            title={similar.length ? "Similar Blogs" : ""}
            trendingblogs={similar}
          />
        </div>
      </div>
    </div>
  );
};

export default Singlepage;
