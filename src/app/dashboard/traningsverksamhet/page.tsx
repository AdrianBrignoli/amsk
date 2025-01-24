import HeaderText from '@/app/components/text-content/HeaderText';

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
