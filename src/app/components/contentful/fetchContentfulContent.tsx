//import { fetchContentfulPosts } from '../../../../lib/fetchContentfulPosts';
import { fetchContentfulPosts } from '@/app/actions/actions';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import React from 'react';
import { useActionState } from 'react';
import { BiCalendar, BiText } from 'react-icons/bi';

const NewsPosts = async ({
  pagePostsToRender,
}: {
  pagePostsToRender: string;
}) => {
  const posts = await fetchContentfulPosts({ pagePostsToRender });
  if (!posts) return;

  return (
    <>
      {posts.map((item) => {
        const content = documentToReactComponents(item.content as Document);

        const publishDate =
          typeof item.publishDate === 'string'
            ? new Date(item.publishDate).toLocaleDateString()
            : '';

        const title = String(item.title);
        const phone = item.phone ? String(item.phone) : '';

        return (
          <section
            key={item.id}
            className="flex flex-col bg-black bg-opacity-50 text-white space-y-2 pl-6 p-4 border-l-2 border-white rounded-2xl"
          >
            <h3 className="flex align-center">
              <BiText className="mr-4" />
              {title}
            </h3>
            <h4 className="flex align-center">
              <BiCalendar className="mr-4" />
              {publishDate}
            </h4>
            <h4>{phone}</h4>
            <div className="flex align-center">
              <BiText className="mr-4" />
              {content}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default NewsPosts;
