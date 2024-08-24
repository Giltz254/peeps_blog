import MainEditor from "@/components/editor/Editor";
import React from "react";

const page = () => {
  return (
    <div className="bg-muted h-[calc(100vh-64px)] w-full">
      <div className="bg-white overflow-hidden rounded-md shadow-lg max-sm:my-2 max-sm:mx-2 sm:mx-6 sm:my-4 h-[calc(100vh-96px)]">
        <MainEditor />
      </div>
    </div>
  );
};

export default page;
