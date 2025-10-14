import React from "react";
import { motion } from "framer-motion";

const Arrow = () => {
  return (
    <motion.div
      className="flex justify-center my-4"
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}>
      <div className="w-8 h-12 relative">
        <div className="absolute w-full h-full">
          <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-400 to-purple-600 mx-auto"></div>
          <div className="w-4 h-4 rotate-45 border-b-2 border-r-2 border-purple-600 mx-auto -mt-1"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Arrow;
