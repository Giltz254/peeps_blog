import { Post_Per_Page } from "@/actions";
import { getBlogs } from "@/actions/get-posts";
import { getTrendingPosts } from "@/actions/get-trending";
import { getUniqueTags } from "@/actions/get-unique-tags";
import Aside from "@/components/frontend/Aside";
import Blog from "@/components/frontend/Blog";
import MenuToggle from "@/components/frontend/MenuToggle";
import RightBar from "@/components/frontend/RightBar";
import Pagination from "@/components/Pagination";

export default async function Home({searchParams}: { searchParams: { page: string }}) {
  const page = parseInt(searchParams.page) || 1;
  const blogs = await getBlogs(page);
  const uniqueTags = await getUniqueTags();
  const trending = await getTrendingPosts()
  const totalPages = Math.ceil(blogs.total/Post_Per_Page)
  return (
    <div className="min-h-screen bg-white">
      <div className=" flex flex-row w-full min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
        <Aside />
        <div className="flex flex-1 w-full max-xl:flex-col min-h-screen">
          <MenuToggle />
          
          <div className="xl:flex-1 pt-16 flex overflow-x-hidden flex-col max-lg:w-full bg-white">
            <Blog blogs={blogs.blogs} />
            {totalPages > 1 && <Pagination totalPages={totalPages} page={page} />}
          </div>
          <RightBar tags={uniqueTags.uniqueTags} title="Popular articles" trendingblogs={trending.trending} />
        </div>
      </div>
    </div>
  );
}
