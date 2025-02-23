import HeaderText from "@/app/components/text-content/HeaderText";

export default function Traningsverksamhet() {
  // <FetchForening pagePostsToRender={'traningsverksamhet'} />
  return (
    <section className="flex-1 flex-col justify-center items-center text-white w-full">
      <HeaderText
        hone="Träningsverksamhet"
        htwo="Här kan du läsa om vår träningsverksamhet"
      />
    </section>
  );
}
