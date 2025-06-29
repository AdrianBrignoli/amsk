import { FC, ReactNode } from "react";
import { BiText, BiCalendar } from "react-icons/bi";

interface PostContentProps {
  title: string | null;
  publishDate: string;
  content: ReactNode;
}

export const PostContent: FC<PostContentProps> = ({
  title,
  publishDate,
  content,
}) => (
  <div className="flex flex-col space-y-1 md:space-y-2 ">
    <h3 className="flex align-center">
      <BiText className="mr-4" />
      {title || "Untitled"}
    </h3>
    <h4 className="flex align-center">
      <BiCalendar className="mr-4" />
      {publishDate}
    </h4>
    <div className="flex align-center text-gray-400">
      <BiText className="mr-4" />
      {content}
    </div>
  </div>
);
