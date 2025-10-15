import React from "react";
import { motion } from "framer-motion";
import Arrow from "./components/Arrow";
import GlassSection from "./GlassSection";

const Participate = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <GlassSection className="max-w-5xl mx-auto">
      <motion.h1
        variants={item}
        initial="hidden"
        animate="show"
        className="text-4xl md:text-5xl font-extrabold mb-10 text-center 
          bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 
          bg-clip-text text-transparent tracking-tight">
        🚀 How to Participate in Innotech ’25
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-10">
        {[
          {
            title: "1️⃣ Registration & Login",
            text: "Sign in using your college email ID via Firebase Authentication. Once logged in, you'll be redirected to the registration form.",
          },
          {
            title: "2️⃣ Individual Registration",
            text: "Every student must register individually before forming a team.",
            list: [
              "<span class='font-semibold text-cyan-400'>KIET Students:</span> Enter your roll number. Your details auto-fill — verify and submit.",
              "<span class='font-semibold text-cyan-400'>Other Colleges:</span> Fill the form manually and upload a valid ID (Aadhaar/College ID).",
            ],
          },
          {
            title: "3️⃣ Team Formation",
            text: "Once registered, you can create a team:",
            list: [
              "Click “Make Team” – you become the Team Leader.",
              "Choose a Category and a Problem Statement.",
              "Add 2–5 members by searching their Student Identifier.",
            ],
          },
          {
            title: "4️⃣ Hackathon Flow",
            text: "Teams compete in two stages:",
            list: [
              "<span class='font-semibold text-cyan-400'>Department Level:</span> 3 judges evaluate your project (50 marks). Top teams qualify for the institute level.",
              "<span class='font-semibold text-cyan-400'>Institute Level:</span> Another set of 3 judges evaluate the finalists.",
            ],
          },
          {
            title: "📊 Judging Criteria",
            text: "Total of 50 marks based on:",
            list: [
              "Innovation & Originality",
              "Technical Implementation",
              "Relevance & Social Impact",
              "Scalability & Future Scope",
              "Presentation & Query Handling",
            ],
          },
          {
            title: "💡 Tips for Success",
            list: [
              "Complete individual registration before forming a team.",
              "Pick a category that aligns with your project.",
              "Keep your project demo clear and impactful.",
              "Focus on innovation and real-world impact.",
            ],
          },
        ].map((section, i) => (
          <React.Fragment key={i}>
            <motion.div
              variants={item}
              className="relative bg-black/60 backdrop-blur-lg rounded-2xl p-6 md:p-8 
                border border-white/10 hover:border-purple-500 transition-all duration-500 
                shadow-[0_0_25px_rgba(236,72,153,0.1)] hover:shadow-[0_0_35px_rgba(236,72,153,0.2)]">
              {/* faint overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/70 opacity-40 rounded-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <h2
                  className="text-2xl font-bold mb-4 bg-gradient-to-r 
                    from-cyan-400 via-purple-400 to-pink-400 
                    bg-clip-text text-transparent"
                  dangerouslySetInnerHTML={{ __html: section.title }}
                />
                {section.text && (
                  <p className="text-gray-300 mb-4">{section.text}</p>
                )}
                {section.list && (
                  <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                    {section.list.map((item, idx) => (
                      <li
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
            {i !== 5 && <Arrow />}
          </React.Fragment>
        ))}
      </motion.div>
    </GlassSection>
  );
};

export default Participate;
