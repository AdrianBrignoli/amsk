'use server';
import { createContentfulClient } from '../../../lib/contentful/ContentfulFetching';
import { OrderFilterPaths, EntrySys } from 'contentful';
import { createGraphQLClient } from '../../../lib/contentful/ContentfulFetching';
import { getDataStructure } from '../utilityFn/GetDataStructure';
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
};

export const fetchContentfulPosts = async <T extends GetDataStructureReturn>({
  contentType,
  limit,
  skip,
  order,
}: contenfulFilterProps): Promise<T | undefined> => {
  try {
    const client = createContentfulClient();

    if (!client) {
      throw new Error('contentful client could not be created');
    }

    const result = await client.getEntries({
      content_type: contentType,
      limit: limit,
      skip: skip,
      order: order,
    });

    return getDataStructure(contentType, result) as T;
  } catch (err) {
    console.error('Failed to fetch data from Contentful', err);
    return undefined;
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
