import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "sonner";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import ApiDocs from "@/pages/ApiDocs";

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Landing />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <Register />}
      />
      <Route path="/api-docs" element={<ApiDocs />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  // --- WAKE UP SERVICE ---
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        // We use a fire-and-forget approach. We don't need the response data.
        // This forces the Render container to spin up.
        await axios.get(API_ENDPOINTS.HEALTH);
        console.log("✅ System: Backend is awake and ready.");
      } catch (error) {
        // Even if it fails (e.g. network error), the attempt itself
        // is usually enough to trigger the wakeup on Render's side.
        console.log("⚠️ System: Waking up backend service...");
      }
    };

    wakeUpBackend();
  }, []);
  // -----------------------

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-right" richColors theme="dark" />
    </AuthProvider>
  );
}

export default App;
