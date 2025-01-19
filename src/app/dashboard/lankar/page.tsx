import HeaderText from '@/app/components/text-content/HeaderText';
import { FetchLankar } from '@/app/actions/actions';
import TempelateOne from '@/app/components/tempelates/TempelateOne';

export default function Lankar() {
  return (
    <>
      <section className="flex-1 flex flex-col justify-center items-center text-white w-full">
        <HeaderText hone="Länkar" htwo="Här hittar du länkar" />
        <TempelateOne
          title="Länkar"
          text="Om vi har några viktiga länkar att dela med oss av så kan ni hitta dem här."
          component={<FetchLankar pagePostsToRender={'lankar'} />}
        />
      </section>
    </>
  );
}
