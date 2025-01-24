'use client';
import { CompetitionPost, NewsPost } from '@/app/misc/types';
import FetchMorePosts from '@/app/utilityFn/FetchMorePosts';

type LoadMoreProps = {
  setPosts: React.Dispatch<
    React.SetStateAction<(NewsPost | CompetitionPost)[] | []>
  >;
  posts: (NewsPost | CompetitionPost)[] | [];
  input: 'Nyheter' | 'Tävlingar';
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoadMore({
  input,
  setPosts,
  posts,
  setIsLoadingMore,
}: LoadMoreProps) {
  const fetchContentfulHandler = async () => {
    setIsLoadingMore(true);
    const newPosts = await FetchMorePosts({
      input: input,
      postCount: posts.length,
    });

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setIsLoadingMore(false);
  };

  return (
    <>
      <div className="flex flex-col space-y-4 w-full max-w-[1300px] mt-2 mx-auto">
        <div className="flex justify-center">
          <button
            onClick={fetchContentfulHandler}
            className="p-4 bg-sky-400 rounded-md mx-auto bg-black bg-opacity-20 hover:bg-opacity-30 rounded-2xl my-8 p-4"
          >
            Ladda in fler
          </button>
        </div>
      </div>
    </>
  );
}
