const Skeleton = () => {
  return (
    <div className="bg-white mx-4 px-8 flex flex-col md:flex-row items-center border py-4 gap-4 animate-pulse">
      <div className="relative h-32 w-32 min-h-32 min-w-32 overflow-hidden rounded-full bg-gray-200 ring-2"></div>
      <div className="flex flex-col gap-y-4 text-center">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="mt-2">
          <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
