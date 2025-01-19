import PostPageCont from '@/app/components/text-content/PostPageCont';
import LoadMore from '@/app/components/misc/LoadMore';

export default function News() {
  return (
    <>
      <PostPageCont
        hone="Nyheter"
        htwo="Här kan du läsa om senaste nytt."
        pagePostsToRender="news"
      />

      <LoadMore />
    </>
  );
}
