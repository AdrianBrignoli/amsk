'use client';
import { CompetitionPost, NewsPost } from '@/app/misc/types';
import { useState } from 'react';
import { fetchContentfulPosts } from '@/app/actions/actions';

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
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    setIsLoadingMore(true);
    try {
      const result = await fetchContentfulPosts({
        contentType: input === 'Nyheter' ? 'news' : 'competition',
        limit: 3,
        skip: posts.length,
      });

      setPosts((prev) => [
        ...prev,
        ...(result.items as (CompetitionPost | NewsPost)[]),
      ]);

      // Hide button if we've loaded all posts
      if (posts.length + result.items.length >= result.total) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (!hasMore) return null;

  return (
    <button
      onClick={loadMore}
      className="bg-sky-500 bg-opacity-50 text-gray-300 p-4 rounded-md mt-4 mx-auto my-8"
    >
      Ladda fler
    </button>
  );
}
