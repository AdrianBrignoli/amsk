import { createClient } from 'contentful';
import { ContentfulClientApi } from 'contentful';
import { EntryCollection } from 'contentful';
import { EntrySkeletonType } from 'contentful';
import { CompetitionPost, NewsPost } from '@/app/misc/types';
import { GraphQLClient, gql } from 'graphql-request';
import { OrderFilterPaths, EntrySys } from 'contentful';

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

import { getDataStructure } from '@/app/actions/actions';
import { GetDataStructureReturn } from '@/app/misc/types';
export const fetchContentfulNewsAndCompetition = async <
  T extends GetDataStructureReturn
>(
  client: ContentfulClientApi<undefined>,
  skipNum: number,
  type: 'news' | 'competition',
  searchTerm?: string
) => {
  const rslt = await client.getEntries({
    content_type: type,
    limit: 3,
    query: searchTerm,
    skip: skipNum,
    order: ['-sys.createdAt'],
  });

  return getDataStructure(type, rslt) as CompetitionPost[] | NewsPost[];
};

export const createGraphQLClient = () => {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
