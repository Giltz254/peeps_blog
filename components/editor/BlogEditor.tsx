import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "@/components/editor/Editor";
import { uploadImage } from "@/actions";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import { showToast } from "@/components/Toastify";
import { Button } from "../ui/button";
const EditorJS = dynamic(() => import("@/components/editor/EditorJsElement"), {
  ssr: false,
});

const BlogEditor = () => {
  let {
    blog,
    blog: { title, banner, content },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);
  const [isUpLoading, setIsUpLoading] = useState<boolean>(false);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.includes("image")) {
      showToast(
        "error",
        <p className="text-sm font-normal text-destructive-foreground">
          upload a valid image!
        </p>
      );
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);
    let result = await new Promise<string>((resolve) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
    setIsUpLoading(true);
    try {
      const uploadImageUrl = await uploadImage(result);
      const imageUrl = uploadImageUrl.url;
      setBlog({ ...blog, banner: imageUrl });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsUpLoading(false);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };
  useEffect(() => {
    const textarea = document.getElementById("title") as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [blog.title]);
  const handlePublishEvent = () => {
    let hasErrors = false;
    if (!banner.length) {
      hasErrors = true;
      showToast(
        "error",
        <p className="text-sm font-normal text-destructive/30">
          upload a banner!
        </p>
      );
    } else if (!title.length) {
      hasErrors = true;
      if (titleTextareaRef.current) {
        titleTextareaRef.current.focus();
      }
      showToast(
        "error",
        <p className="text-sm font-normal text-destructive-foreground">
          Provide a title!
        </p>
      );
    } else if (!content.length) {
      hasErrors = true;
      showToast(
        "error",
        <p className="text-sm font-normal text-destructive-foreground">
          Fill in blog content!
        </p>
      );
    }
    if (!hasErrors) {
      setEditorState("publish");
    }
  };
  const handleDraft = async () => {};
  return (
    <section className="bg-transparent w-full overflow-x-auto">
      <div className="w-full sticky z-10 top-0 left-0 bg-card border-b px-2 sm:px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <h2 className="text-base font-normal text-secondary-foreground capitalize">Create Post</h2>
        <div className="flex items-center gap-4 flex-nowrap">
          <Button className="rounded-full hover:opacity-80 transition-opacity duration-300 ring-2 ring-primary/50" variant={"default"} onClick={handlePublishEvent}>
            Publish
          </Button>
          <Button className="rounded-full" onClick={handleDraft} variant={"outline"}>
            Save Draft
          </Button>
        </div>
      </div>
      <div className="w-full overflow-y-auto child h-[calc(100vh-160px)] pt-20 pb-20 bg-white px-2 sm:px-4 md:px-6 ">
        <div className="max-w-[900px] mx-auto">
          <div className="relative aspect-video max-sm:w-full h-64 block mx-auto rounded-lg bg-white border-2 overflow-hidden border-grey hover:opacity-[80%]">
            {isUpLoading ? (
              <Loader className="absolute bg-grey right-0 left-0 top-0 bottom-0 flex items-center justify-center" />
            ) : (
              <label
                htmlFor="uploadBanner"
                className="w-full h-full absolute top-0 left-0 right-0 bottom-0"
              >
                <Image
                  src={banner || "/banner.png"}
                  fill
                  alt="banner"
                  priority
                  className="object-center object-cover z-[5] w-auto h-auto"
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            )}
          </div>
          <textarea
            id="title"
            defaultValue={title}
            ref={titleTextareaRef}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            placeholder="Title of your story"
            className="text-4xl resize-none overflow-hidden w-full px-4 py-2 transition duration-300 ease-in-out mt-10 mb-4 bg-white h-20 rounded-md outline-0 placeholder:text-black"
          ></textarea>
          {textEditor.isReady === false && (
            <Loader className="aspect-video flex items-center justify-center bg-grey" />
          )}
          <EditorJS
            setTextEditor={setTextEditor}
            blog={blog}
            setBlog={setBlog}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogEditor;
