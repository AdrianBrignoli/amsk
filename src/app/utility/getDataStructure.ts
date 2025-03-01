import {
  CompetitionPost,
  NewsPost,
  LinkPost,
  ContactPost,
  ArrangemangPost,
  TraningsverksamhetPost,
  AssociationPost,
  AboutPost,
  GetDataStructureReturn,
} from '@/app/definitions/types';
import { Document } from '@contentful/rich-text-types';

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
    case 'aboutUs':
      return result.items.map((item: any) => ({
        id: item.sys.id as string,
        introduction: item.fields.introduction as Document | null,
        firstSection: item.fields.firstSection as Document | null,
        secondSection: item.fields.secondSection as Document | null,
        thirdSection: item.fields.thirdSection as Document | null,
        finalSection: item.fields.finalSection as Document | null,
      })) as AboutPost[];
    default:
      return [];
  }
};
