import HeaderText from '@/app/components/text-content/HeaderText';
import TempelateOne from '@/app/components/tempelates/TempelateOne';
import NoData from '@/app/components/basics/NoData';
import { LinkPost } from '@/app/misc/types';
import { fetchContentfulPosts } from '@/app/actions/actions';
import LinksCont from '@/app/components/basics/LinksCont';

export default async function Lankar() {
  const data: LinkPost[] | undefined = await fetchContentfulPosts({
    contentType: 'lankar',
  });

  return (
    <>
      <section className="flex-1 flex flex-col text-white w-full">
        <HeaderText hone="Länkar" htwo="Här hittar du länkar" />
        {data ? (
          <TempelateOne
            title="Länkar"
            text="Om vi har några viktiga länkar att dela med oss av så kan ni hitta dem här."
            component={<LinksCont posts={data} />}
          />
        ) : (
          <NoData />
        )}
      </section>
    </>
  );
}
