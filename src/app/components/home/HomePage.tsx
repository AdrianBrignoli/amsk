"use client";

import WelcomeScreen from "./WelcomeScreen";
import ContentSection from "./ContentSection";

export function HomePage() {
  return (
    <>
      {/* This div creates scrollable height without showing content */}
      <div className="h-[120vh]" />

      {/* Fixed container for our stacked sections */}
      <main className="fixed inset-0 w-full h-screen">
        <WelcomeScreen />
        <ContentSection />
      </main>
    </>
  );
}
