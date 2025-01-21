'use client';
import { createClient } from 'contentful';
import { CompetitionPost, NewsPost } from '@/app/misc/types';
import Posts from '../text-content/Sections';
import { useState, useEffect } from 'react';
import { createContentfulClient } from '../../../../lib/contentful/ContentfulFetching';
import { fetchContentfulNewsAndCompetition } from '../../../../lib/contentful/ContentfulFetching';

type LoadMoreProps = {
  input: 'Nyheter' | 'Tävlingar';
};

export default function LoadMore({ input }: LoadMoreProps) {
  const [posts, setPosts] = useState<(NewsPost | CompetitionPost)[]>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [postCount, setPostCount] = useState<number>(0);

  useEffect(() => {
    const elements = document.querySelectorAll('.news-component');
    const count = elements.length;
    console.log(count);
    setPostCount(count);
  }, [posts]);

  const fetchContentfulHandler = async () => {
    const client = createContentfulClient();

    if (!client) {
      throw new Error('contentful client could not be created');
    }

    const inputTranslated = input === 'Nyheter' ? 'news' : 'competition';

    const contentfulPosts = await fetchContentfulNewsAndCompetition(
      client,
      postCount,
      inputTranslated
    );

    const newPosts = contentfulPosts.items.map((item: any) => ({
      id: item.sys.id as string,
      title: item.fields.title as string | null,
      content: item.fields.content as Document | null,
      publishDate: item.fields.pubslishDate as string | null,
      postType: input,
    })) as (NewsPost | CompetitionPost)[];

    // Append new posts to the existing ones
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };

  return (
    <>
      <div className="flex flex-col space-y-4 w-full max-w-[1300px] mt-2 mx-auto">
        {posts.map((post) => {
          return (
            <Posts
              id={post.id}
              title={post.title}
              publishDate={post.publishDate}
              content={post.content}
              postType={input}
            />
          );
        })}
        <div className="flex justify-center">
          <button
            onClick={fetchContentfulHandler}
            className="p-4 bg-sky-400 rounded-md mx-auto bg-black bg-opacity-20 hover:bg-opacity-30 rounded-2xl my-8 p-4"
          >
            Ladda in fler
          </button>
        </div>
      </div>
    </>
  );
}
