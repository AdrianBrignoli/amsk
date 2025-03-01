import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NewsPost, CompetitionPost } from "@/app/definitions/types";
import { setPosts } from "@/store/slices/postsSlice";
import { fetchContentfulPosts } from "@/app/actions/actions";

export function useInitializePosts(
  initialPosts: (NewsPost | CompetitionPost)[] | [],
  postType: "Nyheter" | "Tävlingar"
) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializePosts = async () => {
      try {
        const result = await fetchContentfulPosts({
          contentType: postType === "Nyheter" ? "news" : "competition",
          limit: 0,
          skip: 0,
        });

        dispatch(
          setPosts({
            items: initialPosts,
            total: result.total,
          })
        );
      } catch (error) {
        console.error("Error fetching total count:", error);
        dispatch(
          setPosts({
            items: initialPosts,
            total: initialPosts.length,
          })
        );
      }
    };

    initializePosts();
  }, [initialPosts, dispatch, postType]);
} 