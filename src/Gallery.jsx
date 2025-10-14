import React from "react";
import CircularGallery from "./CircularGallery";

function Gallery() {
  return (
    <div
      style={{ height: "600px", position: "relative" }}
      className="bg-black/80">
      <h1 className="text-4xl md:text-5xl mb-4 text-center bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text font-Fira font-extrabold pt-8">
        ✨ Innotech Highlights
      </h1>

      <CircularGallery
        bend={1}
        textColor="rgba(0,0,0,0)"
        borderRadius={0.05}
        scrollEase={0.02}
      />
    </div>
  );
}

export default Gallery;
