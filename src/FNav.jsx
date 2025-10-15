import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "/kietlogo.jpg";
import logo2 from "/InnotechLogoLarge.png";

const FNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => setMenuOpen(false);

  const scrollSettings = {
    smooth: true,
    duration: 600,
    offset: -80, // adjust for navbar height
    spy: true,
    activeClass:
      "text-white font-semibold after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-gradient-to-r after:from-cyan-400 after:to-pink-400",
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
          bg-black/40 backdrop-blur-xl border border-white/10 
          shadow-[0_0_25px_rgba(255,255,255,0.05)] 
          rounded-3xl px-6 py-3 w-[90%] max-w-7xl">
        <div className="flex items-center justify-between">
          {/* LEFT: Logos */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <motion.img
                src={logo}
                alt="Left Logo"
                whileHover={{ scale: 1.05 }}
                className="h-8 w-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
              />
            </Link>

            <div className="animate-pulse">
              <div className="relative h-5 w-5 flex items-center justify-center">
                <div className="absolute w-5 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rotate-45"></div>
                <div className="absolute w-5 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 -rotate-45"></div>
              </div>
            </div>

            <Link to="/">
              <motion.img
                src={logo2}
                alt="Right Logo"
                whileHover={{ scale: 1.05 }}
                className="h-8 w-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
              />
            </Link>
          </div>

          {/* MIDDLE: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center justify-center gap-8 relative">
            {/* Home routes to "/" instead of scrolling */}
            <span
              onClick={() => {
                setMenuOpen(false);
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="relative text-sm tracking-wide text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
              Home
            </span>

            {["Tracks", "Gallery", "Sponsors", "Domains"].map((item) => (
              <ScrollLink
                key={item}
                to={item.toLowerCase()}
                {...scrollSettings}
                className="relative text-sm tracking-wide text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
                {item}
              </ScrollLink>
            ))}
          </div>

          {/* RIGHT: Team Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <button
                className="relative px-5 py-2 rounded-full border border-white/20 text-sm text-white/90 
                backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500
                hover:scale-[1.05] hover:border-white/40 overflow-hidden group">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                />
                <span className="relative z-10">Login</span>
              </button>
            </Link>

            <Link to="/register">
              <button
                className="relative px-5 py-2 rounded-full text-sm font-medium text-white 
                bg-gradient-to-r from-cyan-400/20 via-purple-400/10 to-pink-400/20
                border border-white/10 backdrop-blur-md transition-all duration-300 
                hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                overflow-hidden group">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                />
                <span className="relative z-10">Create a Team</span>
              </button>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-all duration-300">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-black/70 backdrop-blur-md rounded-2xl border border-white/10 p-4">
              <div className="flex flex-col items-center space-y-3">
                {/* Home routes to "/" */}
                <span
                  onClick={() => {
                    handleScroll();
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-white/80 hover:text-white text-lg transition-all duration-300 cursor-pointer">
                  Home
                </span>

                {["Tracks", "Gallery", "Domains", "Sponsors"].map((item) => (
                  <ScrollLink
                    key={item}
                    to={item.toLowerCase()}
                    {...scrollSettings}
                    onClick={handleScroll}
                    className="text-white/80 hover:text-white text-lg transition-all duration-300 cursor-pointer">
                    {item}
                  </ScrollLink>
                ))}

                {/* Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <Link to="/login">
                    <button
                      onClick={handleScroll}
                      className="relative px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm 
                      backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500
                      hover:scale-[1.05] hover:border-white/40 overflow-hidden group">
                      <span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                      />
                      <span className="relative z-10">Login</span>
                    </button>
                  </Link>

                  <Link to="/register">
                    <button
                      onClick={handleScroll}
                      className="relative px-5 py-2 rounded-full text-sm font-medium text-white 
                      bg-gradient-to-r from-cyan-400/30 via-purple-400/20 to-pink-400/30
                      border border-white/10 backdrop-blur-md transition-all duration-300 
                      hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                      overflow-hidden group">
                      <span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                      />
                      <span className="relative z-10">Create a Team</span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default FNav;
