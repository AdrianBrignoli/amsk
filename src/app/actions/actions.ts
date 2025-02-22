'use server';
import { createContentfulClient } from '../../../lib/contentful/ContentfulFetching';
import { OrderFilterPaths, EntrySys } from 'contentful';
import { createGraphQLClient } from '../../../lib/contentful/ContentfulFetching';
import { getDataStructure } from '../utilityFn/getDataStructure';
import { GetDataStructureReturn } from '@/app/misc/types';

// CONTENTFUL FNS

type contenfulFilterProps = {
  contentType: string;
  limit?: number;
  skip?: number;
  order?: (
    | OrderFilterPaths<EntrySys, 'sys'>
    | 'sys.contentType.sys.id'
    | '-sys.contentType.sys.id'
  )[];
  query?: Record<string, any>;
};

export const fetchContentfulPosts = async ({
  contentType,
  limit,
  skip,
  order,
  query,
}: contenfulFilterProps) => {
  try {
    const client = createContentfulClient();
    if (!client) throw new Error('Failed to initialize Contentful client');

    const result = await client.getEntries({
      content_type: contentType,
      limit: limit || 100,
      skip: skip || 0,
      order: order || ['-sys.createdAt'],
      ...query,
    });

    return {
      items: getDataStructure(contentType, result),
      total: result.total,
    };
  } catch (error) {
    console.error('Error fetching Contentful posts:', error);
    throw new Error('Failed to fetch content');
  }
};

import { queryGetPostsByMonth } from '../../../lib/contentful/queries/queries';
import { restructGraphQLData, getStartEndDate } from '../utilityFn/tinyUtils';
export const fetchCalenderPosts = async (date: Date) => {
  const query = queryGetPostsByMonth();
  const variables = getStartEndDate(date);
  
  const client = createGraphQLClient();

  try {
    const data: any = await client.request(query, variables);
    const { newsPostData, competitionPostData } = restructGraphQLData(data);

    return {
      newsPostData: newsPostData,
      competitionPostData: competitionPostData,
    };
  } catch (e) {
    console.log('Issue fetching calenderposts per month');
    throw new Error('Issue fetching calenderposts per month');
  }
};
