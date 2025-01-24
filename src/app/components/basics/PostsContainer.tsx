import Posts from '../text-content/Sections';
import { NewsPost, CompetitionPost } from '@/app/misc/types';
import { useEffect, useState } from 'react';
import PostsSkeleton from '../skeleton/PostsSkeleton';

type PostsContainerProps = {
  posts: (NewsPost | CompetitionPost)[];
  input: 'Nyheter' | 'Tävlingar';
};

export default function PostsContainer({ posts, input }: PostsContainerProps) {
  const [isPostsEmpty, setIsPostsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (!initialPosts) {
      setIsPostsEmpty(true);
    } else {
      setPosts(initialPosts);
    }
  }, []);

  return (
    <section>
      {posts.length === 0
        ? Array(3)
            .fill(0)
            .map((_, index) => <PostsSkeleton key={index} />)
        : posts?.map((post) => {
            return (
              <Posts
                key={post.id}
                id={post.id}
                title={post.title}
                publishDate={post.publishDate}
                content={post.content}
                postType="Nyheter"
              />
            );
          })}
    </section>
  );
}
