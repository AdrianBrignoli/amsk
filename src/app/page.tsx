import TextMain from './components/text-content/Text-main';
import HeaderText from './components/text-content/HeaderText';

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
