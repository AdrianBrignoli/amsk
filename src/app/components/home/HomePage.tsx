import CalendarSection from "./CalendarSection";
import { PostsSection } from "./PostsSection";
import HeaderSection from "../shared/HeaderSection";

export function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      <HeaderSection
        hone="Hej och varmt välkommen till Arlanda Märsta SK."
        htwo="Den lilla men varma och hjärtliga skidklubben i Sigtuna kommun."
      />

      <section className="page-container">
        <CalendarSection />
        <PostsSection />
      </section>
    </main>
  );
}
