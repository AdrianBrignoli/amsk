import HeaderText from './HeaderText';
import { FetchNewsAndCompetition } from '@/app/actions/actions';

type PostPageContProps = {
  hone: string;
  htwo: string;
  pagePostsToRender: string | null;
};

export default function PostPageCont(postPageContProps: PostPageContProps) {
  const { hone, htwo, pagePostsToRender } = postPageContProps;

  return (
    <section className="flex-1 flex justify-center items-center text-black">
      <div className="flex flex-col space-y-4 w-full">
        <HeaderText hone={hone} htwo={htwo} />
        <div className="max-w-[1300px] mx-auto">
          <div className="overflow-hidden">
            <div
              id="news-posts"
              className="flex flex-col space-y-4 slide-down mx-auto"
            >
              {pagePostsToRender ? (
                <FetchNewsAndCompetition
                  pagePostsToRender={pagePostsToRender}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
