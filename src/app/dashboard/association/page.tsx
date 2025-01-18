import BgBend from '@/app/components/UI/BgBend';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import HeaderText from '@/app/components/text-content/HeaderText';
import { FetchForening } from '@/app/actions/actions';

export default function Association() {
  /*
  useEffect(() => {
    gsap.from('.text-element', {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.3,
    });
  }, []);
*/
  /*
            <div className="absolute -left-4 -top-12 bg-[#AFD6ED] w-32 h-4"></div>
          <div className="absolute -left-8 -top-12 bg-[#AFD6ED] w-4 h-36"></div>
          <div className="absolute -right-4 -bottom-12 bg-[#AFD6ED] w-32 h-4"></div>
          <div className="absolute -right-8 -bottom-12 bg-[#AFD6ED] w-4 h-36"></div>
  */

  return (
    <>
      <section className="flex-1 flex justify-center items-center text-white">
        <div className="flex flex-col space-y-4 lg:mt-8 py-16 lg:py-24 px-4 max-w-[1100px]">
          <HeaderText
            hone="Föreningen"
            htwo="Något för alla, alla åldrar välkomna till oss"
            content={<FetchForening pagePostsToRender={'contentText'} />}
          />
        </div>
      </section>
    </>
  );
}
