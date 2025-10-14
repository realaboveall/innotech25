import React, { useEffect, useState } from "react";

/**
 * Preloader component that displays a centered PNG and zooms it in when the page finishes loading.
 *
 * Props:
 *  - src: string (required) — path/URL to the PNG.
 *  - size: number — base size in px (default 120).
 *  - duration: number — animation duration in ms (default 700).
 *  - zoomScale: number — final scale multiplier when zooming (default 2).
 *  - background: string — background color while loading (default '#ffffff').
 *  - onComplete: function — called after preloader finishes and is removed.
 *  - children: ReactNode — page content to render under the preloader.
 *
 * Usage:
 *  <Preloader src="/logo.png">
 *    <App />
 *  </Preloader>
 */

export default function Preloader({
  src,
  size = 120,
  duration = 1200,
  zoomScale = 2,
  background = "#ffffff",
  onComplete,
  children,
}) {
  const [pageLoaded, setPageLoaded] = useState(false); // became true when window.load fired
  const [visible, setVisible] = useState(true); // controls whether overlay still mounts
  const [imageLoaded, setImageLoaded] = useState(false); // ensures PNG is ready before animating

  // Listen for full page load
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

  // When both page and image are ready, start the hide animation
  useEffect(() => {
    if (!pageLoaded || !imageLoaded) return;

    // After animation duration, remove the overlay and call onComplete
    const t = setTimeout(() => {
      setVisible(false);
      if (typeof onComplete === "function") onComplete();
    }, duration);

    return () => clearTimeout(t);
  }, [pageLoaded, imageLoaded, duration, onComplete]);

  // inline styles (keeps component self-contained)
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    display: visible ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    background,
    zIndex: 9999,
    transition: `opacity ${duration}ms ease`,
    // we'll control opacity via style on the image; keep overlay visible until we hide it entirely
  };

  const imgBase = {
    width: size,
    height: "auto",
    willChange: "transform, opacity",
    transition: `transform ${duration}ms cubic-bezier(.2,.9,.3,1), opacity ${duration}ms ease`,
    transformOrigin: "center",
    // initial state: scale(1)
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
          // Prevent the image from being draggable
          draggable={false}
        />
      </div>

      {/* Underlying app content - keep rendered so the preloader can overlay it */}
      <div style={{ visibility: visible ? "hidden" : "visible" }}>
        {children}
      </div>
    </>
  );
}
