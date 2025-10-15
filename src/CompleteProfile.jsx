import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { getTokenFromCookie } from './auth';
import { PendingRequests } from './TeamRequests';

// --- Helper Components (Reused for consistent styling) ---

const GlassSection = ({ children, className = "" }) => (
    <div className={`bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 ${className}`}>
        {children}
    </div>
);

const FormInput = ({ id, label, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <input id={id} {...props} className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" />
    </div>
);

const FormSelect = ({ id, label, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <select id={id} {...props} className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition appearance-none bg-no-repeat bg-right-4" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundSize: '1.5em 1.5em' }}>
            {children}
        </select>
    </div>
);

const FormTextarea = ({ id, label, ...props }) => (
    <div className="sm:col-span-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <textarea id={id} {...props} rows="3" className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"></textarea>
    </div>
);

const FormToggle = ({ id, label, ...props }) => (
    <div className="flex items-center justify-between bg-black/30 border border-white/20 rounded-lg p-4 sm:col-span-2">
        <span className="text-gray-300 font-medium">{label}</span>
        <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id={id} {...props} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
        </label>
    </div>
);

// --- Category-Specific Forms ---
    const departmentOptions = [
  "CSE", "IT", "CSIT", "CS", "CSE_AI", "CSE_AIML", "ECE", "ELCE", "EEE", "ME", 
  "CSE_Cyber_Security", "CSE_Data_Science", "ECE_VLSI", "AMIA", "Other"
];

    const CollegeForm = ({ formData, handleFormChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput id="college" name="college" label="College Name" type="text" required value={formData.college} onChange={handleFormChange} placeholder="KIET Group of Institutions" />
        <FormInput id="rollno" name="rollno" label="Roll Number/ Adhar ID" type="text" required value={formData.rollno} onChange={handleFormChange} placeholder="123456789012" />
        <FormInput id="course" name="course" label="Course" type="text" required value={formData.course} onChange={handleFormChange} placeholder="B.Tech" />
        <FormSelect id="year" name="year" label="Year of Study" required value={formData.year} onChange={handleFormChange}>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
        </FormSelect>
        <FormSelect id="branch" name="branch" label="Branch" required value={formData.branch} onChange={handleFormChange}>
            <option value="">Select Branch</option>
            {departmentOptions.map(option => (
                <option key={option} value={option}>{option.replace(/_/g, ' ')}</option>
            ))}
        </FormSelect>
    </div>
);


const SchoolForm = ({ formData, handleFormChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput id="school" name="school" label="School Name" type="text" required value={formData.school} onChange={handleFormChange} placeholder="ABC Public School" />
        <FormInput id="standard" name="standard" label="Class / Standard" type="number" required value={formData.standard} onChange={handleFormChange} placeholder="12" />
        <FormInput id="board" name="board" label="Board" type="text" required value={formData.board} onChange={handleFormChange} placeholder="CBSE" />
        <FormInput id="uid_school" name="uid" label="Student Adhar ID" type="text" required value={formData.uid} onChange={handleFormChange} placeholder="Student Adhar ID" />
    </div>
);

const StartupForm = ({ formData, handleFormChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput id="startupName" name="startupName" label="Startup Name" type="text" required value={formData.startupName} onChange={handleFormChange} placeholder="My Awesome Startup" />
        <FormInput id="website" name="website" label="Website" type="url" required value={formData.website} onChange={handleFormChange} placeholder="https://example.com" />
        <FormInput id="startupSector" name="startupSector" label="Startup Sector" type="text" required value={formData.startupSector} onChange={handleFormChange} placeholder="FinTech, EdTech, etc." />
        <FormSelect id="stage" name="stage" label="Current Stage" required value={formData.stage} onChange={handleFormChange}>
            <option value="ideation">Ideation</option><option value="prototype">Prototype</option><option value="early">Early Stage</option><option value="scaling">Scaling</option>
        </FormSelect>
        <FormInput id="city" name="city" label="City" type="text" required value={formData.city} onChange={handleFormChange} placeholder="New Delhi" />
        <FormInput id="teamSize" name="teamSize" label="Team Size" type="number" required value={formData.teamSize} onChange={handleFormChange} placeholder="5" />
        
        {/* Founder Details */}
        <FormInput id="founderName" name="founderName" label="Founder's Name" type="text" required value={formData.founderName} onChange={handleFormChange} placeholder="Jane Doe" />
        <FormInput id="founderEmail" name="founderEmail" label="Founder's Email" type="email" required value={formData.founderEmail} onChange={handleFormChange} placeholder="founder@example.com" />
        <FormInput id="founderUid" name="founderUid" label="Founder's Adhar ID" type="text" required value={formData.founderUid} onChange={handleFormChange} placeholder="Adhar ID" />
        <FormInput id="founderPhonenumber" name="founderPhonenumber" label="Founder's Phone" type="tel" required value={formData.founderPhonenumber} onChange={handleFormChange} placeholder="+911234567890" />
        
        {/* Startup Description */}
        <FormTextarea id="description" name="description" label="Brief Description" required value={formData.description} onChange={handleFormChange} placeholder="What does your startup do?" />
        <FormTextarea id="problemSolving" name="problemSolving" label="Problem You Are Solving" required value={formData.problemSolving} onChange={handleFormChange} placeholder="Describe the problem." />
        <FormTextarea id="uvp" name="uvp" label="Unique Value Proposition (UVP)" required value={formData.uvp} onChange={handleFormChange} placeholder="What makes you unique?" />
        
        <div className="sm:col-span-2">
            <FormInput id="pitchDeckLink" name="pitchDeckLink" label="Pitch Deck Link" type="url" required value={formData.pitchDeckLink} onChange={handleFormChange} placeholder="https://link-to-your-deck.com" />
        </div>
        
        <FormToggle id="isFunded" name="isFunded" label="Have you received funding?" checked={formData.isFunded} onChange={handleFormChange} />
        
        {/* Conditionally rendered and optional fields */}
        {formData.isFunded && (
            <div className="sm:col-span-2">
                <FormInput id="fundedBy" name="fundedBy" label="Funded By (Optional)" type="text" value={formData.fundedBy} onChange={handleFormChange} placeholder="Investor Name or VC Firm" />
            </div>
        )}
        <FormTextarea id="eventExpections" name="eventExpections" label="Event Expectations (Optional)" value={formData.eventExpections} onChange={handleFormChange} placeholder="e.g., Networking, Mentorship, Funding" />
        <FormTextarea id="additionalInfo" name="additionalInfo" label="Additional Information (Optional)" value={formData.additionalInfo} onChange={handleFormChange} placeholder="Anything else you'd like to share" />
    </div>
);

const ResearchForm = ({ formData, handleFormChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput id="uid_researcher" name="uid" label="Adhar ID" type="text" required value={formData.uid} onChange={handleFormChange} placeholder="Adhar ID" />
        <FormInput id="universityName" name="universityName" label="University / Institution Name" type="text" required value={formData.universityName} onChange={handleFormChange} placeholder="Indian Institute of Technology, Delhi" />
        <div className="sm:col-span-2">
            <FormSelect id="pursuingDegree" name="pursuingDegree" label="Pursuing Degree" required value={formData.pursuingDegree} onChange={handleFormChange}>
                <option value="Masters">Masters</option><option value="PhD">PhD</option><option value="Other">Other</option>
            </FormSelect>
        </div>
    </div>
);


// --- Main Component ---
const CompleteProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Basic Info
        name: "", phonenumber: "", isKietian: false,
        // College
        college: "", rollno: "", course: "", year: "", branch: "",
        // School
        school: "", standard: "", board: "",
        // Startup
        startupName: "", website: "", startupSector: "", stage: "ideation", city: "",
        teamSize: "", description: "", problemSolving: "", uvp: "", pitchDeckLink: "", isFunded: false,
        founderName: "", founderEmail: "", founderUid: "", founderPhonenumber: "", fundedBy: "",
        eventExpections: "", additionalInfo: "",
        // Researcher
        universityName: "", pursuingDegree: "Masters",
        // Common UID
        uid: "",
    });

    // Hoist fetchUser so other components (e.g. PendingRequests) can trigger a refresh
    const fetchUser = async () => {
        setLoading(true);
        try {
            const token = getTokenFromCookie() || (() => {
                try { return localStorage.getItem('authToken'); } catch (e) { return null; }
            })();

            if (!token) {
                // No token found, ask user to authenticate
                navigate('/register');
                return;
            }

            const res = await fetch('https://api.innotech.yaytech.in/api/user/check/complete-profile', {
                headers: { 'Authorization': `Bearer ${token}` }
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

            // Support responses that either wrap the user in { success, user } or return the user directly
            const user = data?.user ?? (data && data.name ? data : null);
            if (!user) throw new Error(data?.message || 'Failed to retrieve user data');

            setCurrentUser(user);
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name,
                isKietian: typeof user.isKietian === 'boolean' ? user.isKietian : prev.isKietian,
                college: user.isKietian ? "KIET Group of institutions" : prev.college,
                rollno: user?.categoryProfile?.rollno ?? user?.rollno ?? prev.rollno,
            }));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUser(); }, [navigate]);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError('No current user found. Please login again.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const token = getTokenFromCookie() || (() => { try { return localStorage.getItem('authToken'); } catch (e) { return null; } })();
            if (!token) throw new Error('Authentication token not found. Please login again.');

            // Determine participation category (must be present either in formData or currentUser)
            const category = (formData.participationCategory || currentUser.participationCategory || '').toLowerCase();
            // map possible values
            const categoryMap = {
                'research': 'researcher',
                'researcher': 'researcher',
                'college': 'college-student',
                'school': 'school-student',
                'startup': 'startup'
            };

            const mapped = categoryMap[category];
            if (mapped) {
                let categoryUrl = `https://api.innotech.yaytech.in/api/user/complete-profile/${mapped}`;
                let body = null;

                switch (mapped) {
                    case 'college-student':
                        body = {
                            college: formData.college,
                            uid: formData.rollno,
                            course: formData.course,
                            year: Number(formData.year) || undefined,
                            branch: formData.branch
                        };
                        break;
                    case 'school-student':
                        body = {
                            school: formData.school,
                            standard: Number(formData.standard) || undefined,
                            board: formData.board,
                            uid: formData.uid
                        };
                        break;
                    case 'researcher':
                        body = {
                            uid: formData.uid,
                            universityName: formData.universityName,
                            pursuingDegree: formData.pursuingDegree
                        };
                        break;
                    case 'startup':
                        body = {
                            startupName: formData.startupName,
                    website: formData.website,
                    startupSector: formData.startupSector,
                    stage: formData.stage,
                    city: formData.city,
                    teamSize: Number(formData.teamSize) || undefined,
                    founderName: formData.founderName,
                    founderEmail: formData.founderEmail,
                    founderUid: formData.founderUid,
                    founderPhonenumber: formData.founderPhonenumber,
                    description: formData.description,
                    problemSolving: formData.problemSolving,
                    uvp: formData.uvp,
                    pitchDeckLink: formData.pitchDeckLink,
                    isFunded: !!formData.isFunded,
                    fundedBy: formData.fundedBy,
                    eventExpections: formData.eventExpections,
                    additionalInfo: formData.additionalInfo
                        };
                        break;
                    default:
                        body = null;
                }

                // Only call category endpoint if we have some body data
                if (body) {
                    // remove undefined values
                    Object.keys(body).forEach(k => body[k] === undefined && delete body[k]);

                    const catRes = await fetch(categoryUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });

                    const catContentType = catRes.headers.get('content-type') || '';
                    if (!catRes.ok) {
                        const text = await catRes.text();
                        throw new Error(text || `Failed to complete ${mapped} profile: ${catRes.status}`);
                    }

                    if (!catContentType.includes('application/json')) {
                        const text = await catRes.text();
                        throw new Error('Unexpected response for category profile: ' + catContentType + '\n' + text);
                    }

                    const catData = await catRes.json();
                    if (!catData.success) throw new Error(catData.message || 'Failed to complete category profile');
                }
            }

            // Success - redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    const renderFormByCategory = () => {
        if (!currentUser) return null;
        
        switch (currentUser.participationCategory) {
            case 'college':
                return <CollegeForm formData={formData} handleFormChange={handleFormChange} />;
            case 'school':
                return <SchoolForm formData={formData} handleFormChange={handleFormChange} />;
            case 'startup':
                // For startup users, show incoming pending team-join requests (if any) above the form.
                return (
                    <div>
                        <PendingRequests onAction={() => fetchUser()} />
                        <div className="mt-6">
                            <StartupForm formData={formData} handleFormChange={handleFormChange} />
                        </div>
                    </div>
                );
            case 'researcher':
                return <ResearchForm formData={formData} handleFormChange={handleFormChange} />;
            default:
                return <p className="text-center text-red-400">Invalid participation category found for your profile.</p>;
        }
    };
    
    if (loading) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
                <p className="mt-4 text-lg">Loading Profile...</p>
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
        <div className="min-h-screen w-full text-white font-sans  bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 flex flex-col justify-center items-center">
            <motion.div key="profile-form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="w-full">
                <GlassSection className="max-w-4xl mx-auto mt-16">
                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-semibold text-white">Complete Your Profile</h1>
                        <p className="text-gray-400 mt-2">Welcome, <span className="font-bold text-cyan-300">{currentUser.name}</span>! Please fill out the details for the <span className="font-bold text-cyan-300 capitalize">{currentUser.participationCategory}</span> category.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6">
                           {renderFormByCategory()}
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="w-full font-semibold text-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </GlassSection> 
            </motion.div>
        </div>
    );
};

export default CompleteProfile;

