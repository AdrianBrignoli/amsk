import Image from "next/image";
import { AssociationPost } from "@/app/definitions/types";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type AssociationContProps = {
  posts: AssociationPost[];
};

export default function AssociationCont({ posts }: AssociationContProps) {
  // Get the first post's content array
  const contentElements = posts[0]?.content?.content || [];
  console.log("Content elements:", contentElements);

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        // Find position of this paragraph in contentElements
        const elementIndex = contentElements.findIndex(
          (element) => element === node
        );

        switch (elementIndex) {
          case 0:
            return (
              <div className="w-full h-[40em] relative overflow-hidden">
                <Image
                  src={"/alps.jpg"}
                  alt="mountains"
                  fill={true}
                  className="object-cover" // Ensure image covers properly
                />
                <div className="absolute inset-0 flex w-full ">
                  <div
                    className="
                    flex flex-col items-center justify-center
                    w-full
                    bg-black/60 backdrop-blur-sm
                    p-8
                    text-2xl text-gray-300
                  "
                  >
                    <p className="max-w-[1300px] border-l-4 border-orange-400 pl-4">
                      {children}
                    </p>
                  </div>
                </div>
              </div>
            );
          case 1:
            return (
              <p className="mx-auto text-lg text-gray-400 italic">{children}</p>
            );
          default:
            return <p className=" mx-auto text-lg text-gray-300">{children}</p>;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file.url;
        const altText = title || "image";

        // Find position of this image in contentElements
        const elementIndex = contentElements.findIndex(
          (element) => element === node
        );
        const imageClass =
          elementIndex === 0 ? "md:w-2/3 w-4/5" : "md:w-1/3 w-4/5";

        return (
          <div className="w-full max-w-[1300px] mx-auto rounded-3xl py-4 relative overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center absolute"
              style={{
                backgroundImage: `url(${imageUrl})`,
                filter: "blur(10px)",
                opacity: "0.3",
              }}
            ></div>
            <Image
              src={`https:${imageUrl}`}
              width={400}
              height={400}
              alt={altText}
              className={`${imageClass} h-auto rounded-3xl mx-auto relative`}
            />
          </div>
        );
      },
    },
  };

  return (
    <section className="mx-auto space-y-12">
      {documentToReactComponents(posts[0].content as Document, options)}
    </section>
  );
}
