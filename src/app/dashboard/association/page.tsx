import BgBend from '@/app/components/UI/BgBend';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import HeaderText from '@/app/components/text-content/HeaderText';
import { fetchContentfulPosts } from '@/app/actions/actions';
import AssociationCont from '@/app/components/basics/AssociationCont';
import { AssociationPost } from '@/app/misc/types';
import NoData from '@/app/components/basics/NoData';

export default async function Association() {
  const data: AssociationPost[] | undefined = await fetchContentfulPosts({
    contentType: 'contentText',
  });

  return (
    <>
      <section className="flex-1 flex flex-col justify-center items-center text-white w-full">
        <HeaderText
          hone="Föreningen"
          htwo="Något för alla, alla åldrar välkomna till oss"
        />
        {data ? <AssociationCont posts={data} /> : <NoData />}
      </section>
    </>
  );
}
