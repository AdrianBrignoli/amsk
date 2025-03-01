import HeaderSection from "@/app/components/shared/HeaderSection";
import { fetchContentfulPosts } from "@/app/actions/actions";
import PostFetchingAndRender from "@/app/components/shared/post-pages/PostFetchingAndRender";
import { NewsPost, CompetitionPost } from "@/app/definitions/types";
import { Suspense } from "react";
import { RenderManySkeletons } from "@/app/components/skeleton/PostsSkeleton";
import { INITIAL_POSTS_LIMIT } from "@/app/definitions/constants";
import { notFound } from "next/navigation";

// Define valid routes and their configurations
const pageConfigs = {
  nyheter: {
    title: "Nyheter",
    description: "Här kan du läsa om senaste nytt.",
    contentType: "news",
    postType: "Nyheter" as const,
  },
  tavlingar: {
    title: "Tävlingar",
    description: "Här kan du läsa om uppkommande tävlingar.",
    contentType: "competition",
    postType: "Tävlingar" as const,
  },
} as const;

// Generate static params for valid routes
export function generateStaticParams() {
  return [{ postType: "nyheter" }, { postType: "tavlingar" }];
}

export default async function PostsPage({
  params,
}: {
  params: { postType: string };
}) {
  // Await the params before using
  const postType = await params.postType;
  const config = pageConfigs[postType as keyof typeof pageConfigs];

  // Handle invalid routes
  if (!config) {
    notFound();
  }

  return (
    <>
      <HeaderSection hone={config.title} htwo={config.description} />
      <Suspense fallback={<RenderManySkeletons />}>
        <PostsContent config={config} />
      </Suspense>
    </>
  );
}

async function PostsContent({
  config,
}: {
  config: (typeof pageConfigs)[keyof typeof pageConfigs];
}) {
  const result = await fetchContentfulPosts({
    contentType: config.contentType,
    limit: INITIAL_POSTS_LIMIT,
    skip: 0,
  });

  const initialPostsPopulated = result.items
    ? (result.items as (NewsPost | CompetitionPost)[])
    : [];

  return (
    <PostFetchingAndRender
      initialPosts={initialPostsPopulated}
      postType={config.postType}
    />
  );
}
