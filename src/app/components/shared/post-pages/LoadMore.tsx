"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentfulPosts } from "@/app/actions/actions";
import { appendPosts, setIsLoadingMore } from "@/store/slices/postsSlice";
import { RootState } from "@/store";
import { NewsPost, CompetitionPost } from "@/app/definitions/types";

type LoadMoreProps = {
  input: "Nyheter" | "Tävlingar";
  posts: any[];
};

export default function LoadMore({ input, posts }: LoadMoreProps) {
  const dispatch = useDispatch();
  const { hasMore } = useSelector((state: RootState) => state.posts);

  const handleLoadMore = async () => {
    dispatch(setIsLoadingMore(true));
    try {
      const result = await fetchContentfulPosts({
        contentType: input === "Nyheter" ? "news" : "competition",
        limit: 3,
        skip: posts.length,
      });

      dispatch(
        appendPosts({
          items: result.items as (NewsPost | CompetitionPost)[],
          total: result.total,
        })
      );
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      dispatch(setIsLoadingMore(false));
    }
  };

  if (!hasMore) return null;

  return (
    <button
      onClick={handleLoadMore}
      className="bg-sky-500 bg-opacity-50 hover:bg-opacity-70 text-gray-300 p-4 rounded-md mt-4 mx-auto my-8 w-full max-w-xl"
    >
      Ladda fler
    </button>
  );
}
