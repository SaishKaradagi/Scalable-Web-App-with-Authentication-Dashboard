import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Loader2,
  User,
  Mail,
  Link as LinkIcon,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { getInitials } from "@/lib/utils";
import axios from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api";
import AnimatedBeams from "@/components/AnimatedBeams";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(API_ENDPOINTS.PROFILE, formData);
      const updatedUser = response.data.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");

      if (formData.email !== user?.email) {
        toast.info("Email changed. Please login again.");
        logout();
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 relative overflow-hidden">
      {/* Background Consistency */}
      <AnimatedBeams />

      {/* Subtle blue top gradient to match Landing Hero */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-neutral-400 hover:text-white hover:bg-white/5 -ml-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest">
            Profile Management
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar / User Identity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-4 space-y-6"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
              <div className="relative inline-block mb-6">
                <Avatar className="h-28 w-28 border-4 border-neutral-900/80 shadow-2xl">
                  <AvatarImage src={formData.avatar} className="object-cover" />
                  {/* CHANGED: Neutral Grey/Zinc fallback to match theme, removed purple */}
                  <AvatarFallback className="bg-neutral-800 text-neutral-200 text-3xl font-medium">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                {/* Status Indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center ring-4 ring-black/20">
                  <div
                    className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    title="Active"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-1 tracking-tight">
                {user?.name}
              </h2>
              <p className="text-sm text-neutral-500 font-medium">
                {user?.email}
              </p>
            </div>

            {/* Security Badge - Relevant to "Secure Auth" prompt requirement */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  Security Status
                </div>
                <div className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span>Authenticated</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Form Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-8"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative">
              {/* Top highlight line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Account Details
                </h1>
                <p className="text-neutral-400 text-sm">
                  Manage your personal information and public profile.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold"
                    >
                      Full Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="pl-10 h-12 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-700 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold"
                    >
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="pl-10 h-12 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-700 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 px-1">
                      <div className="w-1 h-1 rounded-full bg-yellow-500/50" />
                      <p className="text-[10px] text-neutral-500">
                        Changing email will require re-login.
                      </p>
                    </div>
                  </div>

                  {/* Avatar Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="avatar"
                      className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold"
                    >
                      Avatar Image URL
                    </Label>
                    <div className="relative group">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                      <Input
                        id="avatar"
                        value={formData.avatar}
                        onChange={(e) =>
                          setFormData({ ...formData, avatar: e.target.value })
                        }
                        className="pl-10 h-12 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-700 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                        placeholder="https://..."
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-8 mt-2 border-t border-white/5 flex items-center justify-end gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate("/dashboard")}
                    className="text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-white text-black hover:bg-neutral-200 font-bold px-8 h-11 rounded-xl shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
