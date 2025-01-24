'use server';
import { Document } from '@contentful/rich-text-types';
import { createContentfulClient } from '../../../lib/contentful/ContentfulFetching';
import { OrderFilterPaths, EntrySys } from 'contentful';
import { createGraphQLClient } from '../../../lib/contentful/ContentfulFetching';
import {
  CompetitionPost,
  NewsPost,
  LinkPost,
  ContactPost,
  ArrangemangPost,
  TraningsverksamhetPost,
  AssociationPost,
  GetDataStructureReturn,
} from '@/app/misc/types';

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
  publishDate?: string;
};

export const fetchContentfulPosts = async <T extends GetDataStructureReturn>({
  contentType,
  limit,
  skip,
  order,
  publishDate,
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
      'fields.publishDate': publishDate,
    });

    return getDataStructure(contentType, result) as T;
  } catch (err) {
    console.error('Failed to fetch data from Contentful', err);
    return undefined;
  }
};

/*
export const fetchContentfulPostsGraphQL = async <
  T extends GetDataStructureReturn
>({
  query
  variables
}: {
  query: string
  variables?
}): Promise<T | undefined> => {
  try {
    const client = createGraphQLClient();    

    const result = await client.request(query, );

    //const y = getDataStructure(contentType, result) as T;
    //console.log(y);
    //return y
  } catch (error) {
    console.error('Failed to fetch data from Contentful via GraphQL', error);
    return undefined;
  }
};
*/
export const getDataStructure = (
  mode: string,
  result: any
): GetDataStructureReturn => {
  switch (mode) {
    case 'competition':
      return result.items.map((item: any) => ({
        id: item.sys.id as string,
        title: item.fields.title as string | null,
        content: item.fields.content as Document | null,
        publishDate: item.fields.publishDate as string | null,
      })) as CompetitionPost[];
    case 'news':
      return result.items.map((item: any) => ({
        id: item.sys.id as string,
        title: item.fields.title as string | null,
        content: item.fields.content as Document | null,
        publishDate: item.fields.publishDate as string | null,
      })) as NewsPost[];
    case 'lankar':
      return result.items.map((item: any) => ({
        linkName: item.fields.linkName as string | null,
        linkUrl: item.fields.linkUrl as string | null,
      })) as LinkPost[];
    case 'contact':
      return result.items.map((item: any) => ({
        id: item.sys.id as string,
        title: item.fields.title as string | null,
        phone: item.fields.phone as string | null,
        content: item.fields.content as Document | null,
      })) as ContactPost[];
    case 'arrangemang':
      return result.items.map((item: any) => ({
        id: item.sys.id as string,
        content: item.fields.content as Document | null,
      })) as ArrangemangPost[];
    case 'traningsverksamhet':
      return result.items.map((item: any) => ({
        id: item.sys.id as string,
        content: item.fields.content as Document | null,
      })) as TraningsverksamhetPost[];
    case 'contentText':
      return result.items.map((item: any) => ({
        id: item.sys.id as string,
        content: item.fields.content as Document | null,
      })) as AssociationPost[];
    default:
      return [];
  }
};
