import { motion } from "framer-motion";

export function Introduction() {
  return (
    <motion.div
      className="relative h-screen flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{
        amount: 0.5, // Triggers when 50% of element is in view
        margin: "100px 0px", // Margin around viewport
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,86,97,0.15),transparent_70%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1300px] mx-auto"
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-white text-2xl">
          Välkommen till Märsta Skidförening, den stolta klubben som förenar
          skidentusiaster i alla åldrar och erfarenhetsnivåer. Beläget i hjärtat
          av Märsta, erbjuder vår förening en gemenskap där kärleken till
          skidåkning står i centrum.
        </p>
      </motion.div>
    </motion.div>
  );
}
