import Cookies from "js-cookie";

export async function checkAuthToken() {
  const token = Cookies.get("authToken");

  if (!token) {
    try {
      // Call redirect API or manually redirect
      const res = await fetch("/api/redirect", { method: "GET" });
      const data = await res.json();

      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl; // redirect to login or auth provider
      } else {
        console.warn("Redirect URL not found in API response");
      }
    } catch (err) {
      console.error("Redirect failed:", err);
    }
  } else {
    // console.log("✅ Token found:", token);
  }
}
