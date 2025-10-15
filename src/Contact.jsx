import React from "react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const Contact = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const contacts = [
    {
      name: "Dr. Manish Bhardwaj",
      role: "Planning & Implementation Head",
      phone: "+91 94579 66671",
    },
    {
      name: "Dr. Rohit Vashisht",
      role: "Executive Head",
      phone: "+91 88009 59638",
    },
    {
      name: "Dr. Ashima Arya",
      role: "Media and Promotion Head",
      phone: "+91 94165 58700",
    },
    {
      name: "Mr. Abhishek Tyagi",
      role: "Website Coordinator",
      phone: "+91 87558 99420",
    },
  ];

  return (
    <GlassSection className="max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-extrabold mb-10 text-center
          bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500
          bg-clip-text text-transparent tracking-tight">
        Innotech ’25 – Organizing Committee
      </motion.h1>

      {/* Email Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16 text-center">
        <h2 className="text-lg md:text-xl text-gray-400 mb-2">
          📧 Email us at:
        </h2>
        <a
          href="mailto:innotech@kiet.edu"
          className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
            text-transparent bg-clip-text hover:scale-105 transform transition-all inline-block
            drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
          innotech@kiet.edu
        </a>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-8">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.name}
            variants={item}
            className="relative bg-black/60 backdrop-blur-lg rounded-2xl p-6 md:p-8
              border border-white/10 hover:border-cyan-400/50 transition-all duration-500
              shadow-[0_0_25px_rgba(236,72,153,0.1)] hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]
              hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/70 opacity-40 rounded-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {contact.name}
                </h3>
                <p className="text-gray-400 text-lg">{contact.role}</p>
              </div>

              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-xl font-semibold text-cyan-400 hover:text-purple-400
                  transition-colors duration-300 drop-shadow-[0_0_8px_rgba(147,51,234,0.4)]">
                <span>📞</span>
                {contact.phone}
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </GlassSection>
  );
};

export default Contact;
