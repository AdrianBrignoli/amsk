import HeaderText from '@/app/components/text-content/HeaderText';
import PostPageCont from '@/app/components/text-content/PostPageCont';
import LoadMore from '@/app/components/misc/LoadMore';

export default function Competition() {
  return (
    <>
      <PostPageCont
        hone="Tävlingar"
        htwo="Här kan du läsa om kommande tävlingar."
        pagePostsToRender="competition"
      />
      <LoadMore input="Tävlingar" />
    </>
  );
}
