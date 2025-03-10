'use client';
import { Suspense, lazy, memo, useRef } from 'react';
import { ContentLayout } from '../shared/ContentLayout';
import { ErrorBoundary } from 'react-error-boundary';
import CalenderErrorFallback from '../features/calender/CalenderErrorFallback';
import CalenderHeader from './CalenderHeader';
import { useVisibilityRender } from '../features/calender/hooks/useVisibilityRender';

const Calender = lazy(() => import('../features/calender/Calender'));

const CalenderLazy = () => {
  return <div className="bg-black bg-opacity-50 h-[24em] w-full"></div>;
};

// memo'd in case we want to add more dynamic content
const MemoizedCalendarContent = memo(function MemoizedCalendarContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisibilityRender(sectionRef, 0.1);

  return (
    <div ref={sectionRef}>
      <ContentLayout
        title="Kalender"
        description="Använd kalendern för att se uppkommande nyheter eller tävlingar."
      >
        <ErrorBoundary FallbackComponent={CalenderErrorFallback}>
          <CalenderHeader />
          {isVisible ? (
            <Suspense fallback={<CalenderLazy />}>
              <Calender />
            </Suspense>
          ) : (
            <CalenderLazy />
          )}
        </ErrorBoundary>
      </ContentLayout>
    </div>
  );
});

export default function CalendarSection() {
  return <MemoizedCalendarContent />;
}
