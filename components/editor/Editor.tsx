'use client';
import React, { createContext, useEffect, useState } from "react";
import BlogEditor from "@/components/editor/BlogEditor";
import PublishForm from "@/components/editor/PublishForm";

interface BlogStructure {
  title: string;
  banner: string;
  content: string[];
  tags: string[];
  des: string;
  author: string;
}
interface EditorContextType {
  blog: BlogStructure;
  setBlog: React.Dispatch<React.SetStateAction<BlogStructure>>;
  editorState: string;
  setEditorState: React.Dispatch<React.SetStateAction<string>>;
  textEditor: { isReady: boolean };
  setTextEditor: React.Dispatch<React.SetStateAction<{ isReady: boolean }>>;
}
export const EditorContext = createContext<EditorContextType>({
  blog: {
    title: "",
    banner: "",
    content: [],
    tags: [],
    des: "",
    author: "",
  },
  setBlog: () => {},
  editorState: "",
  setEditorState: () => {},
  textEditor: { isReady: false },
  setTextEditor: () => {},
});
const MainEditor = ({ data, slug }: { data?: any, slug?: string} ) => {
  const [blog, setBlog] = useState<BlogStructure>({
    title: "",
    banner: "",
    content: [],
    tags: [],
    des: "",
    author: "",
  });
  if (slug) {
    useEffect(() => {
      if (slug && data) {
        setBlog(data)
      }
    },[data])
  }
  const [editorState, setEditorState] = useState("editor" || "publish");
  const [textEditor, setTextEditor] = useState({ isReady: false })
  return (
    <div className="w-full relative">
      <EditorContext.Provider
        value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}
      >
        {editorState === "editor" ? <BlogEditor /> : <PublishForm slug={slug} />}
      </EditorContext.Provider>
    </div>
  );
};

export default MainEditor;
