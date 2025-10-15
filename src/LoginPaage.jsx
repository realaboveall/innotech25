import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (!name || !phone) {
      alert("Please enter your name and phone number first.");
      return;
    }
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store basic info in localStorage (or state management)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name,
          phone,
          email: user.email,
          uid: user.uid,
        })
      );

      navigate("/form"); // redirect to form page
    } catch (error) {
      console.error("Google Login Failed:", error);
      alert("Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-black/50 border border-white/10 rounded-3xl 
          backdrop-blur-xl p-8 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
        {/* Glow border */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

        <h1
          className="text-3xl md:text-4xl font-semibold text-center mb-6 pb-2 
          bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 
          bg-clip-text text-transparent">
          Login to Innotech
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
            />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl border border-white/10 bg-white/10 
              hover:bg-white/20 transition-all duration-300 font-medium text-white
              flex items-center justify-center gap-3">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Signing in..." : "Login with Google"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginPage;
