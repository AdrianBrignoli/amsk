'use client';

import { useState } from 'react';
import { NewsPost, CompetitionPost } from '@/app/misc/types';
import { FetchNewsAndCompetition } from '@/app/actions/actions';
import LoadMore from '../misc/LoadMore';
import FilterOnName from '../basics/FilterOnName';

export default function PostFetchingAndRender(
  initialPosts: NewsPost[] | CompetitionPost[] | undefined
) {
  const [posts, setPosts] = useState<(NewsPost | CompetitionPost)[]>([]);

  return (
    <>
      <FilterOnName />
      <FetchNewsAndCompetition pagePostsToRender="news" />
      <LoadMore input="Nyheter" />
    </>
  );
}
