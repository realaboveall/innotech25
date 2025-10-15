import React from 'react';
import { Users, Clipboard, Info, CheckCircle } from 'lucide-react';

const DetailCard = ({ label, value }) => (
    <div className="bg-black/20 p-3 rounded-lg">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-white font-semibold">{value || 'N/A'}</p>
    </div>
);

const MemberCard = ({ member }) => {
    if (!member) return null;
    return (
        <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
            <img src={member.profileImage} alt={member.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-white">{member.name}</p>
                <p className="text-sm text-gray-400 font-mono">{member.userId}</p>
            </div>
        </div>
    );
};

function MyTeamDetails({ team }) {
    console.log(team)
    const members = [team.member1, team.member2, team.member3, team.member4].filter(Boolean);

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
                    {members.map(member => <MemberCard key={member.id} member={member} />)}
                </div>
            </div>
        </div>
    );
}

export default MyTeamDetails;