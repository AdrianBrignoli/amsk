"use client";
import { SlArrowDown } from "react-icons/sl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function WelcomeScreen() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  // Instant fade for scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 1], [1, 0]);

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      <div className="text-center space-y-4 overflow-hidden">
        <h1 className="text-4xl font-bold">
          Hej och varmt välkommen till Arlanda Märsta SK.
        </h1>
        <p className="text-2xl text-gray-400">
          Den lilla men varma och hjärtliga skidklubben i Sigtuna kommun.
        </p>
      </div>
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
