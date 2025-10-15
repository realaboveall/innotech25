import React from "react";
import { motion } from "framer-motion";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="relative mt-24 backdrop-blur-2xl bg-white/5 border-t border-white/10
        text-white shadow-[0_0_25px_rgba(255,255,255,0.05)] overflow-hidden rounded-t-3xl">
      {/* Glowing Gradient Strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse" />

      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative container mx-auto px-8 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6">
            {/* Logo */}
            <div className="w-40 h-40 relative mx-auto md:mx-0">
              <img
                src="https://res.cloudinary.com/dccufw6lh/image/upload/v1759522129/WhatsApp_Image_2025-10-04_at_01.23.50_491e64e9_jq5z5v.jpg"
                alt="Innotech 25 Logo"
                className="w-full h-full object-contain rounded-2xl
                  border border-white/10 bg-white/5 backdrop-blur-md
                  shadow-[0_0_25px_rgba(255,255,255,0.05)]"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left space-y-2">
              <h2
                className="text-3xl font-semibold bg-gradient-to-r 
                from-cyan-300 via-purple-400 to-pink-400 bg-clip-text 
                text-transparent drop-shadow-[0_0_10px_rgba(147,51,234,0.4)] font-Fira">
                INNOTECH ’25
              </h2>

              <p className="text-gray-300/80 leading-relaxed font-pt max-w-md mx-auto md:mx-0">
                Where innovation meets opportunity. Join us in shaping the
                future of technology through collaboration, competition, and
                creativity.
              </p>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 text-center md:text-left">
            {/* Contact Info */}
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                <span className="text-2xl">📍</span>
                <p className="text-gray-300/80">
                  KIET Group of Institutions, Meerut Road, Ghaziabad
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                <span className="text-2xl">📧</span>
                <a
                  href="mailto:innotech@kiet.edu"
                  className="text-gray-300/80 hover:text-cyan-300 transition-all duration-300">
                  innotech@kiet.edu
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-start pt-3">
              <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            </div>
            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-5 pt-6">
              {[
                {
                  icon: <FaInstagram size={22} />,
                  link: "https://www.instagram.com/kiet_edu",
                  color: "hover:text-pink-400",
                },
                {
                  icon: <FaLinkedin size={22} />,
                  link: "https://www.linkedin.com/school/kiet-group-of-institutions/",
                  color: "hover:text-blue-400",
                },
                {
                  icon: <FaYoutube size={22} />,
                  link: "https://www.youtube.com/@KietEduGzb/videos",
                  color: "hover:text-red-400",
                },
                {
                  icon: <FaTwitter size={22} />,
                  link: "https://twitter.com/Kiet_edu",
                  color: "hover:text-cyan-400",
                },
              ].map(({ icon, link, color }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-400 transition-all duration-300 ${color}`}>
                  {icon}
                </motion.a>
              ))}
            </div>

            {/* Divider */}
          </motion.div>
        </div>

        {/* Bottom Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 pt-6 border-t border-white/10 text-center">
          <p
            className="text-gray-400 text-sm font-pt tracking-wide 
            hover:text-white transition-colors duration-300">
            © {new Date().getFullYear()} Innotech. Crafted with ❤️ by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-semibold">
              Team INNOTECH
            </span>
            .
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
