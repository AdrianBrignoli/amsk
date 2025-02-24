import { Document } from '@contentful/rich-text-types';

// Data Models (Interfaces for objects with clear identity)
export interface BasePost {
  id: string;
  title: string | null;
  content: Document | null;
}

export interface CompetitionPost extends BasePost {
  publishDate: string;
  postType: 'Tävlingar';
}

export interface NewsPost extends BasePost {
  publishDate: string;
  postType: 'Nyheter';
}

export interface LinkPost {
  id: string;
  linkName: string;
  linkUrl: string;
}

export interface ContactPost extends BasePost {
  phone: string | null;
}

export interface ArrangemangPost extends BasePost {}
export interface TraningsverksamhetPost extends BasePost {}
export interface AssociationPost extends BasePost {}

// Types (for unions, aliases, etc)
export type GetDataStructureReturn =
  | CompetitionPost[]
  | NewsPost[]
  | LinkPost[]
  | ContactPost[]
  | ArrangemangPost[]
  | TraningsverksamhetPost[]
  | AssociationPost[];

export type PostType = 'Nyheter' | 'Tävlingar';
export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// Props interfaces
export interface PostsProps {
  item: NewsPost | CompetitionPost;
  postType: PostType | undefined;
} 