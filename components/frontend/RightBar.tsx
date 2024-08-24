import Trending from "./Trending";
import Tags from "./Tags";
import Newsletter from "./Newsletter";
import { Blog, UniqueTag,  } from "@/types/index";

interface trendingBlogsProps {
  trendingblogs?: Blog[] | undefined;
  title?: string;
  tags?: UniqueTag[];
}

const RightBar = ({ trendingblogs, title, tags }: trendingBlogsProps) => {
  return (
    <div id="right" className="xl:w-[300px] xl:min-w-[300px]  max-xl:w-full pt-16 overflow-x-hidden bg-white lg:border-l border-muted">
      <div className="flex flex-col w-full px-4 my-10 gap-y-10">
        {trendingblogs && title && (
          <Trending title={title} trendingblogs={trendingblogs} />
        )}
        {tags && <Tags tags={tags} />}
        <Newsletter />
      </div>
    </div>
  );
};

export default RightBar;
