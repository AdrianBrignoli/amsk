import { AboutPost } from "@/app/definitions/types";
import { BLOCKS } from "@contentful/rich-text-types";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { SlArrowDown } from "react-icons/sl";

type AboutContentProps = {
  posts: AboutPost[];
};

export default function AboutContent({ posts }: AboutContentProps) {
  const post = posts[0];
  if (!post) return null;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="text-lg text-gray-300 max-w-[800px] mx-auto mb-6">
          {children}
        </p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-3xl font-semibold text-white mb-4 mt-12 max-w-[800px] mx-auto">
          {children}
        </h2>
      ),
    },
  };

  const renderSection = (content: Document | null, className?: string) => {
    if (!content) return null;
    return (
      <div className={className}>
        {documentToReactComponents(content, options)}
      </div>
    );
  };

  const ScrollIndicator = () => (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <p className="text-md text-gray-400 mb-4">Skrolla ner för att läsa mer</p>
      <SlArrowDown className="text-4xl text-gray-400 animate-bounce" />
    </div>
  );

  return (
    <>
      {/* Introduction Section */}
      <section className="h-screen w-full snap-start relative flex items-center justify-center p-8">
        <div className="max-w-[800px] mx-auto">
          {renderSection(
            post.introduction,
            "text-2xl text-gray-300 leading-relaxed"
          )}
        </div>
        <ScrollIndicator />
      </section>

      {/* First Section */}
      <section className="h-screen w-full snap-start relative flex items-center justify-center p-8">
        <div className="max-w-[800px] mx-auto">
          {renderSection(post.firstSection)}
        </div>
      </section>

      {/* Second Section */}
      <section className="h-screen w-full snap-start relative flex items-center justify-center p-8">
        <div className="max-w-[800px] mx-auto">
          {renderSection(post.secondSection)}
        </div>
      </section>

      {/* Third Section */}
      <section className="h-screen w-full snap-start relative flex items-center justify-center p-8">
        <div className="max-w-[800px] mx-auto">
          {renderSection(post.thirdSection)}
        </div>
      </section>

      {/* Final Section */}
      <section className="h-screen w-full snap-start relative flex items-center justify-center p-8">
        <div className="max-w-[800px] mx-auto">
          {renderSection(post.finalSection, "text-xl text-gray-400 italic")}
        </div>
      </section>
    </>
  );
}
