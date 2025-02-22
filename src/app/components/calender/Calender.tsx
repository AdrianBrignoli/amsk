"use client";
import { useEffect } from "react";
import Calendar from "react-calendar";
import { useCalendar } from "./useCalendar";
import { NewsPost, CompetitionPost, ValuePiece } from "@/app/misc/types";
import { getTileClassName } from "./utils";

interface CalenderProps {
  onPostsUpdate: (posts: (NewsPost | CompetitionPost)[]) => void;
}

const Calender: React.FC<CalenderProps> = ({ onPostsUpdate }) => {
  const {
    date,
    isLoading,
    newsDates,
    competitionDates,
    newsPostsData,
    competitionPostData,
    setPostDates,
    fetchPosts,
    setIsLoading,
    setNewsPostData,
    setCompetitionPostData,
  } = useCalendar(onPostsUpdate);

  useEffect(() => {
    const initializeCalendar = async () => {
      const result = await fetchPosts(new Date());
      if (result) {
        setPostDates(result.newsPostData, result.competitionPostData);
      }
    };
    initializeCalendar();
  }, [fetchPosts, setPostDates]);

  const handleMonthChange = async (date: ValuePiece) => {
    if (!date) return;

    setIsLoading(true);
    const result = await fetchPosts(date);
    if (result) {
      setNewsPostData(result.newsPostData);
      setCompetitionPostData(result.competitionPostData);
      setPostDates(result.newsPostData, result.competitionPostData);
    }
    setIsLoading(false);
  };

  const handleDayClick = (date: ValuePiece) => {
    if (!date) return;

    const dateStr = date.toISOString().split("T")[0];
    const filteredPosts = [
      ...newsPostsData.filter(
        (post) =>
          new Date(post.publishDate).toISOString().split("T")[0] === dateStr
      ),
      ...competitionPostData.filter(
        (post) =>
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
