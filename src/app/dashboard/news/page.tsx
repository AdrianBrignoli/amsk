import PostPageCont from '@/app/components/text-content/PostPageCont';
import LoadMore from '@/app/components/misc/LoadMore';
import FilterOnName from '@/app/components/basics/FilterOnName';
import { FetchNewsAndCompetition } from '@/app/actions/actions';
import HeaderText from '@/app/components/text-content/HeaderText';
import PostsContainer from '@/app/components/basics/PostsContainer';
import PostFetchingAndRender from '@/app/components/combined/PostFetchingAndRender';

export default function News() {
  const intialPosts = await FetchNewsAndCompetition({
    pagePostsToRender: 'news',
  });

  return (
    <>
      <HeaderText hone="Nyheter" htwo="Här kan du läsa om senaste nytt." />
      <div className="w-full max-w-[1300px] mx-auto">
        <PostFetchingAndRender initialPosts={intialPosts} />
        {/*<FetchNewsAndCompetition pagePostsToRender="news" />*/}
        {/*<PostsContainer />*/}
        <LoadMore input="Nyheter" />
      </div>
    </>
  );
}
