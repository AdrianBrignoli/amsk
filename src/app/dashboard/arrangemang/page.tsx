import { FetchForening } from '@/app/actions/actions';
import HeaderText from '@/app/components/text-content/HeaderText';

export default function Arrangemang() {
  return (
    <section className="flex-1 flex justify-center items-center text-black">
      <div className="flex flex-col space-y-4 py-16 lg:py-24 px-4 w-full max-w-[1100px]">
        <HeaderText
          hone="Arrangemang"
          htwo="Här kan du läsa olika arrangemang"
          content={<FetchForening pagePostsToRender={'arrangemang'} />}
        />
      </div>
    </section>
  );
}
