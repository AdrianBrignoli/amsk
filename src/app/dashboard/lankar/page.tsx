import { LinksPage } from "@/app/components/links/LinksPage";
import { fetchContentfulPosts } from "@/app/actions/actions";
import { LinkPost } from "@/app/definitions/types";

export const revalidate = 3600; // Revalidate every hour (in seconds)

export default async function Lankar() {
  const result = await fetchContentfulPosts({ contentType: "lankar" });
  const data = result.items ? (result.items as LinkPost[]) : undefined;

  return <LinksPage data={data} />;
}
