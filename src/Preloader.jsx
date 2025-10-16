import React, { useEffect, useState } from "react";

export default function Preloader({
  src,
  size = 120,
  duration = 1200,
  zoomScale = 2,
  background = "#ffffff",
  onComplete,
  children,
}) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (document.readyState === "complete") {
      setPageLoaded(true);
      return;
    }

    const onLoad = () => setPageLoaded(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!pageLoaded || !imageLoaded) return;

    const t = setTimeout(() => {
      setVisible(false);
      if (typeof onComplete === "function") onComplete();
    }, duration);

    return () => clearTimeout(t);
  }, [pageLoaded, imageLoaded, duration, onComplete]);

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    display: visible ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    background,
    zIndex: 9999,
    transition: `opacity ${duration}ms ease`,
  };

  const imgBase = {
    width: size,
    height: "auto",
    willChange: "transform, opacity",
    transition: `transform ${duration}ms cubic-bezier(.2,.9,.3,1), opacity ${duration}ms ease`,
    transformOrigin: "center",
  };

  const imgStyle = {
    ...imgBase,
    transform: pageLoaded && imageLoaded ? `scale(${zoomScale})` : "scale(1)",
    opacity: pageLoaded && imageLoaded ? 0 : 1,
  };

  return (
    <>
      {/* Preloader overlay */}
      <div aria-hidden={!visible} style={overlayStyle}>
        <img
          src={src}
          alt="Loading..."
          style={imgStyle}
          onLoad={() => setImageLoaded(true)}
          draggable={false}
        />
      </div>

      <div style={{ visibility: visible ? "hidden" : "visible" }}>
        {children}
      </div>
    </>
  );
}
