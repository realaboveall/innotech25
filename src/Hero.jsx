import "./App.css";
import { useState } from "react";
import Tracks from "./Tracks";
import Timeline from "./Timeline";
import Participate from "./Participate";
import Contact from "./Contact";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Hyperspeed from "./Hyperspeed";
import { motion, AnimatePresence } from "motion/react";
import Theme from "./Theme";
import Register from "./Register";
import InnovationDomains from "./Domains";
import Sponsor from "./Investors";
import { Element } from "react-scroll";

function Hero() {
  const [openModal, setOpenModal] = useState(null);
  const [showIntro, setShowIntro] = useState(false);

  const handleOpen = (type) => setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  const handleIntro = () => setShowIntro(true);
  const handleCloseIntro = () => setShowIntro(false);

  return (
    <>
      {/* HERO SECTION */}
      <Element name="home">
        <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center">
          {/* Background */}
          <div className="fixed inset-0 bg-black -z-10">
            <Hyperspeed
              effectOptions={{
                onSpeedUp: () => {},
                onSlowDown: () => {},
                distortion: "turbulentDistortion",
                length: 300,
                roadWidth: 10,
                islandWidth: 2,
                lanesPerRoad: 4,
                fov: 100,
                fovSpeedUp: 150,
                speedUp: 2,
                carLightsFade: 0.4,
                totalSideLightSticks: 20,
                lightPairsPerRoadWay: 40,
                shoulderLinesWidthPercentage: 0.05,
                brokenLinesWidthPercentage: 0.1,
                brokenLinesLengthPercentage: 0.5,
                lightStickWidth: [0.12, 0.5],
                lightStickHeight: [1.3, 1.7],
                movingAwaySpeed: [60, 80],
                movingCloserSpeed: [-120, -160],
                carLightsLength: [400 * 0.03, 400 * 0.2],
                carLightsRadius: [0.05, 0.14],
                carWidthPercentage: [0.3, 0.5],
                carShiftX: [-0.8, 0.8],
                carFloorSeparation: [0, 5],
                colors: {
                  roadColor: 0x080808,
                  islandColor: 0x0a0a0a,
                  background: 0x000000,
                  shoulderLines: 0xffffff,
                  brokenLines: 0xffffff,
                  leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                  rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                  sticks: 0x03b3c3,
                },
              }}
            />
          </div>

          {/* Road to Innotech Button */}
          <div className="absolute top-50 flex justify-center w-full z-20">
            <button
              onClick={handleIntro}
              className="relative px-6 py-2 rounded-full border border-white/20 
                text-white/90 font-medium text-sm tracking-wider 
                backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500 
                hover:scale-[1.05] hover:border-white/40 overflow-hidden group
                shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {/* Shimmering line animation */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
              />
              {/* Glow ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 via-fuchsia-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700" />
              {/* Button text */}
              <span className="relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                🚀 Road to Innotech
              </span>
            </button>
          </div>

          {/* Hero Text */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="relative z-10 flex flex-col items-center justify-center text-center mt-6 select-none">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-6xl md:text-7xl lg:text-8xl font-Fira font-extrabold tracking-tight
                  bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
                  bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(147,51,234,0.35)]
                  animate-pulse-slow">
                INNOTECH ’25
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="mt-4 text-lg md:text-2xl text-gray-300 
                  bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-purple-400
                  bg-clip-text text-transparent font-medium tracking-wide font-pt">
                Think Big. Build Smart. Act Sustainable.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              {[
                {
                  label: "Register",
                  gradient:
                    "from-cyan-400/40 via-emerald-400/30 to-lime-400/40",
                  border: "border-cyan-400/40",
                  glow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
                  onClick: () => handleOpen("register"),
                },
                {
                  label: "How to Participate",
                  gradient:
                    "from-pink-500/40 via-fuchsia-400/30 to-purple-500/40",
                  border: "border-pink-400/40",
                  glow: "shadow-[0_0_20px_rgba(244,114,182,0.5)]",
                  onClick: () => handleOpen("participate"),
                },
                {
                  label: "Timeline",
                  gradient: "from-blue-400/40 via-cyan-400/30 to-sky-500/40",
                  border: "border-blue-400/40",
                  glow: "shadow-[0_0_20px_rgba(96,165,250,0.5)]",
                  onClick: () => handleOpen("timeline"),
                },
                {
                  label: "Contact",
                  gradient:
                    "from-violet-500/40 via-purple-400/30 to-fuchsia-500/40",
                  border: "border-violet-400/40",
                  glow: "shadow-[0_0_20px_rgba(167,139,250,0.5)]",
                  onClick: () => handleOpen("contact"),
                },
              ].map(({ label, gradient, border, glow, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className={`relative px-8 py-3.5 bg-gradient-to-r ${gradient} 
                    ${border} border backdrop-blur-xl text-white font-semibold rounded-2xl
                    transition-all duration-700 hover:-translate-y-1 hover:scale-[1.05]
                    ${glow} hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]
                    overflow-hidden group`}>
                  {/* Animated gradient overlay */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] ease-in-out rounded-2xl"
                  />
                  {/* Button text */}
                  <span className="relative z-10 tracking-wide drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">
                    {label}
                  </span>
                  {/* Subtle neon border animation */}
                  <span className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-700" />
                </button>
              ))}
            </div>
          </div>

          {/* Fullscreen Intro Overlay */}
          <AnimatePresence>
            {showIntro && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50 flex flex-col items-center justify-center px-6 text-center border border-white/10 rounded-3xl">
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-3xl">
                  <h2 className="text-4xl md:text-5xl font-Fira font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                    Where innovation meets opportunity and the future takes
                    shape.
                  </h2>
                  <p className="text-gray-300 italic font-pt text-lg mb-4">
                    Innotech 2025 is more than just a tech fest — it's a
                    launchpad for innovation, a networking powerhouse, and a
                    celebration of technological excellence.
                  </p>
                  <p className="text-gray-400 font-pt text-base leading-relaxed">
                    Join hundreds of brilliant minds as we explore the frontiers
                    of AI, robotics, web development, and emerging technologies.
                    From coding challenges to project showcases, expert
                    workshops to industry mentorship — Innotech bridges academic
                    learning and real-world innovation.
                  </p>

                  <button
                    onClick={handleCloseIntro}
                    className="mt-8 px-6 py-2 rounded-full border border-white/20 text-white/80 
                      bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/40">
                    ✕ Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </Element>

      {/* MAIN CONTENT */}
      <section className="relative z-20 bg-black/25">
        <Theme />
        <Element name="tracks">
          <Tracks />
        </Element>
        <Element name="gallery">
          <Gallery />
        </Element>
        <Element name="domains">
          <InnovationDomains />
        </Element>
        <Element name="sponsors">
          <Sponsor />
        </Element>
      </section>

      {/* MODALS */}
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] max-w-4xl max-h-[85vh] overflow-y-auto no-scrollbar
              rounded-2xl border border-white/10 
              bg-gradient-to-br from-white/10 via-white/5 to-transparent
              backdrop-blur-2xl shadow-[0_0_25px_rgba(255,255,255,0.07)] 
              hover:shadow-[0_0_35px_rgba(255,255,255,0.1)]
              transition-all duration-700">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 text-white/70 hover:text-white transition-all duration-300
                rounded-full border border-white/10 bg-white/5 px-2 py-1 text-lg 
                hover:bg-white/10 hover:border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              ✕
            </button>

            {/* Subtle shimmer overlay */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                translate-x-[-100%] animate-[shimmer_4s_linear_infinite] rounded-2xl pointer-events-none opacity-40"
            />

            {/* Content wrapper */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8">
              {openModal === "register" && <Register />}
              {openModal === "participate" && <Participate />}
              {openModal === "timeline" && <Timeline />}
              {openModal === "contact" && <Contact />}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Hero;
