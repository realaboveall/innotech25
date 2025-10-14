import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [category, setCategory] = useState("");
  const [isKietStudent, setIsKietStudent] = useState(null);
  const [collegeName, setCollegeName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [track, setTrack] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [solutionDescription, setSolutionDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (!data) navigate("/login");
    else setUserData(JSON.parse(data));
  }, [navigate]);

  // Simulate backend fetch for KIET data
  const handleKietFetch = async () => {
    setLoading(true);
    try {
      // Replace this fetch with your backend API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("KIET data fetched successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://your-backend-url.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...userData,
            category,
            isKietStudent,
            collegeName,
            teamName,
            track,
            problemStatement,
            solutionDescription,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit");
      alert("Form submitted successfully!");
      localStorage.removeItem("userData");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-16">
      {/* <div className="fixed inset-0 bg-black -z-10">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: "turbulentDistortion",
            length: 300,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,
            },
          }}
        />
      </div> */}
      <div
        className="w-full max-w-lg bg-black/50 border border-white/10 rounded-3xl 
        backdrop-blur-xl p-8 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
        <h1
          className="text-3xl md:text-4xl font-semibold text-center mb-6 
          bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 
          bg-clip-text text-transparent">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Select Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setIsKietStudent(null);
                setCollegeName("");
              }}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-black focus:outline-none focus:border-cyan-400 transition-all duration-300">
              <option value="" className="">
                Choose category
              </option>
              <option value="School">School</option>
              <option value="College">College</option>
              <option value="Research">Research</option>
              <option value="Startup">Startup</option>
            </select>
          </div>

          {/* College-specific logic */}
          {category === "College" && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">Are you a KIET student?</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsKietStudent(true);
                    handleKietFetch();
                  }}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    isKietStudent
                      ? "bg-cyan-500/20 border-cyan-400 text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400"
                  }`}>
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setIsKietStudent(false)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    isKietStudent === false
                      ? "bg-cyan-500/20 border-cyan-400 text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400"
                  }`}>
                  No
                </button>
              </div>

              {isKietStudent === false && (
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    College Name
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="Enter your college name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                      text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  />
                </div>
              )}
            </div>
          )}

          {/* Common fields */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              School/College Name
            </label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="Enter your institution name"
              required={category !== "College"}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
            />
          </div>

          {/* Track Dropdown */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Select Track
            </label>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-white focus:outline-none focus:border-cyan-400 transition-all duration-300">
              <option value="">Choose track (1–7)</option>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>
                  Track {num}
                </option>
              ))}
            </select>
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Problem Statement
            </label>
            <input
              type="text"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Write your problem statement"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
            />
          </div>

          {/* Solution Description */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Short Description of Solution
            </label>
            <textarea
              value={solutionDescription}
              onChange={(e) => setSolutionDescription(e.target.value)}
              placeholder="Describe your proposed solution briefly"
              required
              rows="4"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl border border-white/10 bg-white/10 
              hover:bg-white/20 transition-all duration-300 font-medium text-white">
            {loading ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
