'use client';

import { useEffect, useState } from 'react';
import { NewsPost, CompetitionPost } from '@/app/misc/types';
import LoadMore from '../misc/LoadMore';
import FilterOnName from '../basics/FilterOnName';
import PostHandler from '../misc/PostHandler';
import { RenderManySkeletons } from '../skeleton/PostsSkeleton';

type PostFetchingAndRenderProps = {
  initialPosts: (NewsPost | CompetitionPost)[] | [];
  postType: 'Nyheter' | 'Tävlingar';
};

export default function PostFetchingAndRender({
  initialPosts,
  postType,
}: PostFetchingAndRenderProps) {
  const [posts, setPosts] = useState<(NewsPost | CompetitionPost)[] | []>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  return (
    <>
      <FilterOnName setPosts={setPosts} postType={postType} />
      <section className="flex-1 flex flex-col justify-between">
        <PostHandler posts={posts} setPosts={setPosts} postType={postType} />
        {isLoadingMore && <RenderManySkeletons />}
        {posts.length > 0 && (
          <LoadMore
            input={postType}
            setPosts={setPosts}
            posts={posts}
            setIsLoadingMore={setIsLoadingMore}
          />
        )}
      </section>
    </>
  );
}
