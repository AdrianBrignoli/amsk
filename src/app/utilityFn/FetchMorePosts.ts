import { createContentfulClient } from '../../../lib/contentful/ContentfulFetching';
import { CompetitionPost, NewsPost } from '../misc/types';
import { fetchContentfulPosts } from '../actions/actions';
import { OrderFilterPaths, EntrySys } from 'contentful';

type FetchMorePostsProps = {
  input: string;
  postCount: number;
  publishDate?: (
    | OrderFilterPaths<EntrySys, 'sys'>
    | 'sys.contentType.sys.id'
    | '-sys.contentType.sys.id'
  )[];
};

export default async function FetchMorePosts({
  input,
  postCount,
  publishDate,
}: FetchMorePostsProps) {
  const client = createContentfulClient();

  if (!client) {
    throw new Error('contentful client could not be created');
  }

  const inputTranslated = input === 'Nyheter' ? 'news' : 'competition'; // (!) Yikes

  const contentfulPosts: NewsPost[] | undefined = await fetchContentfulPosts({
    contentType: inputTranslated,
    limit: 3,
    skip: postCount,
    order: ['-sys.createdAt'],
  });

  if (!contentfulPosts) return [];

  const newPosts = contentfulPosts.map((item: NewsPost | CompetitionPost) => ({
    id: item.id as string,
    title: item.title as string | null,
    content: item.content as Document | null,
    publishDate: item.publishDate as string | null,
    postType: input,
  })) as (NewsPost | CompetitionPost)[];

  return newPosts;
}
