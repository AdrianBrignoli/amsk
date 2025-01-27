import TextMain from './components/text-content/Text-main';
import { CompetitionPost, NewsPost } from './misc/types';
import { fetchContentfulPosts } from './actions/actions';
import { CalenderItems } from './misc/types';
import HeaderText from './components/text-content/HeaderText';
import { fetchCalenderPosts } from './actions/actions';

export default async function Home(props: any) {
  return (
    <>
      <HeaderText
        hone="Hej och varmt välkommen till Arlanda Märsta SK."
        htwo="Den lilla men varma och hjärtliga skidklubben i Sigtuna kommun."
      />
      <section className="flex-1 flex justify-center items-center">
        <div className="flex flex-col w-full">
          <TextMain />
        </div>
      </section>
    </>
  );
}
