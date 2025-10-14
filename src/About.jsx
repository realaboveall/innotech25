import { motion } from "motion/react";
import React from "react";
import GlassSection from "./GlassSection";

function About() {
  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-gray-300 leading-relaxed mb-12">
        <h3
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
            bg-clip-text text-transparent">
          About Innotech
        </h3>
        <p className="mb-4">
          Where innovation meets opportunity and the future takes shape.
        </p>
        <p className="text-gray-400 italic mb-4">
          Innotech 2025 is more than just a tech fest — it's a launchpad for
          innovation, a networking powerhouse, and a celebration of
          technological excellence.
        </p>
        <p>
          Join hundreds of brilliant minds as we explore the frontiers of AI,
          robotics, web development, and emerging technologies. From coding
          challenges to project showcases, expert workshops to industry
          mentorship, Innotech bridges academic learning and real-world
          innovation.
        </p>
      </motion.div>
      {/* Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: "💡",
            title: "Innovation Challenges",
            desc: "Push boundaries with real-world problem solving",
          },
          {
            icon: "🏆",
            title: "Competitive Events",
            desc: "Showcase skills in coding, design, and robotics",
          },
          {
            icon: "🤝",
            title: "Industry Connect",
            desc: "Network with professionals and potential employers",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className="relative bg-black/50 backdrop-blur-lg border border-white/10 
              rounded-2xl p-6 shadow-[0_0_25px_rgba(236,72,153,0.1)] 
              hover:shadow-[0_0_35px_rgba(236,72,153,0.2)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/70 opacity-40 rounded-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4
                className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                  bg-clip-text text-transparent">
                {item.title}
              </h4>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default About;
