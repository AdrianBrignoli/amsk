"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import CalendarSection from "./CalendarSection";
import { PostsSection } from "./PostsSection";

export default function ContentSection() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const opacity = useTransform(scrollY, [0, windowHeight * 0.3], [0, 1]);
  const y = useTransform(
    scrollY,
    [0, windowHeight * 0.4],
    [windowHeight * 0.5, 0]
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
