import { FetchForening } from '@/app/actions/actions';
import HeaderText from '@/app/components/text-content/HeaderText';

export default function Arrangemang() {
  return (
    <section className="flex-1 flex-col justify-center items-center text-white w-full">
      <HeaderText hone="Arrangemang" htwo="Här kan du läsa olika arrangemang" />
      <FetchForening pagePostsToRender={'arrangemang'} />
    </section>
  );
}
