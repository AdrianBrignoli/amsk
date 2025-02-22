import { useState, useCallback } from 'react';
import { useErrorBoundary } from "react-error-boundary";
import { Value, ValuePiece, NewsPost, CompetitionPost } from "@/app/misc/types";
import { fetchCalenderPosts } from "@/app/actions/actions";

export const useCalendar = (onPostsUpdate: (posts: (NewsPost | CompetitionPost)[]) => void) => {
  const { showBoundary } = useErrorBoundary();
  const [date, setDate] = useState<Value>(new Date());
  const [newsDates, setNewsDates] = useState<Date[]>([]);
  const [competitionDates, setCompetitionDates] = useState<Date[]>([]);
  const [newsPostsData, setNewsPostData] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [competitionPostData, setCompetitionPostData] = useState<CompetitionPost[]>([]);

  const setPostDates = useCallback((newsPostData: NewsPost[], competitionPostData: CompetitionPost[]) => {
    const formatDates = (posts: { publishDate: string }[]) => 
      posts
        .map(post => post.publishDate)
        .filter((date): date is string => !!date)
        .map(date => new Date(date));

    setNewsDates(formatDates(newsPostData));
    setCompetitionDates(formatDates(competitionPostData));
  }, []);

  const fetchPosts = useCallback(async (date: Date) => {
    try {
      const { newsPostData, competitionPostData } = await fetchCalenderPosts(date);
      return { newsPostData, competitionPostData };
    } catch (error) {
      showBoundary(error);
      return null;
    }
  }, [showBoundary]);

  return {
    date,
    setDate,
    isLoading,
    newsDates,
    competitionDates,
    newsPostsData,
    competitionPostData,
    setPostDates,
    fetchPosts,
    setIsLoading,
    setNewsPostData,
    setCompetitionPostData
  };
}; 