import HeaderText from '@/app/components/text-content/HeaderText';
import Head from 'next/head';
import PostPageCont from '@/app/components/text-content/PostPageCont';
import { FetchKontakt } from '@/app/actions/actions';
import TempelateOne from '@/app/components/tempelates/TempelateOne';

export default function Contact() {
  return (
    <section className="flex-1 flex-col justify-center items-center text-white w-full">
      <HeaderText hone="Kontakt" htwo="Här kan du hitta kontaktuppgifter" />
      <TempelateOne
        title="Kontaktuppgifter"
        text="Här ser du kontaktuppgifter till olika personer som du kan kontakta
            om du har frågor eller liknande. Vi hjälper gärna till med att få
            ordning på förvirringen."
        component={<FetchKontakt pagePostsToRender={'contact'} />}
      />
    </section>
  );
}
