import React from "react";
import { motion } from "framer-motion";

const tracks = [
  {
    icon: "🌐",
    title: "Smart Solutions, Smarter Society",
    desc: "E-projects focused on web, APIs, mobile apps, cyber security, bioinformatics, and support solutions for a smarter society.",
    num: "Track 1",
  },
  {
    icon: "🤖",
    title: "AI Solutions for Automation",
    desc: "AI-based projects focusing on automation, agentic AI, and generative AI solutions.",
    num: "Track 2",
  },
  {
    icon: "🔧",
    title: "Automation and Robotics",
    desc: "IoT, robotics, sensors, manufacturing, and computer vision projects for real-world automation.",
    num: "Track 3",
  },
  {
    icon: "🚀",
    title: "From Concept to Reality",
    desc: "Projects transforming concepts into reality with drones, EVs, medical devices, space, and green energy.",
    num: "Track 4",
  },
  {
    icon: "💼",
    title: "Startup & Business Innovation",
    desc: "Start-up ideas, productivity, and business models for sustainable economic growth.",
    num: "Track 5",
  },
  {
    icon: "👩‍🎓",
    title: "First-Year Innovators",
    desc: "Prototypes and innovative solutions exclusively from first-year students.",
    num: "Track 6",
  },
  {
    icon: "🌱",
    title: "Poster & Creative Visionary",
    desc: "Posters, models, and infrastructural designs with social, ethical, and environmental focus.",
    num: "Track 7",
  },
];

const Tracks = () => {
  return (
    <section
      className="relative min-h-screen w-full py-24 px-6 text-white bg-black/70 
      backdrop-blur-2xl border border-white/10 rounded-3xl max-w-7xl mx-auto my-24
      shadow-[0_0_35px_rgba(255,255,255,0.05)] overflow-hidden">
      {/* Soft radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05),transparent_70%)] pointer-events-none"></div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-semibold mb-4 text-center 
          bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 
          bg-clip-text text-transparent font-Fira ">
        Innovation Category 2: <br />
        Tracks for College Students
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-400 text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto font-pt">
        Explore seven unique tracks designed to inspire innovation and tackle
        real-world challenges.
      </motion.p>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tracks.map((track, i) => (
          <div
            key={track.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-black/40 backdrop-blur-xl border border-white/10 
              rounded-2xl p-6 flex flex-col items-start justify-between 
              hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.07)]
              transition-all duration-500">
            <div className="relative z-10">
              <div className="text-4xl mb-4 text-white/80 font-Fira">
                {track.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2 
                  text-white group-hover:text-cyan-300 transition-colors duration-300 font-Fira">
                {track.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-pt">
                {track.desc}
              </p>
            </div>

            <button
              className="mt-6 self-start text-sm px-4 py-2 rounded-lg border border-white/10 
                bg-white/5 hover:bg-white/10 hover:border-white/20 
                text-gray-300 hover:text-white transition-all duration-300">
              {track.num}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tracks;
