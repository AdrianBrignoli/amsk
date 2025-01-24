import Image from 'next/image';
import { AssociationPost } from '@/app/misc/types';
import { Document, BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

type AssociationContProps = {
  posts: AssociationPost[];
};

export default function AssociationCont({ posts }: AssociationContProps) {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file.url;
        const altText = title || 'image';

        return (
          <div className="w-full rounded-3xl py-4 relative overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center absolute"
              style={{
                backgroundImage: `url(${imageUrl})`,
                filter: 'blur(10px)',
                opacity: '0.3',
              }}
            ></div>
            <Image
              src={`https:${imageUrl}`}
              width={400}
              height={400}
              alt={altText}
              className="md:w-1/3 w-4/5 h-auto rounded-3xl mx-auto relative"
            />
          </div>
        );
      },
    },
  };

  return (
    <>
      {posts.map((post) => {
        const content = documentToReactComponents(
          post.content as Document,
          options
        );

        return (
          <section
            className="max-w-[1300px] mx-auto py-8 px-4 space-y-8 text-gray-300 text-elements"
            key={post.id}
          >
            {content}
          </section>
        );
      })}
    </>
  );
}
