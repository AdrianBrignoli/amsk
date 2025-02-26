"use client";
import { SlArrowDown } from "react-icons/sl";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WelcomeScreen() {
  const { scrollY } = useScroll();
  // Instant fade for scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 1], [1, 0]);

  // Main content fades and moves more slowly
  const mainContentOpacity = useTransform(
    scrollY,
    [0, window.innerHeight * 0.3],
    [1, 0]
  );
  const mainContentY = useTransform(
    scrollY,
    [0, window.innerHeight * 0.4],
    [0, -window.innerHeight * 1.5]
  );

  return (
    <div className="relative h-screen text-center">
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
        style={{ opacity: mainContentOpacity, y: mainContentY }}
      >
        <h1 className="text-4xl font-bold">
          Hej och varmt välkommen till Arlanda Märsta SK.
        </h1>
        <p className="text-2xl text-gray-400">
          Den lilla men varma och hjärtliga skidklubben i Sigtuna kommun.
        </p>
      </motion.div>
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-300"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <p className="text-md text-gray-400 mb-8">
          Skrolla ner för att se kalendern
        </p>
        <SlArrowDown className="text-4xl text-gray-400 animate-bounce" />
      </motion.div>
    </div>
  );
}
