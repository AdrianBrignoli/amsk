"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { GiSkis } from "react-icons/gi";
import { useRef } from "react";

// Route segment config
//export const dynamic = "force-static";
//export const revalidate = 3600;

export default function Association() {
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);

  const { scrollYProgress: firstProgress } = useScroll({
    target: firstSectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: secondProgress } = useScroll({
    target: secondSectionRef,
    offset: ["start end", "end start"],
  });

  const firstSectionOpacity = useTransform(
    firstProgress,
    [0.4, 0.5, 0.6],
    [0, 1, 0]
  );

  const secondSectionOpacity = useTransform(
    secondProgress,
    [0.4, 0.5, 0.6],
    [0, 1, 0]
  );

  return (
    <main className="flex-1 flex flex-col">
      {/* First Section */}
      <motion.section
        ref={firstSectionRef}
        style={{ opacity: firstSectionOpacity }}
        className="relative h-screen  flex flex-col justify-center items-center"
      >
        <div className="absolute rotate-45 inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,0,0,0.15),transparent_70%)]" />
        <div className="relative text-center z-10 max-w-[1300px] mx-auto">
          <h3 className="text-[3em]">Märsta Skidklubb</h3>
          <p className="text-gray-400 text-2xl">
            Välkommen till den stolta klubben som förenar skidentusiaster i alla
            åldrar och erfarenhetsnivåer. Beläget i hjärtat av Märsta, erbjuder
            vår förening en gemenskap där kärleken till skidåkning står i
            centrum.
          </p>
          <GiSkis className="text-white text-[8em] mx-auto mt-8" />
        </div>
      </motion.section>

      {/* Second Section */}
      <motion.section
        ref={secondSectionRef}
        style={{ opacity: secondSectionOpacity }}
        className="relative h-screen flex flex-col justify-center items-center"
      >
        <div className="max-w-[1300px] mx-auto flex justify-between">
          <h3 className="flex-1 text-[2em] my-auto">Vår grundvärdering</h3>
          <p className="flex-1 text-gray-400 text-lg text-center">
            Vi strävar efter att skapa en inkluderande miljö där både nybörjare
            och erfarna åkare kan njuta av sporten och utvecklas tillsammans.
            Vår förening har en rik historia som sträcker sig över flera
            decennier. Genom åren har vi blivit en välkänd aktör inom
            skidvärlden, både lokalt och regionalt. Vi är stolta över våra
            framgångar på tävlingsbanorna, men lika viktiga är de många glada
            stunderna i skidspåren och på våra träningspass.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
