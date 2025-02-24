"use client";
import { useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setDate,
  setLoading,
  setPostDates,
} from "@/store/slices/calendarSlice";
import { NewsPost, CompetitionPost, ValuePiece } from "@/app/definitions/types";
import { getTileClassName } from "./utils";
import { fetchCalenderPosts } from "@/app/actions/actions";
import { useErrorBoundary } from "react-error-boundary";

interface CalenderProps {
  onPostsUpdate: (posts: (NewsPost | CompetitionPost)[]) => void;
}

const Calender: React.FC<CalenderProps> = ({ onPostsUpdate }) => {
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();
  const {
    date,
    isLoading,
    newsDates,
    competitionDates,
    newsPostsData,
    competitionPostData,
  } = useSelector((state: RootState) => state.calendar);

  const fetchPosts = async (date: Date) => {
    try {
      const result = await fetchCalenderPosts(date);
      dispatch(setPostDates(result));
      return result;
    } catch (error) {
      showBoundary(error);
      return null;
    }
  };

  useEffect(() => {
    fetchPosts(new Date());
  }, []);

  const handleMonthChange = async (date: ValuePiece) => {
    if (!date) return;
    dispatch(setLoading(true));
    await fetchPosts(date);
    dispatch(setLoading(false));
  };

  const handleDayClick = (date: ValuePiece) => {
    if (!date) return;
    const dateStr = date.toISOString().split("T")[0];

    const hasPostsOnDate =
      newsDates.some((d: string) => d.split("T")[0] === dateStr) ||
      competitionDates.some((d: string) => d.split("T")[0] === dateStr);

    if (!hasPostsOnDate) return;

    const filteredPosts = [
      ...newsPostsData.filter(
        (post: NewsPost) =>
          new Date(post.publishDate).toISOString().split("T")[0] === dateStr
      ),
      ...competitionPostData.filter(
        (post: CompetitionPost) =>
          new Date(post.publishDate).toISOString().split("T")[0] === dateStr
      ),
    ];

    onPostsUpdate(filteredPosts);
  };

  return (
    <div className="relative w-full h-[22em] bg-black bg-opacity-40 rounded-2xl p-4">
      <Calendar
        onActiveStartDateChange={({ activeStartDate }) =>
          handleMonthChange(activeStartDate)
        }
        onClickDay={handleDayClick}
        value={date}
        locale="sv"
        tileClassName={({ date }) =>
          getTileClassName(date, newsDates, competitionDates)
        }
        className="w-full h-full"
      />
      {isLoading && <div className="spinner absolute left-2 bottom-2" />}
    </div>
  );
};

export default Calender;
