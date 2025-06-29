"use client";
import { useEffect, useState } from "react";
import NewsCompetitionPost from "../posts/news-compeition/NewsCompetitionPost";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearSelectedPosts } from "@/store/slices/calendarSlice";
import { IoClose } from "react-icons/io5";

export function PostsSection() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const selectedPosts = useSelector(
    (state: RootState) => state.calendar.selectedPosts
  );
  const selectedDate = useSelector((state: RootState) => state.calendar.date);

  useEffect(() => {
    if (selectedPosts.length) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedPosts.length]);

  const handleClose = () => {
    dispatch(clearSelectedPosts());
  };

  if (!isVisible) return null;

  // Format the date in Swedish locale
  const formattedDate = new Date(selectedDate).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <section
        className={`relative w-full max-w-[900px] max-h-[80vh] overflow-y-auto bg-gray-900/90 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="sticky top-0 z-10 flex flex-col p-4 rounded-t-xl bg-black/40 backdrop-blur-sm border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl text-center text-gray-400">Inlägg</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"
              aria-label="Stäng"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">{formattedDate}</p>
        </div>
        <div className="flex flex-col space-y-2">
          {selectedPosts?.map((post) => (
            <NewsCompetitionPost
              key={post.id}
              post={post}
              postType={post.postType}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
