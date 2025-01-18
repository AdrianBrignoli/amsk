import PostPageCont from '@/app/components/text-content/PostPageCont';
import Calender from '@/app/components/calender/Calender';

export default function News() {
  return (
    <>
      <PostPageCont
        hone="Nyheter"
        htwo="Här kan du läsa om senaste nytt."
        pagePostsToRender="news"
      />
    </>
  );
}
