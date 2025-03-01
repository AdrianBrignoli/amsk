"use client";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchContentfulPosts } from "@/app/actions/actions";
import { NewsPost, CompetitionPost } from "@/app/definitions/types";
import {
  setSearchTerm,
  setIsSearching,
  setPosts,
  setError,
  setSavedState,
} from "@/store/slices/postsSlice";

type FilterOnNameProps = {
  postType: "Nyheter" | "Tävlingar";
};

export default function FilterOnName({ postType }: FilterOnNameProps) {
  const dispatch = useDispatch();
  const { searchTerm, isSearching, error, posts, total } = useSelector(
    (state: RootState) => state.posts
  );
  const savedState = useSelector((state: RootState) => state.posts.savedState);

  const validateSearchTerm = (term: string): boolean => {
    if (term.length > 50) {
      dispatch(setError("Söktermen är för lång"));
      return false;
    }
    dispatch(setError(null));
    return true;
  };

  const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    dispatch(setSearchTerm(term));
    if (validateSearchTerm(term)) {
      if (term === "") {
        dispatch(setIsSearching(false));
        if (savedState.posts.length > 0) {
          dispatch(
            setPosts({
              items: savedState.posts,
              total: savedState.count,
            })
          );
        } else {
          fetchOriginalPosts();
        }
      }
    }
  };

  const fetchOriginalPosts = async () => {
    try {
      const result = await fetchContentfulPosts({
        contentType: postType === "Nyheter" ? "news" : "competition",
        limit: posts.length || 3,
        skip: 0,
      });

      dispatch(
        setPosts({
          items: result.items as (NewsPost | CompetitionPost)[],
          total: result.total,
        })
      );
    } catch (error) {
      dispatch(setError("Kunde inte återställa inläggen"));
      console.error(error);
    }
  };

  const search = async () => {
    try {
      // Only save state if we're not already searching
      if (!isSearching) {
        dispatch(
          setSavedState({
            posts: posts,
            count: total,
          })
        );
      }

      dispatch(setIsSearching(!!searchTerm));

      const result = await fetchContentfulPosts({
        contentType: postType === "Nyheter" ? "news" : "competition",
        limit: 100,
        skip: 0,
        query: searchTerm
          ? {
              "fields.title[match]": searchTerm,
            }
          : undefined,
      });

      dispatch(
        setPosts({
          items: result.items as (NewsPost | CompetitionPost)[],
          total: result.total,
        })
      );
    } catch (error) {
      dispatch(setError("Kunde inte utföra sökningen"));
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  return (
    <>
      <div className="w-full bg-sky-900 bg-opacity-20">
        <section className="flex justify-between relative w-full max-w-[1300px] mx-auto rounded-b-3xl py-4 xl:px-0 px-4">
          <h3 className="text-3xl font-thin">Inlägg</h3>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <input
                className="bg-black bg-opacity-50 text-gray-300 p-2 rounded-md"
                placeholder="Sök-term"
                value={searchTerm}
                onInput={searchTermHandler}
                onKeyDown={handleKeyDown}
              />
              <BiSearch
                className="ml-4 text-xl cursor-pointer"
                onClick={search}
              />
            </div>
            {error && (
              <span className="text-red-500 text-sm mt-1">{error}</span>
            )}
          </div>
        </section>
      </div>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isSearching ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="text-sm text-gray-400 text-center py-2 bg-black bg-opacity-30 w-full max-w-[1300px] mx-auto rounded-b-0 sm:rounded-b-3xl">
          Sökresultat för: {searchTerm}
        </div>
      </div>
    </>
  );
}
