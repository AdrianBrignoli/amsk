import { LinkPost } from '@/app/misc/types';
import { PiTextT, PiLink } from 'react-icons/pi';
import Link from 'next/link';
import PostsMisc from '../text-content/PostsMisc';

type LinksContProps = {
  posts: LinkPost[];
};

export default function LinksCont({ posts }: LinksContProps) {
  return (
    <>
      {posts.map((post) => {
        const itemRows = [
          {
            icon: <PiTextT className="mr-4" />,
            content: <p className="text-gray-200">{post.linkName}</p>,
          },
          {
            icon: <PiLink className="mr-4" />,
            content: (
              <p className="text-gray-400">
                <Link href={post.linkUrl}>{post.linkUrl}</Link>
              </p>
            ),
          },
        ];
        return <PostsMisc key={post.id} itemRows={itemRows} />;
      })}
    </>
  );
}
