import { NewsPost, CompetitionPost } from '../misc/types';

export const restructGraphQLData = (data: any) => {
  const newsPostData: NewsPost[] | [] = data.newsCollection.items.map(
    (n: any) => ({
      ...n,
      content: n.content.json,
      id: n.sys.id,
      postType: 'Nyheter',
      publishDate: getRelevantDate(new Date(n.publishDate)),
    })
  );

  const competitionPostData: CompetitionPost[] | [] =
    data.competitionCollection.items.map((n: any) => ({
      ...n,
      content: n.content.json,
      id: n.sys.id,
      postType: 'Tävlingar',
      publishDate: getRelevantDate(new Date(n.publishDate)),
    }));

  return { newsPostData, competitionPostData };
};

export const getStartEndDate = (date: Date) => {
  const startDate = getRelevantDate(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );

  const endDate = getRelevantDate(
    new Date(date.getFullYear(), date.getMonth() + 1, 1)
  );

  return { startDate, endDate };
};

export const getRelevantDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};
