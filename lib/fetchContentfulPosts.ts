/*
import contentful from './contentful';
import { Document } from '@contentful/rich-text-types';
import { contentfulData } from '@/app/misc/types';

export const fetchContentfulPosts = async ({
  pagePostsToRender,
}: {
  pagePostsToRender: string;
}): Promise<contentfulData[]> => {
  try {
    const result = await contentful.getEntries({
      content_type: pagePostsToRender,
    });

    return result.items.map((item) => ({
      id: item.sys.id as string,
      title: item.fields.title as string | null,
      phone: item.fields.phone as string | null,
      content: item.fields.content as Document | null,
      publishDate: item.fields.publishDate as string | null,
      linkName: item.fields.linkName as string | null,
      linkUrl: item.fields.linkUrl as string | null,
    }));
  } catch (err) {
    console.error('Failed to fetch data from Contentful', err);
    return [];
  }
};
*/
