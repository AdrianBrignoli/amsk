import { fetchContentfulPosts } from "@/app/actions/actions";
import { AboutPost } from "@/app/definitions/types";
import AboutContent from "@/app/components/about/AboutContent";
import ErrorSmall from "@/app/components/shared/error/ErrorSmall";

// Route segment config
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function AboutPage() {
  const result = await fetchContentfulPosts({
    contentType: "aboutUs",
    limit: 10,
    skip: 0,
  });

  console.log("Raw Contentful result:", result);
  const aboutContent = result.items ? (result.items as AboutPost[]) : [];
  console.log("Processed content:", aboutContent);

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {aboutContent.length > 0 ? (
        <AboutContent posts={aboutContent} />
      ) : (
        <ErrorSmall message="Kunde inte ladda innehållet. Försök igen senare." />
      )}
    </main>
  );
}
