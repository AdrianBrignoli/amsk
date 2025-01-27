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
