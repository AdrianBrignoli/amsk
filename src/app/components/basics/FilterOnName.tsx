"use client";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { CompetitionPost, NewsPost } from "@/app/misc/types";
import { fetchContentfulPosts } from "@/app/actions/actions";

type FilterOnNameProps = {
  setPosts: React.Dispatch<
    React.SetStateAction<(CompetitionPost | NewsPost)[] | []>
  >;
  postType: "Nyheter" | "Tävlingar";
  currentPosts: (CompetitionPost | NewsPost)[] | [];
  onSearchStateChange: (isSearching: boolean) => void;
};

type SavedPostsState = {
  posts: (CompetitionPost | NewsPost)[] | [];
  count: number;
};

export default function FilterOnName({
  setPosts,
  postType,
  currentPosts,
  onSearchStateChange,
}: FilterOnNameProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedState, setSavedState] = useState<SavedPostsState>({
    posts: [],
    count: 0,
  });

  const validateSearchTerm = (term: string): boolean => {
    if (term.length > 50) {
      setError("Söktermen är för lång");
      return false;
    }
    setError(null);
    return true;
  };

  const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (validateSearchTerm(term)) {
      if (term === "") {
        setIsSearching(false);
        onSearchStateChange(false);
        fetchOriginalPosts();
      }
    }
  };

  const fetchOriginalPosts = async () => {
    try {
      const result = await fetchContentfulPosts({
        contentType: postType === "Nyheter" ? "news" : "competition",
        limit: savedState.count || 3,
        skip: 0,
      });

      setPosts(
        postType === "Nyheter"
          ? (result.items as NewsPost[])
          : (result.items as CompetitionPost[])
      );
    } catch (error) {
      setError("Kunde inte återställa inläggen");
      console.error(error);
    }
  };

  const search = async () => {
    try {
      setSavedState({
        posts: currentPosts,
        count: currentPosts.length,
      });

      setIsSearching(!!searchTerm);
      onSearchStateChange(!!searchTerm);

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

      setPosts(
        postType === "Nyheter"
          ? (result.items as NewsPost[])
          : (result.items as CompetitionPost[])
      );
    } catch (error) {
      setError("Kunde inte utföra sökningen");
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
        <div className="text-sm text-gray-400 text-center py-2 bg-black bg-opacity-30 w-full max-w-[1300px] mx-auto rounded-b-3xl">
          Sökresultat för: {searchTerm}
        </div>
      </div>
    </>
  );
}
