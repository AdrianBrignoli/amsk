import { createClient } from 'contentful';
import { ContentfulClientApi } from 'contentful';
import { EntryCollection } from 'contentful';
import { EntrySkeletonType } from 'contentful';

export const createContentfulClient = () => {
  if (
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID === undefined ||
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN === undefined
  )
    return;
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  return client;
};

export const fetchContentfulNewsAndCompetition = async (
  client: ContentfulClientApi<undefined>,
  skipNum: number,
  type?: 'news' | 'competition',
  searchTerm?: string
): Promise<EntryCollection<EntrySkeletonType, undefined, string>> => {
  return await client.getEntries({
    content_type: type,
    limit: 3,
    query: searchTerm,
    skip: skipNum,
    order: ['-sys.createdAt'],
  });
};
