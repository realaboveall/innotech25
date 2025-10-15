import "./App.css";
import { useState } from "react";
import Tracks from "./Tracks";
import Timeline from "./Timeline";
import Participate from "./Participate";
import Contact from "./Contact";
import Footer from "./Footer";
import Gallery from "./Gallery";
import { motion, AnimatePresence } from "motion/react";
import Theme from "./Theme";
import Register from "./Register";
import InnovationDomains from "./Domains";
import Sponsor from "./Investors";
import { Element } from "react-scroll";
import { useNavigate } from "react-router-dom";
import Cat from "./Cat";

function Hero() {
  const [openModal, setOpenModal] = useState(null);
  const handleOpen = (type) => setOpenModal(type);
  const handleClose = () => setOpenModal(null);
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <Element name="home">
        <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center">
          {/* Road to Innotech Button */}
          <div className="absolute top-50 flex justify-center w-full z-20">
            <button
              className="relative px-6 py-2 rounded-full border border-white/20 
                text-white/90 font-medium text-sm tracking-wider 
                backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500 
                hover:scale-[1.05] hover:border-white/40 overflow-hidden group
                shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
              />
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 via-fuchsia-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700" />
              <span className="relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                🚀 Road to Innotech
              </span>
            </button>
          </div>

          {/* Hero Text */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
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

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              {[
                {
                  label: "Register",
                  gradient:
                    "from-cyan-400/40 via-emerald-400/30 to-lime-400/40",
                  border: "border-cyan-400/40",
                  glow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
                  onClick: () => navigate("/register"),
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
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] ease-in-out rounded-2xl"
                  />
                  <span className="relative z-10 tracking-wide drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">
                    {label}
                  </span>
                  <span className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-700" />
                </button>
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* MAIN CONTENT */}
      <section className="relative z-20 bg-black/25">
        <Theme />

        <Cat />
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

      {/* FULLSCREEN MODALS */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex items-center justify-center 
              bg-black/60 backdrop-blur-2xl"
            onClick={handleClose}>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="fixed top-5 right-6 text-white/80 hover:text-white 
                transition-all duration-300 text-2xl font-light z-[70]
                backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-3 py-1
                hover:bg-white/10 hover:border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.15)]">
              ✕
            </button>

            {/* Modal Content (Fullscreen Glass Panel) */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full overflow-y-auto no-scrollbar 
                bg-gradient-to-br from-white/10 via-white/5 to-transparent 
                backdrop-blur-[25px] border border-white/10 
                shadow-[0_0_30px_rgba(255,255,255,0.08)] 
                p-6 sm:p-8 md:p-12 text-white
                transition-all duration-700">
              <div className="max-w-5xl mx-auto">
                {openModal === "register" && <Register />}
                {openModal === "participate" && <Participate />}
                {openModal === "timeline" && <Timeline />}
                {openModal === "contact" && <Contact />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Hero;
