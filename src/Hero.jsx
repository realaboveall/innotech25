import "./App.css";
import { useState } from "react";
import Tracks from "./Tracks";
import Timeline from "./Timeline";
import Participate from "./Participate";
import Contact from "./Contact";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Hyperspeed from "./Hyperspeed";
import { motion } from "motion/react";
import Theme from "./Theme";
import Register from "./Register";

function Hero() {
  const [openModal, setOpenModal] = useState(null);

  const handleOpen = (type) => setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  return (
    <>
      {/* HERO SECTION */}
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
              fov: 90,
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
        <div className="absolute top-50 flex justify-center w-full z-20">
          <button
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
        {/* Centered Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {/* Road to Innotech Button */}

          {/* Hero Text */}
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
          {/* <img
            src="https://res.cloudinary.com/dbugu6aej/image/upload/v1758869683/InnotechLogo-removebg-preview_efpkzs.png"
            alt="Innotech Logo"
            className="w-[800px] transition-all duration-500 ease-in-out
              lg:w-[1200px] md:w-[600px] sm:w-[500px] max-sm:w-[350px]"
          /> */}

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {[
              {
                label: "Register",
                gradient: "from-cyan-400/40 via-emerald-400/30 to-lime-400/40",
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
      </section>

      {/* MAIN CONTENT */}
      <section className="relative z-20 bg-black/25">
        <Theme />
        <Tracks />
        <Gallery />
      </section>

      {/* MODALS */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm "
          onClick={handleClose}>
          <div
            className="relative p-6 rounded-2xl w-[90%] max-w-4xl max-h-[85vh] overflow-y-auto no-scrollbar
          bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_35px_rgba(147,51,234,0.15)]"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleClose}
              className="fixed top-4 right-4 text-gray-400 hover:text-white text-2xl">
              ✕
            </button>

            <div className="pr-3 pb-6">
              {openModal === "register" && <Register />}
              {openModal === "participate" && <Participate />}
              {openModal === "timeline" && <Timeline />}
              {openModal === "contact" && <Contact />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
