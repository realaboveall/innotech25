import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  {
    icon: "💰",
    title: "Investors Meet",
    desc: "Startup initiatives will be sponsored and supported by the Technology Business Incubator (TBI) with the theme “Investor Meet” to foster entrepreneurial spirit and real-world applications.",
  },
  {
    icon: "🚀",
    title: "TBI Support",
    desc: "In-depth discussions on funding and start-up registrations following the Investor Meet.",
  },
  {
    icon: "🏆",
    title: "Projects & Ideas: CoE",
    desc: "Display of groundbreaking projects and ideas developed under various Centres of Excellence.",
  },
  {
    icon: "🤖",
    title: "Projects by Technical Clubs",
    desc: "Cutting-edge solutions and innovations presented by different technical clubs.",
  },
  {
    icon: "🧑‍🔬",
    title: "Budding Engineers",
    desc: "IRPR Cell will coordinate with schools for project displays, ensuring wide participation and impactful exposure.",
  },
  {
    icon: "📈",
    title: "Start-ups Showcase",
    desc: "Showcase and promotion of innovative solutions by registered start-ups.",
  },
];

const Sponsor = () => {
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
          bg-clip-text text-transparent font-Fira">
        Special Attractions & Sponsorships
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-400 text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto font-pt">
        Discover the exclusive highlights and institutional support that make
        Innotech’25 more impactful and exciting.
      </motion.p>

      {/* Sponsor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsors.map((item, i) => (
          <div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative bg-black/40 backdrop-blur-xl border border-white/10 
              rounded-2xl p-6 flex flex-col items-start justify-between 
              hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.07)]
              transition-all duration-500">
            <div className="relative z-10">
              <div className="text-4xl mb-4 text-white/80 font-Fira">
                {item.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2 
                  text-white group-hover:text-cyan-300 transition-colors duration-300 font-Fira">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-pt">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sponsor;
