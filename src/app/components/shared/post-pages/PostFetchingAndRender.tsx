"use client";

import { useEffect, useState } from "react";
import { NewsPost, CompetitionPost } from "@/app/definitions/types";
import LoadMore from "./LoadMore";
import FilterOnName from "./FilterOnName";
import PostHandler from "./PostHandler";
import { RenderManySkeletons } from "../../skeleton/PostsSkeleton";

type PostFetchingAndRenderProps = {
  initialPosts: (NewsPost | CompetitionPost)[] | [];
  postType: "Nyheter" | "Tävlingar";
};

export default function PostFetchingAndRender({
  initialPosts,
  postType,
}: PostFetchingAndRenderProps) {
  const [posts, setPosts] = useState<(NewsPost | CompetitionPost)[] | []>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  return (
    <>
      <FilterOnName
        setPosts={setPosts}
        postType={postType}
        currentPosts={posts}
        onSearchStateChange={setIsSearching}
      />
      <section className="flex-1 flex flex-col justify-between w-full max-w-[1300px] mx-auto xl:px-0 px-4">
        <PostHandler posts={posts} postType={postType} />
        {isLoadingMore && <RenderManySkeletons />}
        {posts.length > 0 && !isSearching && (
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
