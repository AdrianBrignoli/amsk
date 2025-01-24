import HeaderText from '@/app/components/text-content/HeaderText';
import PostFetchingAndRender from '@/app/components/combined/PostFetchingAndRender';
import { Suspense } from 'react';
import PostsSkeleton from '@/app/components/skeleton/PostsSkeleton';
import { fetchContentfulPosts } from '@/app/actions/actions';
import { NewsPost } from '@/app/misc/types';

export default async function News() {
  const initialPosts: NewsPost[] | undefined = await fetchContentfulPosts({
    contentType: 'news',
    limit: 3,
    skip: 0,
  });

  const initialPostsPopulated = initialPosts ? initialPosts : [];

  return (
    <>
      <HeaderText hone="Nyheter" htwo="Här kan du läsa om senaste nytt." />
      <div className="flex-1 flex flex-col w-full max-w-[1300px] mx-auto">
        {/*We need Suspense as a Resolver here, client side resolving of Promises is tricky apparently*/}
        <PostFetchingAndRender
          initialPosts={initialPostsPopulated}
          postType="Nyheter"
        />
      </div>
    </>
  );
}
