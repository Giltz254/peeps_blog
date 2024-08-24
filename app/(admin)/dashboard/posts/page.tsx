import { Post_Per_Page } from "@/actions";
import { getBlogs } from "@/actions/get-posts";
import { DataTableDemo } from "@/components/backend/Table";

const page = async ({searchParams}: { searchParams: { page: string }}) => {
  const page = parseInt(searchParams.page) || 1;
  const blogs = await getBlogs(page);
  const totalPages = Math.ceil(blogs.total/Post_Per_Page)
  return (
    <div className="bg-muted h-[calc(100vh-64px)] w-full">
      <div className="bg-white child rounded-md shadow-lg max-sm:p-2 sm:p-6 max-sm:my-2 max-sm:mx-2 sm:mx-6 sm:my-4 h-[calc(100vh-96px)] overflow-y-auto">
        <DataTableDemo blogs={blogs.blogs} totalPages={totalPages} page={page} />
      </div>
    </div>
  );
};

export default page;
