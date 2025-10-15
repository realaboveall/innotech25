import React from "react";
import { motion } from "framer-motion";

const GlassSection = ({ children, className = "", delay = 0 }) => {
  return (
    <section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative z-10 py-20 px-6 md:px-12 
        bg-black/70 backdrop-blur-xl border border-white/10
        rounded-2xl shadow-[0_0_35px_rgba(147,51,234,0.15)]
        overflow-hidden transition-all duration-700 
        hover:shadow-[0_0_45px_rgba(236,72,153,0.2)] 
        ${className}`}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/80 opacity-40 pointer-events-none"></div>

      {/* Section content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default GlassSection;
