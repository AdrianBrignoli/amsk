import HeaderSection from '@/app/components/shared/HeaderSection';
import { ContentLayout } from '@/app/components/shared/ContentLayout';
import ContactCont from '@/app/components/basics/ContactCont';
import { ContactPost } from '@/app/definitions/types';
import ErrorSmall from '../shared/error/ErrorSmall';

interface ContactPageProps {
  data: ContactPost[] | undefined;
}

export function ContactPage({ data }: ContactPageProps) {
  return (
    <main className="flex-1 flex flex-col">
      <ContentLayout
        title="Kontakt"
        description="Här ser du kontaktuppgifter till olika personer som du kan kontakta
                om du har frågor eller liknande. Vi hjälper gärna till med att få
                ordning på förvirringen."
      >
        {data?.length ? (
          <ContactCont posts={data} />
        ) : (
          <ErrorSmall message="Kunde inte ladda kontaktuppgifter. Försök igen senare." />
        )}
      </ContentLayout>
    </main>
  );
}
