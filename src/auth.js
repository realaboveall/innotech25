import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Cookie helpers for backend JWT token
// Cookie helpers for backend JWT token
export function saveTokenToCookie(token, opts = { expires: 7 }) {
  if (!token) return;
  Cookies.set("authToken", token, { ...opts });
}

export function getTokenFromCookie() {
  return Cookies.get("authToken");
}

export function clearAuthCookie() {
  Cookies.remove("authToken");
}


export function checkAuthStatus() {
  const token = getTokenFromCookie(); // Gets the token
  
  if (isTokenValid(token)) {
    return true; 
  } else {
    clearAuthStorage();
    return false;
  }
}

export function isLoggedIn() {
  return !!getTokenFromCookie();
}

export async function logoutFromServer() {
  const token = getTokenFromCookie();
  try {
    await fetch("https://api.innotech.yaytech.in/auth/logout", {
      method: "POST",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        : { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch (err) {
    console.warn("Logout request failed:", err);
  } finally {
    clearAuthCookie();
  }
}

export function isTokenValid(token) {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token); // <-- correct function
    if (!decoded.exp) return false;
    // exp is in seconds, Date.now() is in ms
    return decoded.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
}

export function clearAuthStorage() {
  Cookies.remove("authToken");
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('authToken');
    } catch (e) {
      console.warn('Failed to clear localStorage', e);
    }
  }
}
