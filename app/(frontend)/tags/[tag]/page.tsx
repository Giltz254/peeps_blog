import { Post_Per_Page } from "@/actions";
import { getCategoryData } from "@/actions/get-category-posts";
import { getTrendingPosts } from "@/actions/get-trending";
import { getUniqueTags } from "@/actions/get-unique-tags";
import Aside from "@/components/frontend/Aside";
import Blog from "@/components/frontend/Blog";
import MenuToggle from "@/components/frontend/MenuToggle";
import RightBar from "@/components/frontend/RightBar";
import Pagination from "@/components/Pagination";
import { DEFAULT_WEBSITE_URL } from "@/constants";
import { notFound } from "next/navigation";
// export async function generateStaticParams() {
//   const response = await fetch(`${DEFAULT_WEBSITE_URL}/api/tags`, {
//     next: { tags: ["blog"]}
//   })
//   if (!response.ok) {
//     return [];
//   }
//   const tags = await response.json();
//   return tags
// }
export default async function Tags({ params, searchParams }: { params: { tag: string }, searchParams: { page: string } }) {
  const { tag } = params;
  const page = parseInt(searchParams.page) || 1;
  const blogs = await getCategoryData(tag, page);
  const uniqueTags = await getUniqueTags();
  const trending = await getTrendingPosts()
  if(!blogs || !blogs.total || !blogs.blogs) {
    notFound()
  }
  const totalPages = Math.ceil(blogs.total / Post_Per_Page);
  return (
    <div className="min-h-screen">
      <div className=" flex flex-row w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Aside />
        <div className="flex flex-1 w-full max-xl:flex-col min-h-screen">
          <MenuToggle />

          <div className="xl:flex-1 pt-16 flex overflow-x-hidden flex-col max-lg:w-full bg-white">
          <div className="bg-ndigo-500 h-10 w-full text-white text-center flex items-center justify-center text-xl font-bold uppercase">
            {tag}
          </div>
            <Blog blogs={blogs.blogs} />
            {totalPages > 1 && (
              <Pagination totalPages={totalPages} page={page} />
            )}
          </div>
          <RightBar
            tags={uniqueTags.uniqueTags}
            title="Trending"
            trendingblogs={trending.trending}
          />
        </div>
      </div>
    </div>
  );
}
