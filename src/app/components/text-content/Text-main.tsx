'use client';
import { useEffect, useState, useRef } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { ReactNode } from 'react';
import { gsap } from 'gsap';
import { Parallax } from 'react-scroll-parallax';
import Image from 'next/image';
import Calender from '../calender/Calender';
import { CalenderItems } from '@/app/misc/types';
import { PostsProps } from '@/app/misc/types';
import Posts from './Sections';
import TempelateOne from '../tempelates/TempelateOne';
import CalenderWithText from '../combined/CalenderWithText';
import {
  NewsPost,
  CompetitionPost,
  ExtendedCompetitionPost,
  ExtendedNewsPost,
} from '@/app/misc/types';

type TextMainProps = {
  calenderItems: CalenderItems;
};

export default function TextMain({ calenderItems }: TextMainProps) {
  const [description, setDescription] = useState<ReactNode | null>(null);
  const [posts, setPosts] = useState<(NewsPost | CompetitionPost)[]>();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  gsap.fromTo(
    sectionRef.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  );
  gsap.fromTo(
    headingRef.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.2 }
  );
  gsap.fromTo(
    subheadingRef.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 }
  );
  gsap.fromTo(
    paragraphRef.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.6 }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="flex-1 flex justify-center items-center max-w-[1300px] lg:rounded-2xl text-white mt-20 lg:mt-8 mb-16 mx-auto"
      >
        <TempelateOne
          title="Kalender"
          text="Använd kalendern för att se uppkommande nyheter eller tävlingar.
                Inlägg om nyheter är färgkodade blå medans inlägg relaterade
                till uppkommande tävlingar är röda."
          component={
            <CalenderWithText
              calenderItems={calenderItems}
              setPosts={setPosts}
            />
          }
        />
      </section>
      <div className="w-full bg-black bg-opacity-30 mx-auto lg:px-8 px-4 space-y-4 pb-8">
        <div className="max-w-[1300px] mx-auto">
          {posts &&
            posts.map((post) => (
              <Posts
                id={post.id}
                title={post.title}
                publishDate={post.publishDate}
                content={post.content}
                postType={post.postType}
              />
            ))}
        </div>
      </div>
    </>
  );
}
