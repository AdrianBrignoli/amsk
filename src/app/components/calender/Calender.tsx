'use client';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { CalenderProps } from '@/app/misc/types';
import { fetchCalenderPosts } from '@/app/actions/actions';
import { NewsPost, CompetitionPost } from '@/app/misc/types';
import { ValuePiece, Value } from '@/app/misc/types';

const Calender: React.FC<CalenderProps> = ({ setPosts }) => {
  const [date, setDate] = useState<Value>(new Date());
  const [newsDates, setNewsDates] = useState<Date[]>([]);
  const [competitionDates, setCompetitionDates] = useState<Date[]>([]);
  const [newsPostsData, setNewsPostData] = useState<NewsPost[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [competitionPostData, setCompetitionPostData] = useState<
    CompetitionPost[] | []
  >([]);

  const dothis = async () => {
    const { newsPostData, competitionPostData } = await fetchCalenderPosts(
      new Date()
    );
    setPostDates(newsPostData, competitionPostData);
  };

  useEffect(() => {
    dothis();
  }, []);

  const setPostDates = (
    newsPostData: NewsPost[],
    competitionPostData: CompetitionPost[]
  ) => {
    const newsPostsDates = newsPostData
      .map((post) => post.publishDate)
      .filter((publishDate): publishDate is string => !!publishDate)
      .map((publishDate) => new Date(publishDate));

    const competitionPostsDates = competitionPostData
      .map((post) => post.publishDate)
      .filter((publishDate): publishDate is string => !!publishDate)
      .map((publishDate) => new Date(publishDate));

    setNewsDates(newsPostsDates);
    setCompetitionDates(competitionPostsDates);
  };

  const handleMonthChange = async (date: ValuePiece) => {
    setIsLoading(true);
    if (date === null) return;

    const { newsPostData, competitionPostData } = await fetchCalenderPosts(
      date
    );

    setNewsPostData(newsPostData);
    setCompetitionPostData(competitionPostData);

    setPostDates(newsPostData, competitionPostData);
    setIsLoading(false);
  };

  const renderPosts = (date: ValuePiece) => {
    {
      /* Comparing dates in JS is beyond strange */
    }
    const dateNormalized = date?.toISOString().split('T')[0];

    const newsPostDataChosenDate = newsPostsData.filter(
      (post) =>
        new Date(post.publishDate).toISOString().split('T')[0] ===
        dateNormalized
    );

    const competitionPostDataChosenDate = competitionPostData.filter(
      (post) =>
        new Date(post.publishDate).toISOString().split('T')[0] ===
        dateNormalized
    );

    const combinedPosts = [
      ...newsPostDataChosenDate,
      ...competitionPostDataChosenDate,
    ];
    setPosts(combinedPosts);
  };

  return (
    <>
      <div className="relative w-full h-[22em] bg-black bg-opacity-40 rounded-2xl p-4">
        <Calendar
          onActiveStartDateChange={({ activeStartDate }) =>
            handleMonthChange(activeStartDate)
          }
          onClickDay={renderPosts}
          value={date}
          locale="sv"
          tileClassName={({ date }) => {
            let className = '';
            let isNews = false;
            let isComp = false;
            const dateString = date.toISOString().split('T')[0];

            if (
              newsDates.some(
                (newsDate) =>
                  newsDate.toISOString().split('T')[0] === dateString
              )
            ) {
              className = 'news';
              isNews = true;
            }
            if (
              competitionDates.some(
                (competitionDate) =>
                  competitionDate.toISOString().split('T')[0] === dateString
              )
            ) {
              className = 'competition';
              isComp = true;
            }
            if (isNews && isComp) {
              className = 'newsComp';
            }

            return className || 'hover:bg-gray-800';
          }}
          className="w-full h-full"
        />
        {isLoading && <div className="spinner absolute left-2 bottom-2"></div>}
      </div>
    </>
  );
};

export default Calender;
