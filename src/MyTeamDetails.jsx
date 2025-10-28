import React, { useState, useEffect } from 'react';
import { Users, Clipboard, Info, CheckCircle, Send, Search, X, UserPlus, Loader2 } from 'lucide-react';
import { getTokenFromCookie } from './auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    // The leader is already displayed, so we only list other members.
    const members = [team.member1, team.member2, team.member3, team.member4].filter(Boolean);
    const hasRequests = team.requests && team.requests.length > 0;

    const isLeader = userProfile.id === team.leaderUser.id;
    const canAddMembers = isLeader && team.teamSize < 5;

    const [memberSearchQuery, setMemberSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [addLoading, setAddLoading] = useState(false);

    // Show searchError as toast
    useEffect(() => {
        if (searchError) {
            toast.error(String(searchError), { position: 'top-right', autoClose: 5000, pauseOnHover: true });
            setSearchError('');
        }
    }, [searchError]);

    // Logic adapted from TeamManagement.jsx to search for users
    const handleSearchMember = async () => {
        if (!memberSearchQuery.trim()) return;
        setSearchLoading(true);
        setSearchError('');
        setSearchResult(null);
        try {
            const token = getTokenFromCookie() || localStorage.getItem('authToken');
            const category = team.participationCategory; // Use team's category
            
            const res = await fetch(`https://api.innotech.yaytech.in/api/search/users?query=${memberSearchQuery}&participationCategory=${category}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('Failed to search for user.');
            const data = await res.json();

            if (data.success && data.data.length > 0) {
                const foundUser = data.data[0];
                const allMembers = [team.leaderUser, ...members]; // Check against leader + members

                if (foundUser.id === userProfile.id) {
                     setSearchError("You cannot add yourself to the team again.");
                } else if (allMembers.some(m => m.id === foundUser.id)) {
                    setSearchError("This user is already in your team.");
                } else {
                    setSearchResult(foundUser);
                }
            } else {
                setSearchError('User not found or not in the same category.');
            }
        } catch (err) {
            setSearchError(err.message);
        } finally {
            setSearchLoading(false);
        }
    };

    // New handler to call the add-member API
    const handleAddMember = async (member) => {
        if (!member) return;
        setAddLoading(true);
        setSearchError('');
        try {
            const token = getTokenFromCookie() || localStorage.getItem('authToken');
            const res = await fetch(`https://api.innotech.yaytech.in/api/team/add-member`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ memberId: member.id })
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Failed to add member.');
            }
            
            toast.success(`${member.name} has been invited!`);
            setSearchResult(null);
            setMemberSearchQuery('');
            onTeamUpdate(); // Refresh the dashboard to show new member/request
            
        } catch (err) {
            setSearchError(err.message);
        } finally {
            setAddLoading(false);
        }
    };

    return (
        <div className="border-2 border-white/10 mt-8 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-300">{team.teamName}</h3>
                    <div className="flex items-center gap-2 mt-2 text-gray-300">
                        <Clipboard className="w-5 h-5 text-purple-400" />
                        <span className="font-mono text-lg">{team.teamCode}</span>
                    </div>
                </div>
                {team.isCompleted && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-full">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Team Complete</span>
                    </div>
                )}
            </div>

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