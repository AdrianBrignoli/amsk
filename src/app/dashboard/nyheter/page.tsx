import HeaderSection from "@/app/components/shared/HeaderSection";
import PostFetchingAndRender from "@/app/components/shared/post-pages/PostFetchingAndRender";
import { Suspense } from "react";
import { RenderManySkeletons } from "@/app/components/skeleton/PostsSkeleton";
import { fetchContentfulPosts } from "@/app/actions/actions";
import { NewsPost } from "@/app/definitions/types";
import { INITIAL_POSTS_LIMIT } from "@/app/definitions/constants";

export default function News() {
  return (
    <>
      <HeaderSection hone="Nyheter" htwo="Här kan du läsa om senaste nytt." />
      <div className="flex-1 flex flex-col w-full mx-auto">
        <Suspense fallback={<RenderManySkeletons />}>
          <NewsPosts />
        </Suspense>
      </div>
    </>
  );
}

async function NewsPosts() {
  const result = await fetchContentfulPosts({
    contentType: "news",
    limit: INITIAL_POSTS_LIMIT,
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
