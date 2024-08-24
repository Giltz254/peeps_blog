import { UniqueTag } from "@/types/index";
import Link from "next/link";

interface tagProps {
  tags: UniqueTag[]
}
const Tags = ({tags}: tagProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium uppercase leading-7 text-foreground mb-6">
        Recommended Topics
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {
          tags.map((tag: UniqueTag, i: number) => (
            <Link key={i} href={`/tags/${tag.tag}`} className="px-2 py-1 border border-border rounded-[4px] transition-all duration-300 text-sm font-normal text-black hover:bg-muted">{tag.tag}</Link>
          ))
        }
        
      </div>
    </div>
  );
};

export default Tags;
