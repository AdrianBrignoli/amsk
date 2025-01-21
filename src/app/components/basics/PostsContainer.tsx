import Posts from '../text-content/Sections';
import { NewsPost, CompetitionPost } from '@/app/misc/types';

type PostsContainerProps = {
  posts: (NewsPost | CompetitionPost)[];
  input: 'Nyheter' | 'Tävlingar';
};

export default function PostsContainer({ posts, input }: PostsContainerProps) {
  return (
    <section className="flex flex-col space-y-4 w-full max-w-[1300px] mt-2 mx-auto">
      {posts.map((post) => {
        return (
          <Posts
            id={post.id}
            title={post.title}
            publishDate={post.publishDate}
            content={post.content}
            postType={input}
          />
        );
      })}
    </section>
  );
}
