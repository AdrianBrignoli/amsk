import { ContactPage } from "@/app/components/contact/ContactPage";
import { fetchContentfulPosts } from "@/app/actions/actions";
import { ContactPost } from "@/app/definitions/types";

export default async function Contact() {
  let data: ContactPost[] | undefined;

  try {
    const result = await fetchContentfulPosts({ contentType: "contact" });
    data = result.items ? (result.items as ContactPost[]) : undefined;
  } catch (error) {
    console.error("Failed to fetch contact data:", error);
    data = undefined;
  }

  return <ContactPage data={data} />;
}
