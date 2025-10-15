import React from "react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";
import { Link } from "react-router-dom";

const Theme = () => {
  return (
    <GlassSection className="my-24 max-w-6xl mx-auto text-center">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight 
          bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 
          bg-clip-text text-transparent mb-4 font-Fira">
        A Step towards Innovation, Start-ups and Sustainable Society
      </motion.h1>
      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12 font-pt text-2xl">
        Innotech’25 aims to address societal challenges and deliver innovative
        solutions aligned with the UN Sustainable Development Goals (SDGs).
      </motion.p>

      {/* Event Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300 text-lg mb-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-Fira font-extrabold">📅</span> November
          13, 2025
        </div>
        <div className="hidden sm:block text-gray-500">•</div>
        <div className="flex items-center gap-2">
          <span className="text-2xltext-2xl font-Fira">📍</span> KIET Group of
          Institutions
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
        {[
          { label: "Participants", value: "42+" },
          { label: "Teams", value: "4+" },
          { label: "Prize Pool", value: "₹2.6L+" },
          { label: "Awards", value: "100+" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl py-6 px-4 
              shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] 
              transition-all duration-500">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {stat.value}
            </h3>
            <p className="text-gray-400 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* About Innotech */}
    </GlassSection>
  );
};

export default Theme;
