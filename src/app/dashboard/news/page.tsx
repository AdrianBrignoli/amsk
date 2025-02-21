import HeaderText from '@/app/components/text-content/HeaderText';
import PostFetchingAndRender from '@/app/components/combined/PostFetchingAndRender';
import { Suspense } from 'react';
import PostsSkeleton from '@/app/components/skeleton/PostsSkeleton';
import { fetchContentfulPosts } from '@/app/actions/actions';
import { NewsPost } from '@/app/misc/types';

export default function News() {
  return (
    <>
      <HeaderText hone="Nyheter" htwo="Här kan du läsa om senaste nytt." />
      <div className="flex-1 flex flex-col w-full max-w-[1300px] mx-auto">
        <Suspense fallback={<PostsSkeleton />}>
          <NewsPosts />
        </Suspense>
      </div>
    </>
  );
}

// Separate async component for posts
async function NewsPosts() {
  const result = await fetchContentfulPosts({
    contentType: 'news',
    limit: 3,
    skip: 0,
  });

  const initialPostsPopulated = result.items
    ? (result.items as NewsPost[])
    : [];

  return (
    <PostFetchingAndRender
      initialPosts={initialPostsPopulated}
      postType="Nyheter"
    />
  );
}
