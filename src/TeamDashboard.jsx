import React, { useState, useEffect, useCallback } from 'react';
import { getTokenFromCookie } from './auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeamManagement from './TeamManagement'; // The create-team form
import MyTeamDetails from './MyTeamDetails'; // The team details view
import { PendingRequests, SentRequests } from './TeamRequests'; // The request lists
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react'; 

const API_BASE_URL = 'https://api.innotech.yaytech.in';

const RegistrationClosedCard = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-2 border-white/10 mt-8 rounded-2xl p-6 text-center"
    >
        <h3 className="text-xl font-semibold text-cyan-300 mb-4">
            Team Creation is Closed
        </h3>
        <span><Lock className="inline-block w-20 h-20 mr-1" /></span>
        <p className="text-gray-400 mt-2">
            The period for creating new teams has ended. You can still manage
            your existing team invitations above.
        </p>
    </motion.div>
);

function TeamDashboard({ userProfile }) {
    const [teamData, setTeamData] = useState(null);
    const [hasTeam, setHasTeam] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [regStatusLoading, setRegStatusLoading] = useState(true);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    useEffect(() => {
        const checkRegistrationStatus = async () => {
            try {
                const token = getTokenFromCookie() || localStorage.getItem('authToken');
                const res = await fetch(`${API_BASE_URL}/api/registration/status`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                
                if (!res.ok) {
                    throw new Error("Failed to fetch registration status");
                }

                const data = await res.json();

                if (data.success && data.data.isRegistrationOpen) {
                    setIsRegistrationOpen(true);
                } else {
                    setIsRegistrationOpen(false);
                }
            } catch (err) {
                // On error, default to closed
                setIsRegistrationOpen(false); 
                console.error("Registration status check failed:", err);
            } finally {
                setRegStatusLoading(false);
            }
        };

        checkRegistrationStatus();
    }, []);

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
     // show error as toast instead of an inline error box
    useEffect(() => {
        if (error) {
            toast.error(String(error), { position: 'top-right', autoClose: 5000, pauseOnHover: true });
            setError(null);
        }
    }, [error]);
    
    if (loading || regStatusLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-white">
                <Loader2 className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-500" />
                <p className="mt-4 text-lg">Checking Team Status...</p>
            </div>
        );
    }
   

   if (hasTeam && teamData) {
        return <MyTeamDetails team={teamData} userProfile={userProfile} onTeamUpdate={checkTeamStatus} />;
    }
    
    return (
        //  && !userProfile.isKietian
        <div>
            <ToastContainer />
            <PendingRequests onAction={checkTeamStatus} />
            <SentRequests />
            {isRegistrationOpen ? (
                <TeamManagement userProfile={userProfile} />
            ) : (
                <RegistrationClosedCard />
            )}
        </div>
    );
}

export default TeamDashboard;