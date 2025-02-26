"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollFadeWrapperProps {
  children: ReactNode;
  threshold?: [number, number]; // [start, end] points for the fade effect
}

export default function ScrollFadeWrapper({
  children,
  threshold = [0, 1], // Default to fade over the entire element
}: ScrollFadeWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Track element from when it enters viewport until it leaves
  });

  const opacity = useTransform(scrollYProgress, threshold, [0, 1]);

  return (
    <motion.div ref={ref} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
