import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "/kietlogo.jpg"; // left logo
import logo2 from "/InnotechLogoLarge.png"; // right logo (replace with your actual second logo path)
import { getTokenFromCookie } from './auth';

const FNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = getTokenFromCookie() || (() => { try { return localStorage.getItem('authToken'); } catch { return null; } })();
    setHasToken(!!token);
  }, []);

  return (
    <>
      {/* 🌌 Floating Glass Nav */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
          bg-black/40 backdrop-blur-xl border border-white/10 
          shadow-[0_0_25px_rgba(255,255,255,0.05)] 
          rounded-3xl px-6 py-3 w-[90%] max-w-7xl">
        <div className="flex items-center justify-between">
          {/* LEFT: Logos + Cross */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <motion.img
                src={logo}
                alt="Left Logo"
                whileHover={{ scale: 1.05 }}
                className="h-8 w-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
              />
            </Link>

            {/* Neon Cross */}
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
          <div className="hidden md:flex items-center justify-center gap-8">
            {["Home", "Tracks", "Gallery"].map((item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative text-sm tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-gradient-to-r after:from-cyan-400 after:to-pink-400"
                      : "text-gray-300 hover:text-white"
                  }`
                }>
                {item}
              </NavLink>
            ))}
          </div>

          {/* RIGHT: Team Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!hasToken ? (
              <Link to="register">
              <button
                className="relative px-5 py-2 rounded-full border border-white/20 text-sm text-white/90 
                  backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500
                  hover:scale-[1.05] hover:border-white/40 overflow-hidden group">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                />
                <span className="relative z-10">Register</span>
              </button>
              </Link>
            ):<Link to="dashboard">
              <button
                className="relative px-5 py-2 rounded-full border border-white/20 text-sm text-white/90 
                  backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500
                  hover:scale-[1.05] hover:border-white/40 overflow-hidden group">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                />
                <span className="relative z-10">Dashboard</span>
              </button>
              </Link> }

            {/* <button
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
            </button> */}
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
                {["Home", "Tracks", "Gallery"].map((item) => (
                  <NavLink
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white text-lg transition-all duration-300">
                    {item}
                  </NavLink>
                ))}

                <div className="flex flex-col gap-3 pt-4">
                  {!hasToken && (
                    <button
                      className="relative px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm 
                        backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500
                        hover:scale-[1.05] hover:border-white/40 overflow-hidden group">
                      <span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                      />
                      <span className="relative z-10">Register</span>
                    </button>
                  )}

                  {/* <button
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
                  </button> */}
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
