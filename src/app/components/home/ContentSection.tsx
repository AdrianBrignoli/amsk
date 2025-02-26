"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import CalendarSection from "./CalendarSection";
import { PostsSection } from "./PostsSection";

export default function ContentSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, window.innerHeight * 0.3], [0, 1]);
  const y = useTransform(
    scrollY,
    [0, window.innerHeight * 0.4],
    [window.innerHeight * 0.5, 0]
  );

  return (
    <motion.section className="fixed inset-0 h-screen" style={{ opacity, y }}>
      <div className="h-full flex items-center justify-center">
        <div className="w-full">
          <CalendarSection />
          <PostsSection />
        </div>
      </div>
    </motion.section>
  );
}
