import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassSection from "./GlassSection";

const Register = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "School",
      icon: "🎓",
      desc: "For school students showcasing creative innovation projects.",
      route: "/login",
    },
    {
      title: "College",
      icon: "🏫",
      desc: "For college innovators ready to present research and prototypes.",
      route: "/login",
    },
    {
      title: "Research",
      icon: "🔬",
      desc: "For academic and institutional researchers driving discovery.",
      route: "/login",
    },
    {
      title: "Startup",
      icon: "🚀",
      desc: "For startup founders transforming ideas into impact.",
      route: "/login",
    },
  ];

  return (
    <GlassSection className="max-w-6xl mx-auto text-center">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-semibold mb-6 
          bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300
          bg-clip-text text-transparent font-Fira">
        Register As
      </motion.h1>

      <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto font-pt">
        Choose your category and begin your journey toward innovation and
        impact.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {cards.map((card, i) => (
          <div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            onClick={() => card.route && navigate(card.route)}
            className="group relative bg-black/40 backdrop-blur-xl border border-white/10 
              rounded-2xl p-8 flex flex-col justify-center items-center text-center cursor-pointer
              hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]
              transition-all duration-500">
            {/* Subtle hover ring */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                transition-all duration-700 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="text-4xl mb-4 text-white/80 group-hover:text-white transition-all duration-300">
                {card.icon}
              </div>
              <h2
                className="text-xl font-semibold mb-2 text-white 
                  tracking-wide group-hover:text-cyan-300 transition-colors duration-300 font-Fira">
                {card.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-pt">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassSection>
  );
};

export default Register;
