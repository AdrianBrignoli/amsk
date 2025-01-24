export default function PostsSkeleton() {
  return (
    <section className="flex flex-col bg-black bg-opacity-30 text-white my-2 pl-6 p-4 rounded-2xl relative hover:bg-opacity-50 news-component">
      <div className="flex flex-col space-y-4 py-4">
        <div className="flex align-center">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-md"></div>
          <div className="w-2/5 h-6 bg-black bg-opacity-20 ml-4 rounded-md pulse-gradient"></div>
        </div>
        <div className="flex align-center">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-md"></div>
          <div className="w-1/5 h-6 bg-black bg-opacity-20 ml-4 rounded-md pulse-gradient"></div>
        </div>
        <div className="flex align-center text-gray-400">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-md"></div>
          <div className="w-4/5 h-6 bg-black bg-opacity-20 ml-4 rounded-md pulse-gradient"></div>
        </div>
      </div>
    </section>
  );
}

export const RenderManySkeletons = () => {
  return Array(3)
    .fill(0)
    .map((_, index) => <PostsSkeleton key={index} />);
};
