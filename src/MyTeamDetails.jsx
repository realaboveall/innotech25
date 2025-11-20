import React, { useState, useEffect } from 'react';
import { Users, Clipboard, Info, CheckCircle, Send, Search, X, UserPlus, Loader2, Download } from 'lucide-react';
import { getTokenFromCookie } from './auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CertificateTemplateImage from "../src/assets/Certificate.png"

// NOTE: Since we are doing frontend-only generation, we don't strictly need API_BASE_URL for the certificate,
// but we keep it for other API calls (search/add member).
const API_BASE_URL = 'https://api.innotech.yaytech.in';
// --- PREREQUISITE: UPDATE THIS PATH TO YOUR HOSTED CERTIFICATE IMAGE ---
const CERTIFICATE_TEMPLATE_PATH = '/assets/Innotech_Participation_Certificate.jpg';


const DetailCard = ({ label, value }) => (
    <div className="bg-black/20 p-3 rounded-lg">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-white font-semibold">{value || 'N/A'}</p>
    </div>
);

const MemberCard = ({ member, leaderUserId }) => {
    if (!member) return null;
    return (
        <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
            <img src={member.profileImage} alt={member.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-white">{member.name}{leaderUserId === member.id && <span className="text-green-500"> (Leader)</span>}</p>

            </div>
        </div>
    );
};

// Helper component to show a colored badge for the request status
const RequestStatusBadge = ({ status }) => {
    const baseClasses = "px-2.5 py-1 text-xs font-semibold rounded-full capitalize";
    switch (status?.toLowerCase()) {
        case 'accepted':
            return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>Accepted</span>;
        case 'pending':
            return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-300`}>Pending</span>;
        case 'rejected':
            return <span className={`${baseClasses} bg-red-500/20 text-red-300`}>Rejected</span>;
        default:
            return <span className={`${baseClasses} bg-gray-500/20 text-gray-300`}>{status}</span>;
    }
};


function MyTeamDetails({ team, userProfile, onTeamUpdate }) {
    const members = [team.member1, team.member2, team.member3, team.member4].filter(Boolean);
    const hasRequests = team.requests && team.requests.length > 0;

    const isLeader = userProfile.id === team.leaderUser.id;
    const canAddMembers = isLeader && team.teamSize < 5;

    const [memberSearchQuery, setMemberSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [addLoading, setAddLoading] = useState(false);
    
    // --- NEW STATE FOR DOWNLOAD ---
    const [downloadLoading, setDownloadLoading] = useState(false); 
    // -----------------------------

    // Show searchError as toast
    useEffect(() => {
        if (searchError) {
            toast.error(String(searchError), { position: 'top-right', autoClose: 5000, pauseOnHover: true });
            setSearchError('');
        }
    }, [searchError]);

    // Logic adapted from TeamManagement.jsx to search for users (omitted for brevity, assume it's here)
    const handleSearchMember = async () => { /* ... existing logic ... */ };
    const handleAddMember = async (member) => { /* ... existing logic ... */ };

    // --- FRONTEND-ONLY CERTIFICATE GENERATION HANDLER ---
    const handleDownloadCertificate = () => {
        setDownloadLoading(true);
        toast.info('Generating certificate... this may take a moment.');

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.crossOrigin = 'anonymous'; // Important for CORS if image is remote
            img.src = CertificateTemplateImage;

            img.onload = () => {
                try {
                    // 1. Set Canvas size to match the image
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    // 2. Draw the background image
                    ctx.drawImage(img, 0, 0);

                    // 3. Setup text styles (Adjust these values based on the template!)
                    const name = userProfile.name;
                    
                    // Estimated text position (Based roughly on the template image layout)
                    // The line to be filled is below "This is to recognize and honor"
                    const Y_POSITION = img.height * 0.58; // Roughly 58% down from the top
                    const FONT_SIZE = img.height * 0.045; // Adjust font size relative to image height
                    
                    ctx.font = `700 ${FONT_SIZE}px 'Times New Roman', serif`; // Use a strong font
                    ctx.fillStyle = '#4B0082'; // A deep purple color based on the design
                    ctx.textAlign = 'center';

                    // 4. Draw the personalized name
                    const X_POSITION = canvas.width / 2;
                    ctx.fillText(name.toUpperCase(), X_POSITION, Y_POSITION);

                    // 5. Trigger download (PNG is generally better quality than Canvas-generated PDF)
                    const filename = `Innotech25_Certificate_${userProfile.name.replace(/\s/g, '_')}.png`;
                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = canvas.toDataURL('image/png');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    
                    toast.success('Certificate downloaded successfully!');

                } catch (e) {
                    toast.error('Error generating image on canvas.');
                    console.error("Canvas generation error:", e);
                } finally {
                    setDownloadLoading(false);
                }
            };
            
            img.onerror = () => {
                setDownloadLoading(false);
                toast.error('Failed to load the certificate template image. Check the path and CORS settings.');
            };

        } catch (err) {
            setDownloadLoading(false);
            toast.error(String(err.message || 'Error initializing certificate download.'));
        }
    };
    // -----------------------------------------------------------------

    return (
        <div className="border-2 border-white/10 mt-8 rounded-2xl p-6 space-y-6">
            <ToastContainer />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-300">{team.teamName}</h3>
                    <div className="flex items-center gap-2 mt-2 text-gray-300">
                        <Clipboard className="w-5 h-5 text-purple-400" />
                        <span className="font-mono text-lg">{team.teamCode}</span>
                    </div>
                </div>
                
                {/* --- DOWNLOAD BUTTON --- */}
                <button
                    onClick={handleDownloadCertificate}
                    disabled={downloadLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500 disabled:opacity-50 font-semibold transition"
                >
                    {downloadLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Download className="w-5 h-5" />}
                    {downloadLoading ? 'Generating...' : 'Download Certificate (PNG)'}
                </button>
                {/* --- END DOWNLOAD BUTTON --- */}
            </div>

            {/* --- Qualified Status --- */}
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full">
                         <span className="font-semibold">Thanks for your Participation!</span>
                    </div>
            </div>
            {/* --- End Status Check --- */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <DetailCard label="Leader" value={team.leaderUser.name} />
                <DetailCard label="Department" value={team.department} />
                <DetailCard label="Category" value={team.participationCategory} />
                <DetailCard label="Team Size" value={`${team.teamSize}`} />
            </div>

            {team.category && (
                <div className="bg-black/20 p-4 rounded-lg">
                    <p className="text-sm text-cyan-400 font-semibold">{team.category.name}</p>
                    {team.problemStatement && <p className="text-white mt-1">{team.problemStatement.title}</p>}
                </div>
            )}
            
            <div>
                <h4 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" /> Members
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MemberCard member={team.leaderUser} leaderUserId={team.leaderUser.id} /> {/* Also show the leader in the member list */}
                    {members.map(member => <MemberCard key={member.id} member={member} leaderUserId={team.leaderUser.id} />)}
                </div>
            </div>

            {/* --- START: Add Member UI Section --- */}
            {canAddMembers && (
                <div className="border-t border-white/10 pt-6 space-y-4">
                    <h4 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
                        <UserPlus className="w-5 h-5" /> Add New Member (Team: {team.teamSize}/5)
                    </h4>
                     <div>
                        <div className="flex items-center gap-2">
                            <input type="text" value={memberSearchQuery} onChange={(e) => setMemberSearchQuery(e.target.value)} placeholder="Enter member's User ID to search" className="flex-grow bg-black/30 border border-white/20 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-purple-500"/>
                            <button type="button" onClick={handleSearchMember} disabled={searchLoading} className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-500 disabled:opacity-50 disabled:cursor-wait">
                                {searchLoading ? <Loader2 className="animate-spin w-5 h-5"/> : <Search className="w-5 h-5"/>}
                            </button>
                        </div>
                    </div>

                    {searchResult && (
                        <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={searchResult.profileImage} alt={searchResult.name} className="w-10 h-10 rounded-full"/>
                                <div>
                                    <p className="font-semibold text-white">{searchResult.name}</p>
                                    <p className="text-sm text-gray-400">{searchResult.userId}</p>
                                </div>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => handleAddMember(searchResult)} 
                                disabled={addLoading} 
                                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-sm rounded-md hover:bg-green-500 disabled:opacity-50"
                            >
                                {addLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                                {addLoading ? 'Inviting...' : 'Invite'}
                            </button>
                        </div>
                    )}
                </div>
            )}

        
            {hasRequests && (
                <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                        <Send className="w-5 h-5" /> Team Invitations Status
                    </h4>
                    <div className="space-y-2">
                        {team.requests.map(request => (
                            <div key={request.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img src={request.requestedTo.profileImage} alt={request.requestedTo.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-white">{request.requestedTo.name}</p>
                                        <p className="text-sm text-gray-400">Invitation Sent</p>
                                    </div>
                                </div>
                                <RequestStatusBadge status={request.status} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyTeamDetails;