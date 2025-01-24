import { Document } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

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
  linkName: string;
  linkUrl: string;
};

export type ContactPost = {
  id: string;
  title: string | null;
  phone: string | null;
  text: Document | null;
};

export type ArrangemangPost = {
  id: string;
  content: Document | null;
};

export type TraningsverksamhetPost = {
  id: string;
  content: Document | null;
};

export type AssociationPost = {
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
  | AssociationPost[];

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

export type CalenderProps = {
  calenderItems: CalenderItems;
  setPosts: (posts: (NewsPost | CompetitionPost)[]) => void;
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

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
