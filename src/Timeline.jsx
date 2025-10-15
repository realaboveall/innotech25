import React from "react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const Timeline = () => {
  const events = [
    {
      date: "October 1",
      emoji: "🚀",
      title: "Registrations Open",
      time: "9:00 AM",
      description:
        "Registration for Innotech 25 opens. Participants can sign up for competitions, workshops, and events.",
    },
    {
      date: "October 20",
      emoji: "💻",
      title: "Registrations Close",
      time: "11:59 PM",
      description:
        "Final deadline to register. Ensure your team and event selections are submitted before midnight.",
    },
    {
      date: "November 7",
      emoji: "🤖",
      title: "Departmental Level",
      time: "10:00 AM",
      description: "Projects would be evaluated at the departmental level.",
    },
    {
      date: "November 13",
      emoji: "📊",
      title: "Institute Level",
      time: "10:00 AM",
      description:
        "Final round of the event. Showcase your projects & compete to win!",
    },
  ];

  return (
    <GlassSection className="relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl mb-4 text-center 
          bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 
          bg-clip-text text-transparent font-extrabold tracking-tight">
        Innotech ’25 Timeline
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-center mb-12 md:mb-20 text-gray-300">
        Four milestones of innovation, collaboration, and excellence.
      </motion.p>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Neon vertical line (centered for all) */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px]
          bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500
          blur-[2px] opacity-80 rounded-full"></div>

        {events.map((event, index) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className={`flex items-center mb-16 md:mb-20 relative 
              ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} 
              flex-col text-center md:text-left`}>
            {/* Node */}
            <div
              className="absolute md:static left-1/2 -translate-x-1/2 md:translate-x-0 w-10 h-10 md:w-12 md:h-12 
                rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                flex items-center justify-center text-2xl 
                shadow-[0_0_25px_rgba(236,72,153,0.3)] mb-4 md:mb-0">
              {event.emoji}
            </div>

            {/* Card */}
            <div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:pr-16" : "md:pl-16"
              }`}>
              <div
                className="relative bg-black/60 backdrop-blur-lg border border-white/10
                  rounded-2xl p-5 sm:p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]
                  hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]
                  transition-all duration-500 text-left md:text-left">
                <div
                  className="absolute inset-0 bg-gradient-to-br 
                    from-transparent via-white/5 to-black/60 opacity-40 pointer-events-none rounded-2xl"></div>

                <div className="relative z-10">
                  <h3
                    className="text-lg sm:text-xl font-bold mb-1 
                      bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                      bg-clip-text text-transparent">
                    {event.date}
                  </h3>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">
                    {event.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-2">{event.time}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassSection>
  );
};

export default Timeline;
