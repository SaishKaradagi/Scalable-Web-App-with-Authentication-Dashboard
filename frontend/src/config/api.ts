// 1. If VITE_API_URL is set in Vercel, use it.
// 2. If running locally (npm run dev), use localhost:5000 (or 5001).
// 3. Fallback to Render URL if all else fails.

const ENV_API_URL = import.meta.env.VITE_API_URL;
const IS_DEV = import.meta.env.MODE === "development";

// IMPORTANT: Ensure this port matches your backend (5000 or 5001)
export const API_BASE_URL = IS_DEV
  ? "http://localhost:5000/api"
  : ENV_API_URL ||
    "https://scalable-web-app-with-authentication-1kum.onrender.com/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  PROFILE: "/profile",
  TASKS: "/tasks",
  HEALTH: "/health", // Added for the wakeup strategy
};
