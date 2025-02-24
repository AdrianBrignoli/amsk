import HeaderSection from "@/app/components/shared/HeaderSection";
import { fetchContentfulPosts } from "@/app/actions/actions";
import PostFetchingAndRender from "@/app/components/shared/post-pages/PostFetchingAndRender";
import { CompetitionPost } from "@/app/definitions/types";
import { Suspense } from "react";
import { RenderManySkeletons } from "@/app/components/skeleton/PostsSkeleton";
import { INITIAL_POSTS_LIMIT } from "@/app/definitions/constants";

export default function Competition() {
  return (
    <>
      <HeaderSection
        hone="Tävlingar"
        htwo="Här kan du läsa om uppkommande tävlingar."
      />
      <div className="flex-1 flex flex-col w-full mx-auto">
        <Suspense fallback={<RenderManySkeletons />}>
          <CompetitionContent />
        </Suspense>
      </div>
    </>
  );
}

async function CompetitionContent() {
  const result = await fetchContentfulPosts({
    contentType: "competition",
    limit: INITIAL_POSTS_LIMIT,
    skip: 0,
  });

  const initialPostsPopulated = result.items
    ? (result.items as CompetitionPost[])
    : [];

  return (
    <PostFetchingAndRender
      initialPosts={initialPostsPopulated}
      postType="Tävlingar"
    />
  );
}

export const revalidate = 3600; // 1 hour
