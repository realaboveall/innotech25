import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import { getTokenFromCookie, clearAuthCookie } from './auth';

// --- Helper Components (Reused for consistent styling) ---

const GlassSection = ({ children, className = "" }) => (
    <div className={`bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 ${className}`}>
        {children}
    </div>
);

const DetailItem = ({ label, value, fullWidth = false }) => (
    <div className={`py-3 px-4 bg-black/20 rounded-lg ${fullWidth ? 'sm:col-span-2' : ''}`}>
        <p className="text-sm font-medium text-gray-400 capitalize">{label}</p>
        <p className="text-lg text-white break-words">{String(value) || 'N/A'}</p>
    </div>
);

const CollegeDetails = ({ details }) => (
    <>
        <h3 className="text-xl font-semibold text-cyan-300 sm:col-span-2 mb-2">Academic Information</h3>
        <DetailItem label="College" value={details.college} />
        <DetailItem label="Course" value={details.course} />
        <DetailItem label="Year" value={details.year} />
        <DetailItem label="Branch" value={details.branch} />
    </>
);

const SchoolDetails = ({ details }) => (
    <>
        <h3 className="text-xl font-semibold text-cyan-300 sm:col-span-2 mb-2">School Information</h3>
        <DetailItem label="School" value={details.school} />
        <DetailItem label="Standard" value={details.standard} />
        <DetailItem label="Board" value={details.board} />
        <DetailItem label="School ID (UID)" value={details.uid} />
    </>
);

const StartupDetails = ({ details }) => (
    <>
        <h3 className="text-xl font-semibold text-cyan-300 sm:col-span-2 mb-2">Startup Information</h3>
        <DetailItem label="Startup Name" value={details.startupName} />
        <DetailItem label="Website" value={details.website} />
        <DetailItem label="Sector" value={details.startupSector} />
        <DetailItem label="Stage" value={details.stage} />
        <DetailItem label="City" value={details.city} />
        <DetailItem label="Team Size" value={details.teamSize} />
        <DetailItem label="Funding Status" value={details.isFunded ? 'Funded' : 'Not Funded'} />
        {details.isFunded && <DetailItem label="Funded By" value={details.fundedBy} />}
        <DetailItem label="Description" value={details.description} fullWidth />
        <DetailItem label="Problem Solving" value={details.problemSolving} fullWidth />
        <DetailItem label="Unique Value Proposition" value={details.uvp} fullWidth />
        <DetailItem label="Pitch Deck" value={details.pitchDeckLink} fullWidth />
        <h3 className="text-xl font-semibold text-cyan-300 sm:col-span-2 mt-4 mb-2">Founder Information</h3>
        <DetailItem label="Founder Name" value={details.founderName} />
        <DetailItem label="Founder Email" value={details.founderEmail} />
        <DetailItem label="Founder Phone" value={details.founderPhonenumber} />
        <DetailItem label="Founder ID (UID)" value={details.founderUid} />
    </>
);

const ResearcherDetails = ({ details }) => (
    <>
        <h3 className="text-xl font-semibold text-cyan-300 sm:col-span-2 mb-2">Research Information</h3>
        <DetailItem label="University/Institution" value={details.universityName} />
        <DetailItem label="Pursuing Degree" value={details.pursuingDegree} />
        <DetailItem label="Researcher ID (UID)" value={details.uid} />
    </>
);


// --- Main Component ---

function StudentDashboard() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkProfileStatus = async () => {
            setLoading(true);
            try {
                const token = getTokenFromCookie() || (() => {
                    try { return localStorage.getItem('authToken'); } catch (e) { return null; }
                })();
                if (!token) {
                    // No token found - redirect to register to authenticate
                    navigate('/register');
                    return;
                }

                const res = await fetch('https://api.innotech.yaytech.in/api/user/check/complete-profile', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                const contentType = res.headers.get('content-type') || '';
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `Request failed with status ${res.status}`);
                }

                if (!contentType.includes('application/json')) {
                    const text = await res.text();
                    throw new Error('Unexpected response content-type: ' + contentType + '\n' + text);
                }

                const data = await res.json();
                if (!data.success) throw new Error(data.message || 'Failed to fetch profile status');

                setUserProfile(data.user);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        checkProfileStatus();
    }, [navigate]);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const token = getTokenFromCookie() || (() => { try { return localStorage.getItem('authToken'); } catch (e) { return null; } })();
            // call backend logout (use full tunnel URL)
            await fetch('https://api.innotech.yaytech.in/auth/logout', {
                method: 'POST',
                headers: token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
        } catch (err) {
            console.warn('Logout failed', err);
        } finally {
            // clear client-side tokens
            try { clearAuthCookie(); } catch (e) { }
            try { localStorage.removeItem('authToken'); } catch (e) { }
            setLoading(false);
            navigate('/');
        }
    };

    const renderProfileDetails = () => {
        if (!userProfile?.profileDetails) return null;
        switch (userProfile.participationCategory) {
            case 'college': return <CollegeDetails details={userProfile.profileDetails} />;
            case 'school': return <SchoolDetails details={userProfile.profileDetails} />;
            case 'startup': return <StartupDetails details={userProfile.profileDetails} />;
            case 'researcher': return <ResearcherDetails details={userProfile.profileDetails} />;
            default: return null;
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
                <p className="mt-4 text-lg">Loading Dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full text-white">
                <GlassSection className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">An Error Occurred</h2>
                    <p>{error}</p>
                </GlassSection>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full  text-white font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 flex flex-col items-center">
            <div className="w-full max-w-7xl my-8 mt-20">
                {userProfile && !userProfile.isProfileComplete.categoryProfile ? (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                        <GlassSection className="max-w-2xl mx-auto">
                            <div className="text-center">
                                <h1 className="text-3xl font-semibold text-white mb-4">One Last Step!</h1>
                                <p className="text-gray-300 mb-8">
                                    Please complete your profile to get full access to all features.
                                </p>
                            </div>

                            {/* Step-by-step progress indicator */}
                            <div className="mt-8 space-y-2 text-left">
                                {/* Step 1: Completed */}
                                <div className="flex items-start">
                                    <div className="flex flex-col items-center mr-4">
                                        <div className="bg-green-500 rounded-full p-1">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="w-px h-8 bg-gray-600 my-1" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-lg">Register</h3>
                                        <p className="text-gray-400 text-sm">Completed</p>
                                    </div>
                                </div>

                                {/* Step 2: Completed */}
                                <div className="flex items-start">
                                    <div className="flex flex-col items-center mr-4">
                                        <div className="bg-green-500 rounded-full p-1">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="w-px h-8 bg-gray-600 my-1" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-lg">Basic Information</h3>
                                        <p className="text-gray-400 text-sm">Completed</p>
                                    </div>
                                </div>

                                {/* Step 3: Current Step */}
                                <div className="flex items-start">
                                    <div className="flex flex-col items-center mr-4 mt-1">
                                        <div className="flex items-center justify-center w-8 h-8 border-2 border-purple-500 rounded-full">
                                            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-lg">Complete Your Profile</h3>
                                        <p className="text-gray-400 text-sm mb-4">Provide the final details to get started.</p>
                                        <button
                                            onClick={() => navigate('/complete-profile')}
                                            className="w-full sm:w-auto font-semibold text-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                                        >
                                            Complete Your Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </GlassSection>
                    </motion.div>
                ) : userProfile ? (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                        <GlassSection>
                            <div className="flex flex-row items-center mb-8 justify-between">
                                <div className="flex items-center text-left sm:gap-0 gap-2">
                                    <img src={userProfile.profileImage} alt="Profile" className="sm:w-24 sm:h-24 w-16 h-16 rounded-full border-2 border-purple-400 shadow-lg sm:mb-0 sm:mr-6" />
                                    <div>
                                        <h1 className="text-2xl sm:text-4xl font-bold text-white sm:text-left">{userProfile.name}</h1>
                                        <p className="text-gray-400 sm:text-lg text-sm sm:text-left">Welcome to your dashboard.</p>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-4">
                                    <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white font-semibold">Logout</button>
                                </div>
                            </div>

                            {/* --- Basic Information Section --- */}
                            <div className="border-t border-white/10 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <h3 className="text-xl font-semibold text-cyan-300 sm:col-span-2 mb-2">Basic Information</h3>
                                <DetailItem label="Email" value={userProfile.email} />
                                <DetailItem label="Phone Number" value={userProfile.phonenumber} />
                                <DetailItem label="Participant Category" value={userProfile.participationCategory} />
                                <DetailItem label="KIETian" value={userProfile.isKietian ? 'Yes' : 'No'} />
                                {renderProfileDetails()}
                            </div>

                            

                        </GlassSection>
                        {/* ---  NEW Team Management Section --- */}
                            <div className="border-2 border-white/10 mt-8 pt-6 min-h-fit w-full rounded-xl text-white font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 ">
                                <h3 className="text-xl font-semibold text-cyan-300 mb-4">Team Management</h3>
                                <div className="p-4 rounded-lg bg-black bg-opacity-20">
                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                                        
                                        <div className="flex items-center">
                                            <span className="text-gray-400 italic">This feature will be available soon...</span>
                                        </div>
                                        <button
                                            disabled
                                            className="w-full sm:w-auto px-6 py-2 rounded-md bg-cyan-600 text-white font-semibold opacity-50 cursor-not-allowed"
                                            aria-label="Create Team (feature coming soon)"
                                        >
                                            Create Team
                                            <Lock className="w-4 h-4 ml-2 inline-block" />
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-3">
                                        Once enabled, you will be able to create your team and invite members here.
                                    </p>
                                </div>
                            </div>
                    </motion.div>
                ) : null}
            </div>
        </div>
    );
}

export default StudentDashboard;
