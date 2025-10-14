import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-[#0C0C0C] text-white mt-20">
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-600"></div>

      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            {/* Logo */}
            <div className="w-48 h-48 relative">
              <img
                src="https://res.cloudinary.com/dccufw6lh/image/upload/v1759522129/WhatsApp_Image_2025-10-04_at_01.23.50_491e64e9_jq5z5v.jpg"
                alt="Innotech 25 Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            {/* Title and Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                INNOTECH 25
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Where innovation meets opportunity. Join us in shaping the
                future of technology through collaboration, competition, and
                creativity.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6">
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📍</span>
                <p className="text-gray-400">
                  KIET Group of Institutions, Meerut Road, Ghaziabad
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📧</span>
                <a
                  href="mailto:innotech@kiet.edu"
                  className="text-gray-400 hover:text-cyan-400 transition-colors">
                  innotech@kiet.edu
                </a>
              </div>
            </div>

            {/* Social Links Placeholder - can be added later */}
            <div className="pt-4">
              <div className="h-[2px] w-16 bg-gradient-to-r from-cyan-400 to-purple-600"></div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Innotech. Crafted With ❤️ By AboveAll
            and Anish.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
