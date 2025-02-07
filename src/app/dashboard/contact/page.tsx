import HeaderText from '@/app/components/text-content/HeaderText';
import TempelateOne from '@/app/components/tempelates/TempelateOne';
import ContactCont from '@/app/components/basics/ContactCont';
import { fetchContentfulPosts } from '@/app/actions/actions';
import { ContactPost } from '@/app/misc/types';
import NoData from '@/app/components/basics/NoData';

export default async function Contact() {
  const data: ContactPost[] | undefined = await fetchContentfulPosts({
    contentType: 'contact',
  });

  return (
    <section className="flex-1 flex flex-col text-white w-full">
      <HeaderText hone="Kontakt" htwo="Här kan du hitta kontaktuppgifter" />
      {data ? (
        <>
          <TempelateOne
            title="Kontaktuppgifter"
            text="Här ser du kontaktuppgifter till olika personer som du kan kontakta
                  om du har frågor eller liknande. Vi hjälper gärna till med att få
                  ordning på förvirringen."
            component={<ContactCont posts={data} />}
          />
        </>
      ) : (
        <NoData />
      )}
    </section>
  );
}
