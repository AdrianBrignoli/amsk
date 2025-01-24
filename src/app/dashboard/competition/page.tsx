import HeaderText from '@/app/components/text-content/HeaderText';
import { fetchContentfulPosts } from '@/app/actions/actions';
import PostFetchingAndRender from '@/app/components/combined/PostFetchingAndRender';
import { CompetitionPost } from '@/app/misc/types';

export default async function Competition() {
  const initialPosts: CompetitionPost[] | undefined =
    await fetchContentfulPosts({
      contentType: 'competition',
      limit: 3,
      skip: 0,
    });

  const initialPostsPopulated = initialPosts ? initialPosts : [];

  return (
    <>
      <HeaderText hone="Nyheter" htwo="Här kan du läsa om senaste nytt." />
      <div className="flex-1 flex flex-col w-full max-w-[1300px] mx-auto">
        {/*We need Suspense as a Resolver here, client side resolving of Promises is tricky apparently. Nvm, React hate this*/}
        <PostFetchingAndRender
          initialPosts={initialPostsPopulated}
          postType="Tävlingar"
        />
      </div>
    </>
  );
}
