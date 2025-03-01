"use client";

import WelcomeScreen from "./WelcomeScreen";
import ContentSection from "./ContentSection";
import Footer from "../shared/base-elements/Footer";
import { PostsSection } from "./PostsSection";

export function HomePage() {
  return (
    <>
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
        <div className="h-screen w-full snap-start overflow-hidden">
          <WelcomeScreen />
        </div>

        <div className="h-screen w-full snap-start overflow-hidden">
          <ContentSection />
        </div>

        <div className="w-full snap-start overflow-hidden">
          <Footer />
        </div>
      </div>
      <PostsSection />
    </>
  );
}
