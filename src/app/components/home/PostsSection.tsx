"use client";
import { useEffect, useState } from "react";
import NewsCompetitionPost from "../posts/news-compeition/NewsCompetitionPost";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearSelectedPosts } from "@/store/slices/calendarSlice";

export function PostsSection() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const selectedPosts = useSelector(
    (state: RootState) => state.calendar.selectedPosts
  );

  useEffect(() => {
    if (selectedPosts.length) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedPosts.length]);

  const handleClear = () => {
    dispatch(clearSelectedPosts());
  };

  return (
    <section
      className={`bottom-0 left-0 right-0 transition-all duration-300 ease-in-out transform px-4 lg:px-0 bg-black bg-opacity-10 max-w-[1300px] mx-auto rounded-xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex justify-between items-center p-4  rounded-xl">
        <h3 className="text-2xl text-center text-gray-400">Inlägg</h3>
        <button
          onClick={handleClear}
          className="text-gray-white bg-gray-500 text-lg p-4 min-w-24 rounded-xl hover:bg-gray-600 transition-colors"
        >
          Rensa
        </button>
      </div>
      <div className="mx-auto p-8">
        {selectedPosts?.map((post) => (
          <NewsCompetitionPost
            key={post.id}
            post={post}
            postType={post.postType}
          />
        ))}
      </div>
    </section>
  );
}
