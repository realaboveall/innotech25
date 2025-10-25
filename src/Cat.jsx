import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Innovation at School",
    icon: "🎓",
    img: "https://plus.unsplash.com/premium_photo-1665520346921-768d7e625225?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNjaG9vbHxlbnwwfHwwfHw%3D&w=1000&q=80",
    points: [
      "Innovative ideas from school students.",
      "Team size: 2–8 students (can be from different classes or age groups).",
      "Last date: 31 Oct 2025.",
      "Details to share: School name, Team name, Abstract (100 words).",
    ],
    num: "Category 2",
  },
  {
    title: "Innovation in Research",
    icon: "🔬",
    img: "https://plus.unsplash.com/premium_photo-1661374880675-0c79f7b1dad5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    points: [
      "Innovative ideas from Research Scholars.",
      "Team size: 1–3 students (can be from different courses or colleges).",
      "Last date: 31 Oct 2025.",
      "Details to share: University name, Team name, Abstract (100 words).",
    ],
    num: "Category 3",
  },
  {
    title: "Innovation at Start-up",
    icon: "🚀",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    points: [
      "Innovative ideas from Start-ups/Innovators (registered or to be registered).",
      "Details to share: Start-up/Company name, Product/Service Name, Abstract (100 words) with cost.",
      "Last date: 31 Oct 2025.",
    ],
    num: "Category 4",
  },
];

const Cat = () => {
  return (
    <section
      id="categories"
      className="relative min-h-screen py-24 px-6 text-white bg-black/70 
        backdrop-blur-2xl border border-white/10 rounded-3xl max-w-7xl mx-auto my-24
        shadow-[0_0_35px_rgba(255,255,255,0.05)] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05),transparent_70%)] pointer-events-none"></div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-semibold mb-4 text-center 
          bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 
          bg-clip-text text-transparent font-Fira">
        Open Innovation Categories:
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-400 text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto font-pt">
        Explore the different participation categories where creativity meets
        innovation. Choose your domain and be part of Innotech ’25!
      </motion.p>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="relative group bg-white/5 border border-white/10 backdrop-blur-xl 
              rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500
              hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] flex flex-col">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Icon on top */}
              <div className="absolute bottom-4 left-4 text-4xl md:text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {cat.icon}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3
                className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                  bg-clip-text text-transparent font-Fira">
                {cat.title}
              </h3>

              <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside font-pt">
                {cat.points.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  className="relative px-5 py-2 rounded-full text-2xl font-bold text-white 
                    bg-gradient-to-r from-cyan-400/20 via-purple-400/10 to-pink-400/20
                    border border-white/10 backdrop-blur-md transition-all duration-300 
                    hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                    overflow-hidden group w-full font-pt">
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                  />
                  <span className="relative z-10"> {cat.num}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Cat;
