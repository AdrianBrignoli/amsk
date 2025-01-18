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
        className="flex-1 flex justify-center items-center lg:bg-black lg:bg-opacity-50 lg:rounded-2xl lg:border-2 border-white border-opacity-50 text-white mt-20 lg:mt-32 mb-16 lg:mx-2"
      >
        <div className="flex flex-col space-y-4 max-w-[1100px]">
          <div className="px-6">
            <div className="flex flex-col space-y-4 text-white py-10 border-sky-400 relative overflow-hidden">
              <p className="text-4xl" ref={headingRef}>
                Hej och varmt välkommen till Arlanda Märsta SK.
              </p>
              <p className="text-2xl" ref={subheadingRef}>
                Den lilla men varma och hjärtliga skidklubben i Sigtuna kommun.
              </p>
            </div>
          </div>
          <div className="w-11/12 h-1 bg-white bg-opacity-20 mx-auto m-0"></div>
          <div className="flex justify-center">
            <div className="flex flex-col lg:w-8/12 w-full lg:px-8 px-4 py-6">
              <p className="text-2xl mb-8 text-center">
                <span className="bg-[#2C3093] p-2">Nyheter</span> /{'  '}
                <span className="bg-[#EA5661] p-2">Tävlingar</span>
              </p>
              <Calender calenderItems={calenderItems} setPosts={setPosts} />
            </div>
          </div>
          <div className="lg:w-8/12 w-full mx-auto lg:px-8 px-4 space-y-4 pb-8">
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
      </section>
    </>
  );
}
