import { createClient } from 'contentful';
import { ContentfulClientApi } from 'contentful';
import { CompetitionPost, NewsPost } from '@/app/misc/types';
import { GraphQLClient } from 'graphql-request';

export const createContentfulClient = () => {
  if (
    process.env.CONTENTFUL_SPACE_ID === undefined ||
    process.env.CONTENTFUL_ACCESS_TOKEN === undefined
  )
    return;
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  return client;
};

export const createGraphQLClient = () => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
