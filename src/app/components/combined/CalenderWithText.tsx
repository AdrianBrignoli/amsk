import Calender from "../calender/Calender";
import { ErrorBoundary } from "react-error-boundary";
import { NewsPost, CompetitionPost } from "@/app/misc/types";
import { CalenderErrorFallback } from "../calender/CalenderErrorFallback";

const ErrorFallback = () => (
  <div className="w-full h-[22em] bg-black bg-opacity-40 rounded-2xl p-4 flex items-center justify-center">
    <div className="text-center text-gray-300">
      <h3 className="text-xl mb-2">Något gick fel med kalendern</h3>
      <p className="text-sm">Försök ladda om sidan</p>
    </div>
  </div>
);

interface CalenderWithTextProps {
  onPostsUpdate: (posts: (NewsPost | CompetitionPost)[]) => void;
}

export default function CalenderWithText({
  onPostsUpdate,
}: CalenderWithTextProps) {
  return (
    <>
      <div className="flex text-2xl mb-8 text-center w-full rounded-2xl bg-gradient-to-r from-[#2C3093] to-[#EA5661]">
        <p className="p-2 w-full">Nyheter</p>
        <p className="p-2 w-full">Tävlingar</p>
      </div>
      <ErrorBoundary FallbackComponent={CalenderErrorFallback}>
        <Calender onPostsUpdate={onPostsUpdate} />
      </ErrorBoundary>
    </>
  );
}
