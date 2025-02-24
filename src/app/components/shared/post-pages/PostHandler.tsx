"use client";

import { CompetitionPost, NewsPost } from "@/app/definitions/types";
import { useEffect, useState } from "react";
import PostsSkeleton from "../../skeleton/PostsSkeleton";
import NewsCompetitionPost from "../../posts/news-compeition/NewsCompetitionPost";
import { RenderManySkeletons } from "../../skeleton/PostsSkeleton";

type PostHandlerProps = {
  posts: (NewsPost | CompetitionPost)[] | [];
  postType: "Nyheter" | "Tävlingar";
};

export default function PostHandler({ posts, postType }: PostHandlerProps) {
  const [isInitialPostsFetched, setIsInitialPostsFetched] =
    useState<boolean>(false);

  useEffect(() => {
    if (posts.length) {
      setIsInitialPostsFetched(true);
    }
  }, [posts.length]);

  return (
    <>
      {!posts.length ? (
        isInitialPostsFetched ? (
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl text-gray-500 text-center">
              Hittade inga inlägg
            </h3>
          </div>
        ) : (
          <div>
            <RenderManySkeletons />
          </div>
        )
      ) : (
        <div className="my-4">
          {posts.map((post) => (
            <NewsCompetitionPost
              key={post.id}
              post={post}
              postType={postType}
            />
          ))}
        </div>
      )}
    </>
  );
}
