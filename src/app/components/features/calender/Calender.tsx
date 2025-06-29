"use client";
import { useEffect, memo } from "react";
import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { NewsPost, CompetitionPost, ValuePiece } from "@/app/definitions/types";
import { getTileClassName, hasPostsForDate, getPostsForDate } from "./utils";
import { useCalendarFetch } from "./hooks/useCalendarFetch";
import { setDate } from "@/store/slices/calendarSlice";
import { setSelectedPosts } from "@/store/slices/calendarSlice";
import "@/app/styles/components/calendar.css";

export default memo(function Calender() {
  const dispatch = useDispatch();
  const { fetchPosts } = useCalendarFetch();
  const {
    date,
    isLoading,
    newsDates,
    competitionDates,
    newsPostsData,
    competitionPostData,
  } = useSelector((state: RootState) => state.calendar);

  const handlePostsUpdate = (posts: (NewsPost | CompetitionPost)[]) => {
    dispatch(setSelectedPosts(posts));
  };

  const handleDayClick = (clickedDate: ValuePiece) => {
    if (!clickedDate || !(clickedDate instanceof Date)) return;

    dispatch(setDate(clickedDate.toISOString()));

    const dateStr = clickedDate.toISOString().split("T")[0];
    if (!hasPostsForDate(dateStr, newsDates, competitionDates)) return;

    const filteredPosts = getPostsForDate(
      dateStr,
      newsPostsData,
      competitionPostData
    );
    handlePostsUpdate(filteredPosts);
  };

  useEffect(() => {
    const initialDate = new Date();
    fetchPosts(initialDate);
  }, [fetchPosts]);

  return (
    <div className="relative w-full">
      <div
        className="
        h-[24em] 
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
          value={new Date(date)}
          locale="sv"
          tileClassName={({ date: tileDate }) => {
            const customClass = getTileClassName(
              tileDate,
              newsDates,
              competitionDates
            );
            return customClass ? `calendar-tile-${customClass}` : undefined;
          }}
        />
      </div>

      {isLoading && (
        <div className="absolute left-2 bottom-2">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
});
