import { useContext, useRef, useState, useTransition } from "react";
import { EditorContext } from "@/components/editor/Editor";
import Image from "next/image";
import Tag from "@/components/editor/Tag";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Input from "@/components/frontend/Input";
import { showToast } from "@/components/Toastify";
import { publishBlogAction } from "@/actions/publish";
import { Button } from "../ui/button";

const PublishForm = ({ slug }: { slug?: string }) => {
  const router = useRouter();
  let characterLimit = 200;
  let tagLimit = 10;
  let {
    blog,
    blog: { title, banner, des, content, tags },
    setBlog,
    setEditorState,
  } = useContext(EditorContext);
  const [loading, setLoading] = useState(false);
  const tagRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const desRef = useRef<HTMLTextAreaElement>(null);
  const handleBlogTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };
  const handleBlogDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let inputElement = e.target as HTMLInputElement;
      let tag = inputElement.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        showToast("error", <p>You can only add a maximum of 10 tags.</p>);
        if (tagRef.current) {
          tagRef.current.focus();
        }
      }
      inputElement.value = "";
    }
  };
  const publishBlog = async () => {
    setLoading(true);
    const blogObj = {
      title,
      banner,
      des,
      content,
      tags,
      draft: false,
    };
    const result = await publishBlogAction({ blogObj, slug });
    if (result.success) {
      showToast("success", <p>{result.success}</p>);
      setLoading(false);
      router.push("/dashboard/posts");
    } else {
      showToast("error", <p>{result.error}</p>);
      setLoading(false);
    }
  };
  return (
    <section className="w-full  bg-white  grid items-center lg:grid-cols-1 lg:gap-4">
      <div className="w-full sticky z-10 top-0 left-0 bg-white border-b px-2 sm:px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <h2 className="text-base font-normal text-secondary-foreground capitalize">
          Publish Post
        </h2>
        <div className="flex items-center gap-4 flex-nowrap">
          <Button
            className="rounded-full hover:opacity-80 transition-opacity duration-300 ring-2 ring-primary/50"
            variant={"default"}
            onClick={publishBlog}
          >
             {slug
              ? loading
                ? "Updating"
                : "Save Changes"
              : loading
              ? "Publishing"
              : "Publish"}
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto child h-[calc(100vh-160px)] px-2 sm:px-4 md:px-6">
        <button
          onClick={() => setEditorState("editor")}
          className="absolute right-0 mr-4 sm:mr-6 lg:mr-8 mt-2 h-12 w-12 text-white bg-primary ring-2 ring-primary/60 flex items-center justify-center cursor-pointer z-10 top-16 rounded-full"
        >
          <X size={24} />
        </button>
        <div className="mt-10 max-w-[900px] mx-auto">
          <div className="relative aspect-video max-sm:w-full h-64 block mx-auto rounded-lg bg-muted border overflow-hidden border-border hover:opacity-[80%]">
            <Image src={banner} fill alt="banner" className="object-cover" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="line-clamp-2 text-xl leading-7 mt-4">{des}</p>
        </div>
        <div className="border-grey lg:border-1 max-w-[900px] mx-auto mb-10">
          <p className="text-black mb-2 mt-9 text-xl font-medium">Blog Title</p>
          <Input
            ref={titleRef}
            type="text"
            name="title"
            placeholder="Blog Title"
            defaultValue={title}
            onChange={handleBlogTitleChange}
            icon="LiaHeadingSolid"
          />
          <p className="text-black mb-2 mt-9 text-xl font-medium">
            Description
          </p>
          <textarea
            ref={desRef}
            onChange={handleBlogDesc}
            onKeyDown={handleTitleKeyDown}
            className="h-40 resize-none leading-7 w-[100%] outline-0 focus:ring-2 focus:ring-primary-foreground rounded-md p-4 bg-grey pl-4 border border-border focus:bg-white placeholder:text-black"
            maxLength={characterLimit}
            defaultValue={des}
          ></textarea>
          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - des.length} Characters remaining.
          </p>
          <p className="text-base font-medium leading-8 capitalize">
            Topics - (For SEO)
          </p>
          <div className="relative w-[100%] rounded-md p-4 bg-grey pl-2 py-2 border pb-4 border-border/20 focus:bg-transparent placeholder:text-muted-foreground">
            <Input
              ref={tagRef}
              name="tags"
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Topics"
              icon="MdOutlineTopic"
            />
            {tags.map((tag, i) => (
              <Tag tag={tag} tagIndex={i} key={i} />
            ))}
          </div>
          <p className="mt-1 mb-4 text-muted-foreground text-right">
            {tagLimit - tags.length} Tags left.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PublishForm;
