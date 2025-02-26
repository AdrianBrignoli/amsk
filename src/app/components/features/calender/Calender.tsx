"use client";
import { useEffect } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NewsPost, CompetitionPost, ValuePiece } from "@/app/definitions/types";
import { getTileClassName, hasPostsForDate, getPostsForDate } from "./utils";
import { useCalendarFetch } from "./hooks/useCalendarFetch";

interface CalenderProps {
  onPostsUpdate: (posts: (NewsPost | CompetitionPost)[]) => void;
}

const Calender: React.FC<CalenderProps> = ({ onPostsUpdate }) => {
  const { fetchPosts } = useCalendarFetch();
  const {
    date,
    isLoading,
    newsDates,
    competitionDates,
    newsPostsData,
    competitionPostData,
  } = useSelector((state: RootState) => state.calendar);

  const handleDayClick = (date: ValuePiece) => {
    if (!date) return;

    const dateStr = date.toISOString().split("T")[0];
    if (!hasPostsForDate(dateStr, newsDates, competitionDates)) return;

    const filteredPosts = getPostsForDate(
      dateStr,
      newsPostsData,
      competitionPostData
    );
    onPostsUpdate(filteredPosts);
  };

  // Only run once on mount
  useEffect(() => {
    const initialDate = new Date();
    fetchPosts(initialDate);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative w-full">
      <div
        className="
        h-[22em] 
        bg-black/40 
        backdrop-blur-sm 
        rounded-2xl 
        p-4 
        shadow-lg
        transition-all 
        duration-300 
        hover:bg-black/50
      "
      >
        <Calendar
          onActiveStartDateChange={({ activeStartDate }) =>
            activeStartDate && fetchPosts(activeStartDate)
          }
          onClickDay={handleDayClick}
          value={date}
          locale="sv"
          tileClassName={({ date }) =>
            getTileClassName(date, newsDates, competitionDates)
          }
          className="w-full h-full"
        />
      </div>

      {isLoading && (
        <div className="absolute left-2 bottom-2">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default Calender;
