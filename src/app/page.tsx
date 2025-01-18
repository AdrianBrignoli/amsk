import TextMain from './components/text-content/Text-main';
import { CompetitionPost, NewsPost } from './misc/types';
import { fetchContentfulPosts } from './actions/actions';
import { CalenderItems } from './misc/types';

export default async function Home(props: any) {
  const competition: CompetitionPost[] | undefined = await fetchContentfulPosts(
    {
      pagePostsToRender: 'competition',
    }
  );
  const news: NewsPost[] | undefined = await fetchContentfulPosts({
    pagePostsToRender: 'news',
  });
  const calenderItems: CalenderItems = {
    competition: competition,
    news: news,
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col">
        <TextMain calenderItems={calenderItems} />
      </div>
    </div>
  );
}
