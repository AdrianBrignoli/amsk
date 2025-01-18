//import { fetchContentfulPosts } from '../../../lib/fetchContentfulPosts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, INLINES } from '@contentful/rich-text-types';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { PiPerson, PiPhone, PiTextT, PiLink } from 'react-icons/pi';
import { BiText, BiCalendar } from 'react-icons/bi';
import Posts from '../components/text-content/Sections';
import {
  CompetitionPost,
  NewsPost,
  LinkPost,
  ContactPost,
  ArrangemangPost,
  TraningsverksamhetPost,
  ContentTextPost,
  GetDataStructureReturn,
} from '@/app/misc/types';

// CONTENTFUL FNS

import { contentfulData } from '@/app/misc/types';

import { createClient } from 'contentful';

const createContentfulClient = () => {
  if (
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID === undefined ||
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN === undefined
  )
    return;
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  return client;
};

export const fetchContentfulPosts = async <T extends GetDataStructureReturn>({
  pagePostsToRender,
}: {
  pagePostsToRender: string;
}): Promise<T | undefined> => {
  try {
    const client = createContentfulClient();

    if (!client) {
      throw new Error('contentful client could not be created');
    }

    const result = await client.getEntries({
      content_type: pagePostsToRender,
    });

    return getDataStructure(pagePostsToRender, result) as T;

    /*
    return result.items.map((item) => ({
      id: item.sys.id as string,
      title: item.fields.title as string | null,
      phone: item.fields.phone as string | null,
      content: item.fields.content as Document | null,
      publishDate: item.fields.publishDate as string | null,
      linkName: item.fields.linkName as string | null,
      linkUrl: item.fields.linkUrl as string | null,
    }));
    */
  } catch (err) {
    console.error('Failed to fetch data from Contentful', err);
    return undefined;
  }
};

const getDataStructure = (
  mode: string,
  result: any
): GetDataStructureReturn | undefined => {
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
      })) as ContentTextPost[];
    default:
      return undefined;
  }
};

// CONTENTFUL END -----

export const FetchForening = async ({
  pagePostsToRender,
}: {
  pagePostsToRender: string;
}) => {
  const posts: ContentTextPost[] | undefined = await fetchContentfulPosts({
    pagePostsToRender,
  });

  if (!posts) return;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file.url;
        const altText = title || 'image';

        return (
          <div className="w-full rounded-3xl py-4 relative overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center absolute"
              style={{
                backgroundImage: `url(${imageUrl})`,
                filter: 'blur(10px)',
                opacity: '0.3',
              }}
            ></div>
            <Image
              src={`https:${imageUrl}`}
              width={400}
              height={400}
              alt={altText}
              className="md:w-1/3 w-4/5 h-auto rounded-3xl mx-auto relative drop-shadow-md"
            />
          </div>
        );
      },
    },
  };

  return (
    <>
      {posts.map((post) => {
        const content = documentToReactComponents(
          post.content as Document,
          options
        );

        return (
          <section className="space-y-4 text-elements" key={post.id}>
            {content}
          </section>
        );
      })}
    </>
  );
};

export const FetchKontakt = async ({
  pagePostsToRender,
}: {
  pagePostsToRender: string;
}) => {
  const posts: ContactPost[] | undefined = await fetchContentfulPosts({
    pagePostsToRender,
  });
  if (!posts) return;

  return (
    <>
      {posts.map((item) => {
        const content = documentToReactComponents(item.content as Document);

        const title = String(item.title);
        const phone = item.phone ? String(item.phone) : '';

        return (
          <section
            key={item.id}
            className="flex flex-col bg-sky-400 bg-opacity-50 text-white space-y-2 pl-6 p-4 border-l-4 border-white rounded-2xl my-4"
          >
            <h3 className="flex items-center">
              <PiPerson className="mr-4" />
              {title}
            </h3>
            {/*fix this sob*/}
            <h4 className="flex items-center">
              <PiPhone className="mr-4" />
              {phone}
            </h4>
            <div className="flex items-center">
              <PiTextT className="mr-4" />
              {content}
            </div>
          </section>
        );
      })}
    </>
  );
};

export const FetchLankar = async ({
  pagePostsToRender,
}: {
  pagePostsToRender: string;
}) => {
  const posts: LinkPost[] | undefined = await fetchContentfulPosts({
    pagePostsToRender,
  });
  if (!posts) return;

  return (
    <>
      {posts.map((item) => {
        const linkName = String(item.linkName);
        console.log(item);
        const linkUrl = String(item.linkUrl);

        return (
          <section
            key={item.id}
            className="flex flex-col bg-sky-400 bg-opacity-50 text-white space-y-2 pl-6 p-4 border-l-2 border-white rounded-2xl my-4"
          >
            <h3 className="flex items-center">
              <PiTextT className="mr-4" />
              {linkName}
            </h3>
            <div className="flex items-center">
              <PiLink className="mr-4" />
              <Link href={linkUrl}>{linkUrl}</Link>
            </div>
          </section>
        );
      })}
    </>
  );
};

export const FetchNewsAndCompetition = async ({
  pagePostsToRender,
}: {
  pagePostsToRender: string;
}) => {
  const posts: NewsPost[] | CompetitionPost[] | undefined =
    await fetchContentfulPosts({ pagePostsToRender });
  if (!posts) return;

  return (
    <>
      {posts.map((item) => {
        const publishDate =
          typeof item.publishDate === 'string'
            ? new Date(item.publishDate).toLocaleDateString()
            : '';

        const postType = pagePostsToRender === 'news' ? 'Nyheter' : 'Tävlingar';

        return (
          <Posts
            key={item.id}
            id={item.id}
            title={item.title}
            publishDate={publishDate}
            content={item.content}
            postType={postType}
          />
        );
      })}
    </>
  );
};
