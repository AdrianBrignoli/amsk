"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NewsPost, CompetitionPost } from "@/app/definitions/types";
import LoadMore from "./LoadMore";
import FilterOnName from "./FilterOnName";
import PostHandler from "./PostHandler";
import { RenderManySkeletons } from "../../skeleton/PostsSkeleton";
import { useInitializePosts } from "./hooks/useInitializePosts";

type PostFetchingAndRenderProps = {
  initialPosts: (NewsPost | CompetitionPost)[] | [];
  postType: "Nyheter" | "Tävlingar";
};

export default function PostFetchingAndRender({
  initialPosts,
  postType,
}: PostFetchingAndRenderProps) {
  const { posts, isLoadingMore, isSearching, total } = useSelector(
    (state: RootState) => state.posts
  );

  useInitializePosts(initialPosts, postType);

  // Calculate how many posts are remaining to be loaded
  const remainingPosts = Math.min(3, total - posts.length);

  return (
    <>
      <FilterOnName postType={postType} />
      <section className="main-content">
        <PostHandler posts={posts} postType={postType} />
        {isLoadingMore && remainingPosts > 0 && (
          <RenderManySkeletons count={remainingPosts} />
        )}
        {posts.length > 0 && !isSearching && (
          <LoadMore input={postType} posts={posts} />
        )}
      </section>
    </>
  );
}
