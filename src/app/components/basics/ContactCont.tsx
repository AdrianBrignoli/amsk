import { PiPerson, PiPhone } from 'react-icons/pi';
import { PiTextT } from 'react-icons/pi';
import PostsMisc from '../text-content/PostsMisc';
import { ContactPost } from '@/app/misc/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

type ContactContProps = {
  posts: ContactPost[];
};

export default function ContactCont({ posts }: ContactContProps) {
  return (
    <>
      {posts.map((post) => {
        const textComponent = documentToReactComponents(post.text as Document);

        const itemRows = [
          {
            icon: <PiPerson className="mr-4" />,
            content: <p className="text-gray-200">{post.title}</p>,
          },
          {
            icon: <PiPhone className="mr-4" />,
            content: <p className="text-gray-400">{post.phone}</p>,
          },
          {
            icon: <PiTextT className="mr-4" />,
            content: <p className="text-gray-300">{textComponent}</p>,
          },
        ];

        return <PostsMisc key={post.id} itemRows={itemRows} />;
      })}
    </>
  );
}
