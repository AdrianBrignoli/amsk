import HeaderText from "@/app/components/text-content/HeaderText";
import { fetchContentfulPosts } from "@/app/actions/actions";
import PostFetchingAndRender from "@/app/components/combined/PostFetchingAndRender";
import { CompetitionPost } from "@/app/misc/types";
import { Suspense } from "react";
import { RenderManySkeletons } from "@/app/components/skeleton/PostsSkeleton";

export default function Competition() {
  return (
    <>
      <HeaderText
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
    limit: 3,
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
