"use client";
import CalenderHeader from "./CalenderHeader";
import { ContentLayout } from "../shared/ContentLayout";
import { NewsPost, CompetitionPost } from "@/app/definitions/types";
import { useDispatch } from "react-redux";
import { setSelectedPosts } from "@/store/slices/calendarSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CalenderErrorFallback } from "../features/calender/CalenderErrorFallback";
import Calender from "../features/calender/Calender";

export default function CalendarSection() {
  const dispatch = useDispatch();

  const handlePostsUpdate = (posts: (NewsPost | CompetitionPost)[]) => {
    dispatch(setSelectedPosts(posts));
  };

  return (
    <ContentLayout
      title="Kalender"
      description="Använd kalendern för att se uppkommande nyheter eller tävlingar."
    >
      <ErrorBoundary FallbackComponent={CalenderErrorFallback}>
        <CalenderHeader />
        <Calender onPostsUpdate={handlePostsUpdate} />
      </ErrorBoundary>
    </ContentLayout>
  );
}
