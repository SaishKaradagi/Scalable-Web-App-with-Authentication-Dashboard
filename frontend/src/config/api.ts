export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  PROFILE: "/profile",
  TASKS: "/tasks",
};
