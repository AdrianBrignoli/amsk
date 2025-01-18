import HeaderText from '@/app/components/text-content/HeaderText';
import Head from 'next/head';
import PostPageCont from '@/app/components/text-content/PostPageCont';
import { FetchKontakt } from '@/app/actions/actions';

export default function Contact() {
  return (
    <section className="flex-1 flex justify-center items-center text-white">
      <div className="flex flex-col space-y-4 lg:mt-8 py-16 lg:py-24 px-4 max-w-[1100px] w-full">
        <HeaderText
          hone="Kontakt"
          htwo="Här kan du hitta kontaktuppgifter"
          content={<FetchKontakt pagePostsToRender={'contact'} />}
        />
      </div>
    </section>
  );
}
