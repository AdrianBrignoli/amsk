'use client';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { fetchContentfulNewsAndCompetition } from '../../../../lib/contentful/ContentfulFetching';
import { createContentfulClient } from '../../../../lib/contentful/ContentfulFetching';
import { CompetitionPost, NewsPost } from '@/app/misc/types';

type FilterOnNameProps = {
  setPosts: React.Dispatch<
    React.SetStateAction<(CompetitionPost | NewsPost)[] | []>
  >;
  postType: 'Nyheter' | 'Tävlingar';
};

export default function FilterOnName({
  setPosts,
  postType,
}: FilterOnNameProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchTermHandler = (e: any) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const search = async () => {
    const postTypeTrans = postType === 'Nyheter' ? 'news' : 'competition';

    const client = createContentfulClient();

    if (!client) return;

    const rslt = await fetchContentfulNewsAndCompetition(
      client,
      0,
      postTypeTrans,
      searchTerm
    );

    console.log(rslt);
    setPosts(rslt);
  };

  return (
    <div className="bg-black bg-opacity-20 w-full mb-4">
      <section className="flex justify-between relative w-full max-w-[1300px] mx-auto rounded-b-3xl p-4">
        <h3 className="text-3xl font-thin">Inlägg</h3>
        <div className="flex items-center">
          <input
            className="bg-black bg-opacity-50 text-gray-300 p-2 rounded-md"
            placeholder="Sök-term"
            onInput={searchTermHandler}
          ></input>
          <BiSearch className="ml-4 text-xl" onClick={search} />
        </div>
      </section>
    </div>
  );
}
