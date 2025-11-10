import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const resultsData = [
  {
    trackNum: 1,
    title: "Smart Solutions, Smarter Society",
    icon: "🌐",
    branches: [
      {
        branch: "KIET - CSE-AI",
        teams: [
          { code: "CL-1804", name: "Idea Forge" },
          { code: "CL-6478", name: "Roadies" },
        ],
      },
      {
        branch: "KIET - CSE-AIML",
        teams: [
          { code: "CL-4166", name: "Moggers" },
          { code: "CL-9351", name: "8_bit" },
        ],
      },
      {
        branch: "KIET - CSE",
        teams: [
          { code: "CL-4789", name: "Comrades" },
          { code: "CL-1971", name: "Exodus" },
        ],
      },
      {
        branch: "KIET - MCA",
        teams: [{ code: "CL-3272", name: "The Think Tank" }],
      },
      { branch: "KIET - ME", teams: [{ code: "CL-1321", name: "TEAM YU" }] },
      {
        branch: "KIET - IT",
        teams: [{ code: "CL-8834", name: "ChainScholars" }],
      },
      { branch: "KIET - EEE", teams: [{ code: "CL-9863", name: "X spark" }] },
      { branch: "KIET - ECE", teams: [{ code: "CL-7498", name: "HopeBlink" }] },
      {
        branch: "KIET - CSIT",
        teams: [{ code: "CL-1266", name: "Path Finders" }],
      },
      {
        branch: "KIET - CS",
        teams: [
          { code: "CL-4534", name: "MindForge" },
          { code: "CL-2274", name: "Nexora" },
        ],
      },
      {
        branch: "KIET MBA",
        teams: [{ code: "CL-8790", name: "Marketing Maneuever" }],
      },
      {
        branch: "KIET Pharmacy",
        teams: [{ code: "CL-5819", name: "Footease" }],
      },
      {
        branch: "JSS academy",
        teams: [{ code: "CL-1075", name: "Hack4Harvest" }],
      },
      { branch: "MGIMT", teams: [{ code: "CL-3992", name: "Hope hackers" }] },
      {
        branch: "United College of Engineering and Research",
        teams: [{ code: "CL-5288", name: "KryGen" }],
      },
      {
        branch: "IEC Engineering College Greater Noida",
        teams: [{ code: "CL-5675", name: "Team IEC" }],
      },
      {
        branch: "Raj Kumar Goel Institute of Technology",
        teams: [{ code: "CL-5987", name: "Trifecta" }],
      },
      {
        branch: "Hi-Tech Institute of Engineering and Technology",
        teams: [
          { code: "CL-6175", name: "Research Radiance" },
          { code: "CL-7900", name: "Research Radiance" },
        ],
      },
      { branch: "ABES", teams: [{ code: "CL-6622", name: "Navjivan" }] },
      {
        branch: "Ajay Kumar Garg Engineering College",
        teams: [
          { code: "CL-7248", name: "Team Nimfresh" },
          { code: "CL-8892", name: "Sarthee AI" },
        ],
      },
      {
        branch: "JC Bose University Of Science And Technology, YMCA",
        teams: [{ code: "CL-9832", name: "Aarogya Catalysts" }],
      },
    ],
  },
  {
    trackNum: 2,
    title: "AI Solutions for Automation",
    icon: "🤖",
    branches: [
      {
        branch: "KIET - CSE-AI",
        teams: [{ code: "CL-5307", name: "Neptune Nexus" }],
      },
      {
        branch: "KIET - CSE-AIML",
        teams: [{ code: "CL-5285", name: "StockVerse" }],
      },
      {
        branch: "KIET - CSE",
        teams: [
          { code: "CL-4945", name: "Chitti Gang" },
          { code: "CL-7898", name: "Nexus" },
        ],
      },
      { branch: "KIET - MCA", teams: [{ code: "CL-5839", name: "Marvels" }] },
      { branch: "KIET - IT", teams: [{ code: "CL-3482", name: "Spartans" }] },
      { branch: "KIET - EEE", teams: [{ code: "CL-1772", name: "Solnex" }] },
      { branch: "KIET - ECE", teams: [{ code: "CL-6258", name: "Nirmaan" }] },
      {
        branch: "KIET - CSIT",
        teams: [{ code: "CL-4821", name: "IntelliTrack" }],
      },
      {
        branch: "KIET - CS",
        teams: [
          { code: "CL-9756", name: "Eternal" },
          { code: "CL-3136", name: "NeuroNauts" },
        ],
      },
      { branch: "KIET MBA", teams: [{ code: "CL-4759", name: "KIETians" }] },
      {
        branch: "Raj Kumar Goel Institute of Technology",
        teams: [{ code: "CL-3450", name: "Byte me harder" }],
      },
      { branch: "ABES", teams: [{ code: "CL-6604", name: "TECHUB" }] },
    ],
  },
  {
    trackNum: 3,
    title: "Automation and Robotics",
    icon: "🔧",
    branches: [
      {
        branch: "KIET - CSE-AI",
        teams: [{ code: "CL-9749", name: "Negatron" }],
      },
      {
        branch: "KIET - CSE-AIML",
        teams: [{ code: "CL-4597", name: "SENSEI" }],
      },
      { branch: "KIET - CSE", teams: [{ code: "CL-6123", name: "TechDivas" }] },
      { branch: "KIET - MCA", teams: [{ code: "CL-9910", name: "Ecogrid" }] },
      { branch: "KIET - ME", teams: [{ code: "CL-3341", name: "SmartShift" }] },
      { branch: "KIET - IT", teams: [{ code: "CL-3116", name: "AlphaNexus" }] },
      { branch: "KIET - EEE", teams: [{ code: "CL-9219", name: "PiPaws" }] },
      { branch: "KIET - ECE", teams: [{ code: "CL-4224", name: "CareTech" }] },
      { branch: "KIET - CSIT", teams: [{ code: "CL-3562", name: "ROBOGEN" }] },
      {
        branch: "KIET - CS",
        teams: [{ code: "CL-9125", name: "SynaptiMinds" }],
      },
      {
        branch: "KIET Pharmacy",
        teams: [{ code: "CL-4381", name: "INNOREST" }],
      },
      {
        branch: "Ajay Kumar Garg Engineering College",
        teams: [{ code: "CL-3639", name: "Vasuki" }],
      },
    ],
  },
  {
    trackNum: 4,
    title: "From Concept to Reality",
    icon: "🚀",
    branches: [
      {
        branch: "KIET - CSE-AI",
        teams: [{ code: "CL-8100", name: "Team_Aerosi" }],
      },
      {
        branch: "KIET - CSE-AIML",
        teams: [{ code: "CL-2766", name: "VoltVoyage" }],
      },
      {
        branch: "KIET - CSE",
        teams: [{ code: "CL-1611", name: "Innovatrix" }],
      },
      {
        branch: "KIET - MCA",
        teams: [{ code: "CL-8313", name: "VisionMatrix" }],
      },
      { branch: "KIET - ME", teams: [{ code: "CL-7744", name: "Stoptrix" }] },
      {
        branch: "KIET - IT",
        teams: [{ code: "CL-3040", name: "Virtue Voyagers" }],
      },
      {
        branch: "KIET - EEE",
        teams: [{ code: "CL-3199", name: "Solar Achievers" }],
      },
      {
        branch: "KIET - ECE",
        teams: [{ code: "CL-7410", name: "HerbGuardians" }],
      },
      {
        branch: "KIET - CSIT",
        teams: [{ code: "CL-1921", name: "Green Fusion" }],
      },
      {
        branch: "KIET - CS",
        teams: [{ code: "CL-2344", name: "SOL-EV WHEELS" }],
      },
      {
        branch: "KIET MBA",
        teams: [{ code: "CL-3846", name: "THE CASE CLUB" }],
      },
      {
        branch: "KIET Pharmacy",
        teams: [{ code: "CL-2322", name: "VenoVibe" }],
      },
      { branch: "JSSATEN", teams: [{ code: "CL-6064", name: "VOXMAPS" }] },
    ],
  },
  {
    trackNum: 5,
    title: "Start Small, Scale Big, Sustain Always",
    icon: "🌱",
    branches: [
      {
        branch: "KIET - CSE-AI",
        teams: [{ code: "CL-8778", name: "Tornado" }],
      },
      {
        branch: "KIET - CSE-AIML",
        teams: [{ code: "CL-9158", name: "Nirmaan" }],
      },
      {
        branch: "KIET - CSE",
        teams: [{ code: "CL-4873", name: "Yellow Duck" }],
      },
      { branch: "KIET - MCA", teams: [{ code: "CL-3189", name: "AIvengers" }] },
      { branch: "KIET - ME", teams: [{ code: "CL-2423", name: "SOLHYDRA" }] },
      { branch: "KIET - IT", teams: [{ code: "CL-1978", name: "Aegis" }] },
      {
        branch: "KIET - EEE",
        teams: [{ code: "CL-9664", name: "CupN'Crunch" }],
      },
      { branch: "KIET - ECE", teams: [{ code: "CL-1724", name: "Echobots" }] },
      {
        branch: "KIET - CSIT",
        teams: [{ code: "CL-4668", name: "The Social Escape" }],
      },
      { branch: "KIET - CS", teams: [{ code: "CL-2091", name: "Team Codex" }] },
      {
        branch: "KIET MBA",
        teams: [{ code: "CL-4143", name: "Team TechBiz" }],
      },
      {
        branch: "KIET Pharmacy",
        teams: [{ code: "CL-4907", name: "EcoEase Femcare" }],
      },
      {
        branch: "ABES",
        teams: [{ code: "CL-2913", name: "Founders in progress" }],
      },
      {
        branch: "Rajshree Institute of Management and Technology, Bareilly",
        teams: [{ code: "CL-9575", name: "3D model" }],
      },
    ],
  },
  {
    trackNum: 6,
    title: "Gen Z to Budding Engineers",
    icon: "🧠",
    branches: [
      {
        branch: "KIET - CSE-AI",
        teams: [{ code: "CL-5611", name: "Team Solarixx" }],
      },
      {
        branch: "KIET - CSE-AIML",
        teams: [{ code: "CL-6616", name: "INNOVATRIX" }],
      },
      {
        branch: "KIET - CSE",
        teams: [{ code: "CL-3771", name: "The Invincibles" }],
      },
      { branch: "KIET - ME", teams: [{ code: "CL-6312", name: "MiraiTek" }] },
      {
        branch: "KIET - CSE - Cyber Security",
        teams: [{ code: "CL-5319", name: "Vision" }],
      },
      { branch: "KIET - IT", teams: [{ code: "CL-5897", name: "Impulsive" }] },
      { branch: "KIET - EEE", teams: [{ code: "CL-9701", name: "XpertNet" }] },
      {
        branch: "KIET - ECE",
        teams: [{ code: "CL-4146", name: "BOLD BYTES" }],
      },
      {
        branch: "KIET - CSIT",
        teams: [{ code: "CL-8807", name: "URS_NeuroFit" }],
      },
      {
        branch: "KIET - CS",
        teams: [{ code: "CL-5084", name: "404 NOT FOUNDERS" }],
      },
      {
        branch: "KIET - CSE - Data Science",
        teams: [{ code: "CL-4800", name: "Takatak.exe" }],
      },
    ],
  },
  {
    trackNum: 7,
    title: "Creative Visions for a Sustainable Future",
    icon: "🎨",
    branches: [
      {
        branch: "KIET - CSE-AI",
        teams: [{ code: "CL-3021", name: "Nexus Green" }],
      },
      {
        branch: "KIET - CSE-AIML",
        teams: [{ code: "CL-9972", name: "DataWizards" }],
      },
      { branch: "KIET - CSE", teams: [{ code: "CL-5179", name: "Serenium" }] },
      { branch: "KIET - ME", teams: [{ code: "CL-4796", name: "Seedsens" }] },
      { branch: "KIET - IT", teams: [{ code: "CL-5115", name: "Oreo" }] },
      {
        branch: "KIET - EEE",
        teams: [{ code: "CL-3901", name: "URS_Assisto" }],
      },
      { branch: "KIET - ECE", teams: [{ code: "CL-2133", name: "SafeMine" }] },
      {
        branch: "KIET - CSIT",
        teams: [{ code: "CL-9899", name: "OccuHealth Monitor" }],
      },
      {
        branch: "KIET - CS",
        teams: [{ code: "CL-1002", name: "The Civic Nexus" }],
      },
      {
        branch: "KIET - MBA",
        teams: [{ code: "CL-5721", name: "Ecoconect KIET" }],
      },
      {
        branch: "KIET - Pharmacy",
        teams: [{ code: "CL-3498", name: "InnoSoch" }],
      },
      {
        branch: "RD Engineering College Muradnagar Ghaziabad",
        teams: [{ code: "CL-6417", name: "Techvortx" }],
      },
    ],
  },
];

const CollapsibleTrack = ({ track, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden
             hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.06)] transition-all duration-500">
      {/* Track Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 md:px-8 md:py-5
               text-white/90 font-Fira hover:bg-white/5 transition-all duration-300">
        <div className="flex items-center gap-3 text-left">
          <div className="text-2xl md:text-3xl">{track.icon}</div>
          <h2 className="text-lg md:text-xl font-semibold tracking-wide">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400">
              Track {track.trackNum}
            </span>{" "}
            — {track.title}
          </h2>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg md:text-xl text-white/70 ml-3">
          ⌄
        </motion.div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="px-5 md:px-8 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {track.branches.map((branch, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 md:p-4
                         hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <h3 className="font-Fira text-base md:text-lg mb-2 text-white/90 text-center">
                    {branch.branch}
                  </h3>

                  {branch.teams && branch.teams.length > 0 ? (
                    <ul className="space-y-1.5 font-pt text-[13px] md:text-sm text-gray-300">
                      {branch.teams.map((t, j) => (
                        <li
                          key={j}
                          className="flex items-center justify-between bg-black/30 border border-white/10 
                                 rounded-md px-2.5 py-1.5 hover:bg-black/40 hover:border-white/20 transition">
                          <span>{t.name}</span>
                          <span className="text-[11px] font-mono text-white/80 bg-white/5 border border-white/10 px-1.5 py-[1px] rounded">
                            {t.code}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-xs text-center">
                      No teams listed.
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Results = () => {
  return (
    <main
      className="relative min-h-screen w-full py-24 px-6 text-white bg-black/5 backdrop-blur-2xl 
                 border border-white/10 rounded-3xl max-w-7xl mx-auto my-24 shadow-[0_0_35px_rgba(255,255,255,0.05)]">
      {/* Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.07),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl md:text-5xl font-semibold mb-4 font-Fira
                   bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Innotech ’25 — Results
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-gray-300/90 text-lg md:text-xl text-center mb-12 max-w-3xl mx-auto font-pt">
        Tap or click each track below to view shortlisted teams — displayed
        branch-wise.
      </motion.p>

      {/* Tracks */}
      <div className="space-y-8">
        {resultsData.map((track, idx) => (
          <CollapsibleTrack key={track.trackNum} track={track} index={idx} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-6 border-t border-white/10 text-center">
        <p className="text-gray-400 text-sm font-pt">
          🎉 Celebrating creativity, collaboration, and innovation at Innotech
          ’25.
        </p>
      </div>
    </main>
  );
};

export default Results;
