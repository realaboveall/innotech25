import React, { useState, useEffect } from 'react';
import { getTokenFromCookie } from './auth';
import { Loader2, Check, X, Send, Trash2, Inbox } from 'lucide-react';

const API_BASE_URL = 'https://2q766kvz-8001.inc1.devtunnels.ms';

// --- Pending (Incoming) Requests Component ---
export function PendingRequests({ onAction }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        const token = getTokenFromCookie() || localStorage.getItem('authToken');
        const res = await fetch(`${API_BASE_URL}/api/team/requests/pending`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setRequests(data.data);
        setLoading(false);
    };

    useEffect(() => { fetchRequests(); }, []);

    const handleResponse = async (requestId, action) => {
        const token = getTokenFromCookie() || localStorage.getItem('authToken');
        await fetch(`${API_BASE_URL}/api/team/requests/${requestId}/respond`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ action }),
        });
        if (action === 'accept') onAction(); // Reload everything if team is joined
        else fetchRequests(); // Just refresh this list on reject
    };

    if (loading) return <div className="flex justify-center p-4"><Loader2 className="animate-spin text-white"/></div>;
    if (requests.length === 0) return null; // Don't show the component if there are no requests

    return (
        <div className="border-2 border-white/10 mt-8 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2"><Inbox/>Incoming Join Requests</h3>
            <div className="space-y-3">
                {requests.map(req => (
                    <div key={req.id} className="bg-black/30 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div>
                            <span className="font-semibold text-white">{req.team.leaderUser.name}</span>
                            <span className="text-gray-400"> invited you to join </span>
                            <span className="font-semibold text-purple-300">{req.team.teamName}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleResponse(req.id, 'accept')} className="p-2 bg-green-600 hover:bg-green-500 rounded-md"><Check className="w-5 h-5"/></button>
                            <button onClick={() => handleResponse(req.id, 'reject')} className="p-2 bg-red-600 hover:bg-red-500 rounded-md"><X className="w-5 h-5"/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


// --- Sent (Outgoing) Requests Component ---
export function SentRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        const token = getTokenFromCookie() || localStorage.getItem('authToken');
        const res = await fetch(`${API_BASE_URL}/api/team/requests/sent`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setRequests(data.data);
        setLoading(false);
    };

    useEffect(() => { fetchRequests(); }, []);

    const handleCancel = async (requestId) => {
        const token = getTokenFromCookie() || localStorage.getItem('authToken');
        await fetch(`${API_BASE_URL}/api/team/requests/${requestId}/cancel`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        fetchRequests(); // Refresh the list
    };
    
    if (loading) return <div className="flex justify-center p-4"><Loader2 className="animate-spin text-white"/></div>;
    if (requests.length === 0) return null;

    return (
        <div className="border-2 border-white/10 mt-8 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2"><Send/>Sent Join Requests</h3>
            <div className="space-y-3">
                {requests.map(req => (
                    <div key={req.id} className="bg-black/30 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div>
                            <span className="text-gray-400">Request sent to </span>
                             <span className="font-semibold text-white">{req.requestedTo.name}</span>
                             <span className="text-gray-400"> to join </span>
                             <span className="font-semibold text-purple-300">{req.team.teamName}</span>
                        </div>
                        <button onClick={() => handleCancel(req.id)} className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md"><Trash2 className="w-5 h-5"/></button>
                    </div>
                ))}
            </div>
        </div>
    );
}