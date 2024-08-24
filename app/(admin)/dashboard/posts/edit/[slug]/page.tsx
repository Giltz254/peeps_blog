import { editBlog } from "@/actions/edit-blog";
import MainEditor from "@/components/editor/Editor";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  let mode = "edit";
  if (!slug) {
    return;
  }
  const { singleblog: data } = await editBlog({ slug, mode });
  return (
    <div className="bg-muted h-[calc(100vh-64px)] w-full">
      <div className="bg-white overflow-hidden rounded-md shadow-lg max-sm:my-2 max-sm:mx-2 sm:mx-6 sm:my-4 h-[calc(100vh-96px)]">
        <MainEditor data={data} slug={slug} />;
      </div>
    </div>
  );
};

export default page;
