'use client';

import WelcomeScreen from './WelcomeScreen';
import ContentSection from './ContentSection';
import Footer from '../shared/base-elements/Footer';
import { PostsSection } from './PostsSection';

export function HomePage() {
  return (
    <>
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
        <div className="h-screen w-full snap-start overflow-hidden">
          <WelcomeScreen />
          <div className="bg-blue-200 rounded-xl">
            <p>
              Välkommen på årsmöte i Arlanda Märsta SK , tisdagen den 19 maj i
              klubbstugan på Bristagatan 15 klockan 18:30. Efter
              årsmötesförhandlingarna bjuds det på kaffe och tårta. Gamla och
              nya medlemmar hälsas välkomna /Styrelsen
            </p>
          </div>
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
