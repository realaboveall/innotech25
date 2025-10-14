import "./App.css";
import { useState } from "react";
import DotGrid from "./DotGrid";
import Problems from "./Problems";
import Tracks from "./Tracks";
import Timeline from "./Timeline";
import Participate from "./Participate";
import Contact from "./Contact";
import Footer from "./Footer";
import Gallery from "./Gallery";

function Apppp() {
  const [openModal, setOpenModal] = useState(null); // "participate" | "timeline" | "contact" | null

  const handleOpen = (type) => setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Background Layer */}
        <div className="fixed inset-0 bg-black -z-10">
          <DotGrid
            dotSize={10}
            gap={15}
            baseColor="#271e37"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Centered Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <img
            src="https://res.cloudinary.com/dbugu6aej/image/upload/v1758869683/InnotechLogo-removebg-preview_efpkzs.png"
            alt="Innotech Logo"
            className="w-[800px] transition-all duration-500 ease-in-out
              lg:w-[1200px] md:w-[600px] sm:w-[500px] max-sm:w-[350px]"
          />

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 transition-transform rounded-xl text-white font-semibold shadow-lg">
              Register
            </button>

            <button
              onClick={() => handleOpen("participate")}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-600 hover:scale-105 transition-transform rounded-xl text-white font-semibold shadow-lg">
              How to Participate
            </button>

            <button
              onClick={() => handleOpen("timeline")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:scale-105 transition-transform rounded-xl text-white font-semibold shadow-lg">
              Timeline
            </button>

            <button
              onClick={() => handleOpen("contact")}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-transform rounded-xl text-white font-semibold shadow-lg">
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT BELOW HERO */}
      <section className="relative z-20 bg-black">
        <Problems />
        <Tracks />
        <Gallery />
        <Footer />
      </section>

      {/* MODAL (Dialog Box) */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={handleClose}>
          <div
            className="relative bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-4xl max-h-[85vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="fixed top-4 right-4 text-gray-400 hover:text-white text-2xl">
              ✕
            </button>

            {/* Scrollable Content */}
            <div className="pr-3 pb-6">
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

export default Apppp;
