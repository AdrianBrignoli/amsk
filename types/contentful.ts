// types/contentful.ts
import { Entry } from 'contentful';

export interface BlogPostFields {
  title: string;
  body: string;
}

export type BlogPost = Entry<BlogPostFields>;
