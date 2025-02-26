import { NewsPost, CompetitionPost } from "@/app/definitions/types";

export const getTileClassName = (
  date: Date,
  newsDates: string[],
  competitionDates: string[]
): string => {
  const dateStr = date.toISOString().split('T')[0];
  const hasNews = newsDates.some(d => d.split('T')[0] === dateStr);
  const hasCompetition = competitionDates.some(d => d.split('T')[0] === dateStr);

  if (hasNews && hasCompetition) return 'calendar-tile--combined';
  if (hasNews) return 'calendar-tile--news';
  if (hasCompetition) return 'calendar-tile--competition';
  return '';
};

export const hasPostsForDate = (
  dateStr: string,
  newsDates: string[],
  competitionDates: string[]
): boolean => {
  return (
    newsDates.some((d) => d.split("T")[0] === dateStr) ||
    competitionDates.some((d) => d.split("T")[0] === dateStr)
  );
};

export const getPostsForDate = (
  dateStr: string,
  newsPostsData: NewsPost[],
  competitionPostData: CompetitionPost[]
): (NewsPost | CompetitionPost)[] => {
  const filterByDate = (post: NewsPost | CompetitionPost) =>
    new Date(post.publishDate).toISOString().split("T")[0] === dateStr;

  return [...newsPostsData, ...competitionPostData].filter(filterByDate);
}; 