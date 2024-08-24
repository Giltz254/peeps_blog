import { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import { EditorContext } from "./Editor";

const Tag = ({ tag, tagIndex }: { tag: string; tagIndex: number }) => {
  let {
    setBlog,
    blog: { tags },
    blog,
  } = useContext(EditorContext);
  const handleTagDelete = () => {
    tags = tags.filter((t) => t !== tag);
    setBlog({ ...blog, tags });
  };
  const addEditable = (e: any) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };
  const handleTagEdit = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let currentTag = (e.target as HTMLParagraphElement).textContent || "";
      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags });

      const targetElement = e.target as HTMLElement;
      targetElement.setAttribute("contentEditable", "false");
    }
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 border bg-white rounded-full inline-block hover:bg-opacity-[50%] pr-8">
      <p className="outline-0" onKeyDown={handleTagEdit} onClick={addEditable}>
        {tag}
      </p>
      <button
        onClick={handleTagDelete}
        className="mt-[2px] rounded-full absolute right-2 top-1/2 -translate-y-1/2"
      >
        <IoIosClose size={20} className="pointer-events-none" />
      </button>
    </div>
  );
};

export default Tag;
