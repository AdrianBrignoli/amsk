"use client";
import CalendarSection from "./CalendarSection";

export default function ContentSection() {
  return (
    <div className="h-full flex items-center justify-center overflow-hidden">
      <div
        id="content-section"
        className="h-full w-full max-w-[1300px] mx-auto overflow-hidden flex flex-col items-center justify-center"
      >
        <CalendarSection />
      </div>
    </div>
  );
}
