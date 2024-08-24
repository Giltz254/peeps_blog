"use client";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import { Tools } from "@/components/editor/Tools";
interface BlogStructure {
  title: string;
  banner: string;
  content: any[];
  tags: string[];
  des: string;
  author: string;
}
interface BlogEditorProps {
  setTextEditor: React.Dispatch<React.SetStateAction<{ isReady: boolean }>>;
  blog: BlogStructure,
  setBlog: React.Dispatch<React.SetStateAction<BlogStructure>>,
}
const EditorJsElement = ({ setTextEditor, blog, setBlog}: BlogEditorProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "textEditor",
        data: {
          blocks: blog.content,
        },
        tools: Tools,
        placeholder: "Write something...",
        onChange: async () => {
          const savedData = await editorRef.current?.save();
          if (savedData) {
            const blocks = savedData.blocks;
            setBlog(prevBlog => ({
              ...prevBlog,
              content: blocks,
            }));
          }
        },
        onReady: () => {
          setTextEditor({isReady: true})
        },
      });
    }
  }, []);
  return <div id="textEditor" className="mt-4 bg-white border border-muted rounded-md"></div>;
};

export default EditorJsElement;
