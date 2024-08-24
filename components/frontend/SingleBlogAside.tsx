import Newsletter from "./Newsletter";
import Toc from "./Toc";
const SingleBlogAside = () => {
  return (
    <div
      id="side"
      className="lg:w-[300px] min-w-[300px] child max-lg:border-0 h-[calc(100vh-64px)] max-lg:fixed lg:sticky max-lg:pt-16  left-0 top-16 px-4 bg-white border-r flex flex-col gap-y-4 overflow-y-auto pb-8"
    >
      <Toc selector=".content" />
      <Newsletter />
    </div>
  );
};

export default SingleBlogAside;