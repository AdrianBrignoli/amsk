import { ContactPage } from "@/app/components/contact/ContactPage";
import { fetchContentfulPosts } from "@/app/actions/actions";
import { ContactPost } from "@/app/definitions/types";

export default async function Contact() {
  const result = await fetchContentfulPosts({ contentType: "contact" });
  const data = result.items ? (result.items as ContactPost[]) : undefined;

  return <ContactPage data={data} />;
}
