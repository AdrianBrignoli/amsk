import { BiText, BiCalendar } from 'react-icons/bi';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PostType, NewsPost, CompetitionPost } from '@/app/misc/types';

export default function Posts({
  id,
  title,
  publishDate,
  content,
  postType,
}: NewsPost | CompetitionPost) {
  if (content === null) return;

  const contentRN = documentToReactComponents(content);

  let categoryBgColor = '';
  let sectionLabel = '';
  console.log(postType);
  if (postType !== null && postType === 'Nyheter') {
    categoryBgColor = '#2C3093';
    sectionLabel = 'Nyhet';
  } else {
    categoryBgColor = '#EA5661';
    sectionLabel = 'Tävling';
  }

  return (
    <section
      key={id}
      className="flex flex-col bg-black bg-opacity-30 text-white my-2 pl-6 p-4 rounded-2xl relative hover:bg-opacity-50 news-component"
      style={{ borderLeft: `5px solid ${categoryBgColor}` }}
    >
      <p
        className={`absolute right-0 top-0 p-1  w-32 text-center rounded-tr-2xl rounded-bl-2xl bg-opacity-50 bg-[${categoryBgColor}]`}
      >
        {sectionLabel}
      </p>
      <div className="flex flex-col space-y-2 py-4">
        <h3 className="flex align-center">
          <BiText className="mr-4" />
          {title}
        </h3>
        <h4 className="flex align-center">
          <BiCalendar className="mr-4" />
          {publishDate}
        </h4>
        <div className="flex align-center text-gray-400">
          <BiText className="mr-4" />
          {contentRN}
        </div>
      </div>
    </section>
  );
}
