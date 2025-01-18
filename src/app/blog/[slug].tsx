import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;

  //console.log(slug);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <div>Loading content for...</div>;
};

export default BlogPost;
