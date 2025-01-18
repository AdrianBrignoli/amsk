import HeaderText from '@/app/components/text-content/HeaderText';
import { FetchLankar } from '@/app/actions/actions';

export default function Lankar() {
  return (
    <section className="flex-1 flex justify-center items-center text-white">
      <div className="flex flex-col space-y-4 lg:mt-8 py-16 lg:py-24 px-4 max-w-[1100px] w-full">
        <HeaderText
          hone="Länkar"
          htwo="Här hittar du länkar"
          content={<FetchLankar pagePostsToRender={'lankar'} />}
        />
      </div>
    </section>
  );
}
