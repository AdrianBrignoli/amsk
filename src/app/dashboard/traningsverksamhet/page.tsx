import PostPageCont from '@/app/components/text-content/PostPageCont';
import MaintextGeneric from '@/app/components/text-content/MaintextGeneric';
import HeaderText from '@/app/components/text-content/HeaderText';
import { FetchForening } from '@/app/actions/actions';

export default function Traningsverksamhet() {
  return (
    <section className="flex-1 flex-col justify-center items-center text-white w-full">
      <HeaderText
        hone="Träningsverksamhet"
        htwo="Här kan du läsa om vår träningsverksamhet"
      />
      <FetchForening pagePostsToRender={'traningsverksamhet'} />
    </section>
  );
}
