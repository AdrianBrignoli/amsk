'use client';

import { CompetitionPost, NewsPost } from '@/app/misc/types';
import { useEffect, useState } from 'react';
import PostsSkeleton from '../skeleton/PostsSkeleton';
import Posts from '../text-content/Sections';
import { RenderManySkeletons } from '../skeleton/PostsSkeleton';

type PostHandlerProps = {
  posts: (NewsPost | CompetitionPost)[] | [];
  setPosts: React.Dispatch<
    React.SetStateAction<(NewsPost | CompetitionPost)[]>
  >;
  postType: 'Nyheter' | 'Tävlingar';
};

export default function PostHandler({
  posts,
  setPosts,
  postType,
}: PostHandlerProps) {
  const [isInitialPostsFetched, setIsInitialPostsFetched] =
    useState<boolean>(false);

  useEffect(() => {
    if (posts.length) {
      setIsInitialPostsFetched(true);
    }
  }, []);

  return (
    <>
      {!posts.length ? (
        isInitialPostsFetched ? (
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl text-gray-500 text-center">
              Hittade inga inlägg
            </h3>
          </div>
        ) : (
          <div>
            <RenderManySkeletons />
          </div>
        )
      ) : (
        <div>
          {posts.map((post) => (
            <Posts
              key={post.id}
              id={post.id}
              title={post.title}
              publishDate={post.publishDate}
              content={post.content}
              postType={postType}
            />
          ))}
        </div>
      )}
    </>
  );
}
