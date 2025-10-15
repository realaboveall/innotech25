import React, { createContext, useContext, useEffect, useState } from "react";
import { getTokenFromCookie, clearAuthCookie, logoutFromServer } from "../../auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = getTokenFromCookie();
      if (!token) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data?.success && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const signOut = async () => {
    await logoutFromServer();
    setCurrentUser(null);
    clearAuthCookie();
  };

  const value = { currentUser, loading, signOut };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
