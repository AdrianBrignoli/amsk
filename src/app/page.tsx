import TextMain from './components/text-content/Text-main';
import { CompetitionPost, NewsPost } from './misc/types';
import { fetchContentfulPosts } from './actions/actions';
import { CalenderItems } from './misc/types';
import HeaderText from './components/text-content/HeaderText';

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
    <section className="flex-1 flex justify-center items-center">
      <div className="flex flex-col w-full">
        <HeaderText
          hone="Hej och varmt välkommen till Arlanda Märsta SK."
          htwo="Den lilla men varma och hjärtliga skidklubben i Sigtuna kommun."
        />
        <TextMain calenderItems={calenderItems} />
      </div>
    </section>
  );
}
