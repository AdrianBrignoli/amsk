import PostPageCont from '@/app/components/text-content/PostPageCont';
import MaintextGeneric from '@/app/components/text-content/MaintextGeneric';
import HeaderText from '@/app/components/text-content/HeaderText';
import { FetchForening } from '@/app/actions/actions';

export default function Traningsverksamhet() {
  return (
    <section className="flex-1 flex justify-center items-center text-black">
      <div className="flex flex-col space-y-4 py-16 lg:py-24 px-4 w-full max-w-[1100px]">
        <HeaderText
          hone="Träningsverksamhet"
          htwo="Här kan du läsa om vår träningsverksamhet"
          content={<FetchForening pagePostsToRender={'traningsverksamhet'} />}
        />
      </div>
    </section>
  );
}
