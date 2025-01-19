'use client';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { sv } from 'date-fns/locale';
import { CalenderItems, CalenderProps, contentfulData } from '@/app/misc/types';
import { NewsCompPost } from '@/app/misc/types';
import Posts from '../text-content/Sections';
import { PostsProps } from '@/app/misc/types';
import {
  NewsPost,
  CompetitionPost,
  ExtendedCompetitionPost,
  ExtendedNewsPost,
} from '@/app/misc/types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calender: React.FC<CalenderProps> = ({ calenderItems, setPosts }) => {
  const [value, onChange] = useState<Value>(new Date());
  const [message, setMessage] = useState<string | null>(null);
  const [newsDates, setNewsDates] = useState<Date[]>([]);
  const [competitionDates, setCompetitionDates] = useState<Date[]>([]);
  //const [posts, setPosts] = useState<PostsProps[] | null>([]);

  useEffect(() => {
    if (calenderItems.news === undefined) return;
    const validPublishDatesNews = calenderItems.news
      .map((item) => item.publishDate)
      .filter((date): date is string => date !== undefined && date !== null)
      .map((date) => new Date(date));

    setNewsDates(validPublishDatesNews);

    if (calenderItems.competition === undefined) return;
    const validPublishDatesComp = calenderItems.competition
      .map((item) => item.publishDate)
      .filter((date): date is string => date !== undefined && date !== null)
      .map((date) => new Date(date));

    setCompetitionDates(validPublishDatesComp);
  }, [calenderItems]);

  const handleDateClick = (date: ValuePiece) => {
    if (date === null) return;

    const compareDates = (postsDate: Date[], dateCalender: ValuePiece) => {
      const dateString = date.toISOString().split('T')[0];

      const tmp = postsDate.some(
        (postDate) => postDate.toISOString().split('T')[0] === dateString
      );

      return tmp ? dateCalender : false;
    };

    const isNewsHighlighted = compareDates(newsDates, date) ? true : false;
    const isCompHighlighted = compareDates(competitionDates, date)
      ? true
      : false;

    let postsFiltered: (NewsPost | CompetitionPost)[] = [];

    if (isNewsHighlighted) {
      if (calenderItems.news === undefined) return;
      const newsFilteredPosts = calenderItems.news
        .filter(
          (newsPost) =>
            newsPost.publishDate === date.toISOString().split('T')[0]
        )
        .map(
          (newsPost) =>
            ({
              ...newsPost,
              postType: 'Nyheter',
            } as NewsPost)
        );

      postsFiltered = postsFiltered.concat(newsFilteredPosts);
    }
    // Wtf? Why does this logic need to be different ..?
    // They do actually have different date formats(comp & news)
    if (isCompHighlighted) {
      if (calenderItems.competition === undefined) return;

      const compFilteredPosts = calenderItems.competition
        .filter((compPost) => {
          if (compPost.publishDate === null) return;
          const publishDateNormalized = new Date(compPost.publishDate)
            .toISOString()
            .split('T')[0];
          const calendarDateNormalized = date.toISOString().split('T')[0];

          return publishDateNormalized === calendarDateNormalized;
        })
        .map(
          (compPost) =>
            ({
              ...compPost,
              postType: 'Tävlingar',
            } as CompetitionPost)
        );

      postsFiltered = postsFiltered.concat(compFilteredPosts);
    }
    postsFiltered ? setPosts(postsFiltered) : null;

    onChange(date);
  };

  return (
    <>
      <Calendar
        onChange={handleDateClick}
        value={value}
        locale="sv"
        tileClassName={({ date }) => {
          let className = '';
          let isNews = false;
          let isComp = false;
          const dateString = date.toISOString().split('T')[0];

          if (
            newsDates.some(
              (newsDate) => newsDate.toISOString().split('T')[0] === dateString
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
        className="w-full h-[22em] bg-black bg-opacity-40 rounded-2xl p-4"
      />
    </>
  );
};

export default Calender;
