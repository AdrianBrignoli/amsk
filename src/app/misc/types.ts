import { Document } from '@contentful/rich-text-types';
import { ReactNode } from 'react';
import NewsPosts from '../components/contentful/fetchContentfulContent';

// ------------- return types from contentful

export type CompetitionPost = {
  id: string;
  title: string | null;
  content: Document | null;
  publishDate: string | null;
  postType: 'Tävlingar';
};

export type NewsPost = {
  id: string;
  title: string | null;
  content: Document | null;
  publishDate: string | null;
  postType: 'Nyheter';
};

export type LinkPost = {
  id: string;
  linkName: string | null;
  linkUrl: string | null;
};

export type ContactPost = {
  id: string;
  title: string | null;
  phone: string | null;
  content: Document | null;
};

export type ArrangemangPost = {
  id: string;
  content: Document | null;
};

export type TraningsverksamhetPost = {
  id: string;
  content: Document | null;
};

export type ContentTextPost = {
  id: string;
  content: Document | null;
};

// Union used by fetchContentfulPosts
export type GetDataStructureReturn =
  | CompetitionPost[]
  | NewsPost[]
  | LinkPost[]
  | ContactPost[]
  | ArrangemangPost[]
  | TraningsverksamhetPost[]
  | ContentTextPost[];

// ------------- End

export type contentfulData = {
  id: string;
  title: string | null;
  phone: string | null;
  content: Document | null;
  publishDate: string | null;
  linkName: string | null;
  linkUrl: string | null;
};

export type CalenderItems = {
  competition: CompetitionPost[] | undefined;
  news: NewsPost[] | undefined;
};

export type NewsCompPost = {
  id: string;
  title: string | null;
  publishDate: string | null;
  content: ReactNode | null;
};

export type PostType = 'Nyheter' | 'Tävlingar';

export type PostsProps = {
  item: NewsPost | CompetitionPost;
  postType: PostType | undefined;
};

export type ExtendedNewsPost = NewsPost & { postType: string };
export type ExtendedCompetitionPost = CompetitionPost & { postType: string };
