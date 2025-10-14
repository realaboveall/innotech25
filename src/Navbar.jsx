import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "/kietlogo.jpg"; // Replace with your logo path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        {/* LEFT: Hamburger (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-all duration-300">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* CENTER: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link to="/">
            <motion.img
              src={logo}
              alt="Innotech Logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="h-10 w-auto drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]"
            />
          </Link>
        </div>

        {/* RIGHT: Buttons (Hidden on mobile) */}
        <div
          className="hidden md:flex items-end
        
        
        gap-4">
          <button
            className="relative px-5 py-2 rounded-full border border-white/20 text-sm text-white/90 
              backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500
              hover:scale-[1.05] hover:border-white/40 overflow-hidden group">
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
            />
            <span className="relative z-10">Join a Team</span>
          </button>

          <button
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
        </div>
      </div>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex justify-center space-x-10 text-sm md:text-base mt-1 mb-2">
        {["Home", "Tracks", "Timeline", "Gallery", "Contact"].map((item) => (
          <NavLink
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `transition-all duration-300 tracking-wide ${
                isActive
                  ? "text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                  : "text-gray-300 hover:text-white"
              }`
            }>
            {item}
          </NavLink>
        ))}
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg border-t border-white/10 
              shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col items-center py-6 space-y-4">
              {["Home", "Tracks", "Timeline", "Gallery", "Contact"].map(
                (item) => (
                  <NavLink
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white text-lg transition-all duration-300">
                    {item}
                  </NavLink>
                )
              )}

              <div className="flex flex-col gap-3 pt-4">
                <button
                  className="relative px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm 
                    backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500
                    hover:scale-[1.05] hover:border-white/40 overflow-hidden group">
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]"
                  />
                  <span className="relative z-10">Join a Team</span>
                </button>

                <button
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
