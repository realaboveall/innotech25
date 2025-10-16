import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { saveTokenToCookie, getTokenFromCookie } from "./auth";
import { useNavigate } from "react-router-dom";

// --- Helper Components ---

// A reusable glassmorphism container section
const GlassSection = ({ children, className = "" }) => (
  <div
    className={`bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 ${className}`}>
    {children}
  </div>
);

// Progress Bar Component
const ProgressBar = ({ currentStep }) => {
  const steps = ["Authenticate", "Category", "Basic Info"];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0 mt-20">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-700"></div>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}></div>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          return (
            <div key={label} className="z-10 flex flex-col items-center w-24">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                  transition-all duration-500
                  ${
                    isActive
                      ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      : "bg-gray-700 text-gray-400"
                  }`}>
                {stepNumber}
              </div>
              <p
                className={`text-xs sm:text-sm text-center mt-2 font-semibold transition-colors duration-500 ${
                  isActive ? "text-white" : "text-gray-400"
                }`}>
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Reusable form input component
const FormInput = ({ id, label, error, ...props }) => ( // ✨ ADDED: error prop
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className={`w-full bg-black/30 border rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 transition
        ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-white/20 focus:ring-purple-500 focus:border-purple-500"
        }
      `}
    />
    {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
  </div>
);

// Reusable toggle switch component
const FormToggle = ({ id, label, ...props }) => (
  <div className="flex items-center justify-between bg-black/30 border border-white/20 rounded-lg p-4">
    <span className="text-gray-300 font-medium">{label}</span>
    <label
      htmlFor={id}
      className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" id={id} {...props} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
    </label>
  </div>
);

// --- Step Components ---

// --- Step 1: Authentication ---
const AuthStep = ({ onSignIn }) => (
  <motion.div
    key="auth"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5 }}>
    <GlassSection className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-semibold mb-4 text-white">
        Join the Innovation
      </h1>
      <p className="text-gray-400 mb-8">
        Begin by securely signing in with your Google account.
      </p>
      <button
        onClick={onSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white/90 text-black font-semibold py-3 px-6 rounded-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-cyan-400/30">
        <svg className="w-6 h-6" viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
        Sign In with Google
      </button>
    </GlassSection>
  </motion.div>
);

// --- Step 2: Category Selection ---
const CategoryStep = ({ onSelect }) => {
  const cards = [
    {
      title: "School",
      icon: "🎓",
      desc: "For school students showcasing creative innovation projects.",
    },
    {
      title: "College",
      icon: "🏫",
      desc: "For college innovators ready to present research and prototypes.",
    },
    {
      title: "Researcher",
      icon: "🔬",
      desc: "For academic and institutional researchers driving discovery.",
    },
    {
      title: "Startup",
      icon: "🚀",
      desc: "For startup founders transforming ideas into impact.",
    },
  ];
  return (
    <motion.div
      key="category"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}>
      <GlassSection className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          Register As
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
          Choose your category to proceed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => onSelect(card)}
              className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)] transition-all duration-500">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-4xl mb-4 text-white/80 group-hover:text-white transition-all duration-300">
                  {card.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white tracking-wide group-hover:text-cyan-300 transition-colors duration-300">
                  {card.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassSection>
    </motion.div>
  );
};

// --- Step 3: Basic Info Form ---
const BasicInfoStep = ({
  formData,
  handleFormChange,
  onSubmit,
  onBack,
  selectedCategory,
  errors,
}) => {
  return (
    <motion.div
      key="basic-info"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}>
      <GlassSection className="max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2 text-center text-white">
          Basic Information
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          You're registering as{" "}
          <span className="text-cyan-300 font-semibold">
            {selectedCategory?.title}
          </span>
          . Let's get the final details.
        </p>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Basic Info */}
          <FormInput
            id="name"
            name="name"
            label="Full Name"
            type="text"
            required
            value={formData.name}
            onChange={handleFormChange}
            placeholder="e.g., John Doe"
            error={errors.name}
          />
          <FormInput
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            type="tel"
            required
            value={formData.phonenumber}
            onChange={handleFormChange}
            placeholder="+1 234 567 890"
            error={errors.phonenumber}
          />
          {(selectedCategory?.title?.toLowerCase() === "college" ||
            formData.participationCategory === "college") && (
            <FormToggle
              id="isKietian"
              name="isKietian"
              label="Are you a student of KIET Group of Institutions?"
              checked={formData.isKietian}
              onChange={handleFormChange}
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="w-full font-semibold text-lg text-cyan-300 border border-cyan-300 py-3 px-6 rounded-lg hover:bg-cyan-300/10 transition-colors duration-300">
              Back
            </button>
            <button
              type="submit"
              className="w-full font-semibold text-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              Complete Registration
            </button>
          </div>
        </form>
      </GlassSection>
    </motion.div>
  );
};

// --- Main Application Component ---
const App = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    isKietian: false,
    participationCategory: "",
  });
  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      window.location.href = "https://api.innotech.yaytech.in/auth/google";
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const navigate = useNavigate();

  // On mount, extract token from URL (query, hash or href) and save it, then proceed to Category step
  useEffect(() => {
    const tryExtractToken = () => {
      const extractTokenCandidate = () => {
        const urlParams = new URLSearchParams(window.location.search);
        let t = urlParams.get("token");
        if (t) return t;

        if (window.location.hash) {
          const hash = window.location.hash.replace(/^#/, "");
          const hashParams = new URLSearchParams(hash);
          t = hashParams.get("token");
          if (t) return t;
          const m = hash.match(/token=([^&]+)/);
          if (m) return m[1];
        }

        const hrefMatch = window.location.href.match(/[?&]token=([^&]+)/);
        if (hrefMatch) return hrefMatch[1];

        return null;
      };

      try {
        let token = extractTokenCandidate();
        if (!token) return;
        try {
          token = decodeURIComponent(token);
        } catch (e) {}
        // console.log("Register: captured token", token);
        try {
          saveTokenToCookie(token, { expires: 7 });
        } catch (e) {
          console.warn("save cookie failed", e);
        }
        try {
          localStorage.setItem("authToken", token);
        } catch (e) {}

        // remove token from URL without reloading
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete("token");
          if (url.hash) {
            const h = url.hash.replace(/^#/, "");
            const hp = new URLSearchParams(h);
            if (hp.has("token")) {
              hp.delete("token");
              url.hash = hp.toString() ? `#${hp.toString()}` : "";
            }
          }
          window.history.replaceState(
            {},
            document.title,
            url.pathname + url.search + (url.hash || "")
          );
        } catch (e) {
          console.warn("failed to clean URL", e);
        }

        // move to category selection (step 2)
        setStep(2);

        // fetch profile to prefill data and possibly advance to basic info
        (async () => {
          const token =
            getTokenFromCookie() || localStorage.getItem("authToken");
          if (!token) return;
          try {
            const res = await fetch(
              "https://api.innotech.yaytech.in/api/user/profile",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const contentType = res.headers.get("content-type") || "";
            if (!res.ok) {
              const text = await res.text();
              console.warn("Profile fetch failed", text);
              return;
            }
            if (!contentType.includes("application/json")) {
              const text = await res.text();
              console.warn(
                "Profile fetch unexpected content-type",
                contentType,
                text
              );
              return;
            }
            const data = await res.json();
            // console.log(data);
            if (data?.success && data.user) {
              const u = data.user;
              setFormData((prev) => ({
                ...prev,
                name: u.name || prev.name,
                phonenumber: u.phonenumber || prev.phonenumber,
                isKietian: !!u.isKietian,
                participationCategory:
                  u.participationCategory || prev.participationCategory,
              }));
              // If basic profile already complete, go straight to dashboard
              const basicComplete = u?.isProfileComplete?.basicProfile === true;
              if (basicComplete) {
                navigate("/dashboard");
                return;
              }
              if (u.participationCategory) {
                // map participationCategory to selectedCategory object
                const map = {
                  school: { title: "School" },
                  college: { title: "College" },
                  researcher: { title: "researcher" },
                  startup: { title: "Startup" },
                };
                const sc = map[u.participationCategory.toLowerCase()];
                if (sc) setSelectedCategory(sc);
                // advance to basic info so user can edit
                setStep(3);
              }
            }
          } catch (err) {
            console.warn("Profile fetch error", err);
          }
        })();
      } catch (err) {
        console.warn("token extraction failed", err);
      }
    };

    // If token already in cookie, check profile completion and possibly redirect to dashboard
    const tokenInCookie = getTokenFromCookie();
    if (tokenInCookie) {
      (async () => {
        try {
          const res = await fetch(
            "https://api.innotech.yaytech.in/api/user/check/complete-profile",
            {
              headers: { Authorization: `Bearer ${tokenInCookie}` },
            }
          );
          const contentType = res.headers.get("content-type") || "";
          if (res.ok && contentType.includes("application/json")) {
            const data = await res.json();
            const basicComplete =
              data?.user?.isProfileComplete?.basicProfile === true;
            if (basicComplete) {
              navigate("/dashboard");
              return;
            }
          }
        } catch (err) {
          console.warn("Profile check failed", err);
        }
        setStep(2);
      })();
      return;
    }

    tryExtractToken();
  }, []);

  const handleCategorySelect = (card) => {
    setSelectedCategory(card);
    setFormData((prev) => ({
      ...prev,
      participationCategory: card.title.toLowerCase(),
    }));
    setStep(3);
  };

  const validateForm = () => {
    const newErrors = {};

    // Rule 1: Name must not be empty
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    }

    // Rule 2: Phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phonenumber) {
      newErrors.phonenumber = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phonenumber)) {
      newErrors.phonenumber = "Please enter a valid 10-digit Indian mobile number (starting with 6-9).";
    }

    return newErrors;
  };

  const handleFinalFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop the submission if there are errors
    }

    // Clear any previous errors if validation passes
    setErrors({});

    const token = getTokenFromCookie() || localStorage.getItem("authToken");
    if (!token) {
      // Not authenticated, redirect to OAuth
      handleGoogleSignIn();
      return;
    }

    const payload = {
      name: formData.name,
      phonenumber: formData.phonenumber,
      participationCategory: formData.participationCategory,
      isKietian: formData.isKietian,
    };

    try {
      const res = await fetch(
        "https://api.innotech.yaytech.in/api/user/complete-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(
          "Unexpected response type: " + contentType + "\n" + text
        );
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Update failed");

      // On success redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Profile update failed", err);
      alert(err.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen w-full text-white font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 flex flex-col justify-center items-center">
      <ProgressBar currentStep={step} />
      <main className="flex-grow flex items-center w-full">
        <div className="w-full">
          <AnimatePresence mode="wait">
            {step === 1 && <AuthStep onSignIn={handleGoogleSignIn} />}
            {step === 2 && <CategoryStep onSelect={handleCategorySelect} />}
            {step === 3 && (
              <BasicInfoStep
                formData={formData}
                handleFormChange={handleFormChange}
                onSubmit={handleFinalFormSubmit}
                onBack={() => setStep(2)}
                selectedCategory={selectedCategory}
                errors={errors}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
