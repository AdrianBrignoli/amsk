import { createClient } from 'contentful';
import { ContentfulClientApi } from 'contentful';
import { CompetitionPost, NewsPost } from '@/app/definitions/types';
import { GraphQLClient } from 'graphql-request';

export const createContentfulClient = () => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  
  if (!spaceId || !accessToken) {
    console.error('Contentful environment variables missing:', {
      spaceId: spaceId ? 'set' : 'missing',
      accessToken: accessToken ? 'set' : 'missing'
    });
    return null;
  }
  
  try {
    const client = createClient({
      space: spaceId,
      accessToken: accessToken,
    });
    return client;
  } catch (error) {
    console.error('Failed to create Contentful client:', error);
    return null;
  }
};

export const createGraphQLClient = () => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  
  if (!spaceId || !accessToken) {
    throw new Error('Contentful environment variables missing');
  }
  
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
