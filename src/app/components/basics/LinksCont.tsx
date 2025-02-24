import { LinkPost } from "@/app/definitions/types";
import { PiTextT, PiLink } from "react-icons/pi";
import PostsMisc from "../shared/links-contact/InformativePost";

type LinksContProps = {
  posts: LinkPost[];
};

export default function LinksCont({ posts }: LinksContProps) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => {
        const itemRows = [
          {
            icon: <PiTextT className="mr-4" />,
            content: <p className="text-gray-200">{post.linkName}</p>,
          },
          {
            icon: <PiLink className="mr-4" />,
            content: (
              <p className="text-gray-400">
                <a
                  href={post.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.linkUrl}
                </a>
              </p>
            ),
          },
        ];

        return (
          <li key={post.id}>
            <PostsMisc itemRows={itemRows} />
          </li>
        );
      })}
    </ul>
  );
}
