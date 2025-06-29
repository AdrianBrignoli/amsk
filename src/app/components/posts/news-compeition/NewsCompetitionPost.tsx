import { BiText, BiCalendar } from "react-icons/bi";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { PostType, NewsPost, CompetitionPost } from "@/app/definitions/types";
import { getRelevantDate } from "@/app/utility/tinyUtils";
import { CategoryLabel } from "./CategoryLabel";
import { PostContent } from "./PostContent";

interface PostsProps {
  post: NewsPost | CompetitionPost;
  postType: "Nyheter" | "Tävlingar"; // Add explicit postType
}

export default function NewsCompetitionPost({ post, postType }: PostsProps) {
  if (!post || typeof post !== "object") {
    console.warn("NewsCompetitionPost received invalid post data");
    return null;
  }

  const CATEGORY_CONFIG = {
    Nyheter: {
      bgColor: "#2C3093",
      label: "Nyhet",
    },
    Tävlingar: {
      bgColor: "#EA5661",
      label: "Tävling",
    },
  } as const;

  const contentRN = post.content ? (
    documentToReactComponents(post.content)
  ) : (
    <p className="text-gray-400 italic">No content available</p>
  );

  // Add type check
  if (!(postType in CATEGORY_CONFIG)) {
    console.warn(`Unexpected postType: "${post.postType}"`);
    return null;
  }

  const category = CATEGORY_CONFIG[postType]; // Use passed-in postType instead

  return (
    <section
      className="flex flex-col bg-black bg-opacity-30 text-white my-2 md:my-4 p-2 md:p-4 rounded-2xl relative hover:bg-opacity-50 news-component"
      style={{ borderLeft: `5px solid ${category.bgColor}` }}
    >
      <CategoryLabel label={category.label} bgColor={category.bgColor} />
      <PostContent
        title={post.title!}
        publishDate={post.publishDate}
        content={contentRN}
      />
    </section>
  );
}
