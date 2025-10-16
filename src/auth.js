import Cookies from "js-cookie";

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
