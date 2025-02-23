import HeaderText from "@/app/components/text-content/HeaderText";
import { fetchContentfulPosts } from "@/app/actions/actions";
import AssociationCont from "@/app/components/basics/AssociationCont";
import NoData from "@/app/components/basics/NoData";
import { AssociationPost } from "@/app/misc/types";

// Route segment config
export const dynamic = "force-static";
export const revalidate = 3600;

export const Introduction = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center max-w-[1300px] mx-auto">
      <p className="text-white text-2xl ">
        Välkommen till Märsta Skidförening, den stolta klubben som förenar
        skidentusiaster i alla åldrar och erfarenhetsnivåer. Beläget i hjärtat
        av Märsta, erbjuder vår förening en gemenskap där kärleken till
        skidåkning står i centrum.
      </p>
    </div>
  );
};

export const SecondSection = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center max-w-[1300px] mx-auto">
      <p className="text-white text-2xl">
        Vi strävar efter att skapa en inkluderande miljö där både nybörjare och
        erfarna åkare kan njuta av sporten och utvecklas tillsammans. Vår
        förening har en rik historia som sträcker sig över flera decennier.
        Genom åren har vi blivit en välkänd aktör inom skidvärlden, både lokalt
        och regionalt. Vi är stolta över våra framgångar på tävlingsbanorna, men
        lika viktiga är de många glada stunderna i skidspåren och på våra
        träningspass.
      </p>
    </div>
  );
};

export default async function Association() {
  const { items } = (await fetchContentfulPosts({
    contentType: "contentText",
  })) as { items: AssociationPost[] };

  //{items ? <AssociationCont posts={items} /> : <NoData />}

  return (
    <section className="flex-1 flex flex-col justify-center items-center text-white w-full">
      <Introduction />
      <SecondSection />
    </section>
  );
}
