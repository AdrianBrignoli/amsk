import HeaderSection from '@/app/components/shared/HeaderSection';
import { ContentLayout } from '@/app/components/shared/ContentLayout';
import LinksCont from '@/app/components/basics/LinksCont';
import { LinkPost } from '@/app/definitions/types';
import ErrorSmall from '../shared/error/ErrorSmall';

interface LinksPageProps {
  data: LinkPost[] | undefined;
}

export function LinksPage({ data }: LinksPageProps) {
  return (
    <section className="flex-1 flex flex-col text-white w-full">
      {data ? (
        <ContentLayout
          title="Länkar"
          description="Om vi har några viktiga länkar att dela med oss av så kan ni hitta dem här."
        >
          <LinksCont posts={data} />
        </ContentLayout>
      ) : (
        <ErrorSmall message="Kunde inte ladda länkar. Försök igen senare." />
      )}
    </section>
  );
}
