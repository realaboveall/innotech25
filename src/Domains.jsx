import React from "react";
import { motion } from "framer-motion";

const domains = [
  {
    icon: "🤖",
    title: "Artificial Intelligence & Machine Learning",
    desc: "Projects that leverage AI/ML for smarter decision-making and automation in real-world scenarios.",
  },
  {
    icon: "🔌",
    title: "IoT, Robotics & Automation",
    desc: "Innovative systems using connected devices, smart sensors, and autonomous machines.",
  },
  {
    icon: "🔐",
    title: "Blockchain, Cybersecurity & Digital Transformation",
    desc: "Secure, transparent, and efficient digital solutions for the future economy.",
  },
  {
    icon: "🌱",
    title: "Renewable Energy & Sustainable Engineering",
    desc: "Technologies that promote clean energy, eco-friendly systems, and resource efficiency.",
  },
  {
    icon: "🏙",
    title: "Smart Cities, Infrastructure & Green Mobility",
    desc: "Intelligent urban development, smart transport, and sustainable mobility solutions.",
  },
  {
    icon: "🩺",
    title: "Healthcare Technologies & Biotechnology",
    desc: "Affordable and advanced medical innovations for better healthcare outcomes.",
  },
  {
    icon: "☁",
    title: "Big Data, Cloud Computing & 5G/6G Technologies",
    desc: "High-speed connectivity and data-driven platforms fueling the next wave of digital growth.",
  },
  {
    icon: "🌾",
    title: "Affordable Tech for Rural Development & Social Impact",
    desc: "Low-cost, impactful solutions addressing rural challenges and improving community welfare.",
  },
  {
    icon: "💧",
    title: "Disaster Management, Water Conservation & Environmental Solutions",
    desc: "Engineering ideas for risk reduction, sustainability, and climate resilience.",
  },
  {
    icon: "💼",
    title: "Start-up & Revenue Generation Solutions",
    desc: "Innovative ideas for entrepreneurship, marketing, and sustainable business growth.",
  },
  {
    icon: "🪩",
    title: "AR/VR, Digital Twins & Industry 4.0",
    desc: "Next-generation immersive and simulation technologies for industries and education.",
  },
];

const InnovationDomains = () => {
  return (
    <section
      className="relative min-h-screen w-full py-24 px-6 text-white bg-black/70 
      backdrop-blur-2xl border border-white/10 rounded-3xl max-w-7xl mx-auto my-24
      shadow-[0_0_35px_rgba(255,255,255,0.05)] overflow-hidden">
      {/* Soft glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05),transparent_70%)] pointer-events-none"></div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-semibold mb-4 text-center 
          bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 
          bg-clip-text text-transparent font-Fira">
        Innovation Domains
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-400 text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto font-pt">
        Students can follow the below domains for Innotech 2025 — but these are
        not limited to.
      </motion.p>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {domains.map((domain, i) => (
          <div
            key={domain.title}
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
                {domain.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2 
                  text-white group-hover:text-cyan-300 transition-colors duration-300 font-Fira">
                {domain.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-pt">
                {domain.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InnovationDomains;
