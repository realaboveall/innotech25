import React, { useState, useEffect, useCallback } from 'react';
import { getTokenFromCookie } from './auth';
import TeamManagement from './TeamManagement'; // The create-team form
import MyTeamDetails from './MyTeamDetails'; // The team details view
import { PendingRequests, SentRequests } from './TeamRequests'; // The request lists
import { Loader2 } from 'lucide-react';

const API_BASE_URL = 'https://2q766kvz-8001.inc1.devtunnels.ms';

function TeamDashboard({ userProfile }) {
    const [teamData, setTeamData] = useState(null);
    const [hasTeam, setHasTeam] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkTeamStatus = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getTokenFromCookie() || localStorage.getItem('authToken');
            const res = await fetch(`${API_BASE_URL}/api/team/my-team`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.status === 404) {
                setHasTeam(false);
                setTeamData(null);
            } else if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setTeamData(data.data);
                    setHasTeam(true);
                } else {
                     throw new Error(data.message || 'Failed to fetch team status.');
                }
            } else {
                 throw new Error('An error occurred while checking your team status.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkTeamStatus();
    }, [checkTeamStatus]);
    
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-white">
                <Loader2 className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-500" />
                <p className="mt-4 text-lg">Checking Team Status...</p>
            </div>
        );
    }
    
    if (error) {
        return <div className="text-red-400 text-center p-8 bg-red-500/10 rounded-lg">{error}</div>;
    }

    if (hasTeam && teamData) {
        return <MyTeamDetails team={teamData} />;
    }
    
    return (
        <div>
            <PendingRequests onAction={checkTeamStatus} />
            <SentRequests />
            <TeamManagement userProfile={userProfile} />
        </div>
    );
}

export default TeamDashboard;