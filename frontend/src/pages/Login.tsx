import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import AnimatedBeams from "@/components/AnimatedBeams";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back to TaskFlow");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center relative overflow-hidden p-4">
      {/* 1. Background Consistency: Reuse the Beams */}
      <AnimatedBeams />

      {/* Back Button for UX */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 text-neutral-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glassmorphic Card */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          {/* 2. The Border Beam Effect (Premium feel) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            {/* CSS Keyframes for 'border-beam' must be in index.css from previous step */}
            <div className="border-beam opacity-50" />
          </div>

          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-6 group"
            >
              <CheckCircle2 className="w-6 h-6 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-neutral-400 text-sm">
              Enter your credentials to access your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-neutral-300 text-xs uppercase tracking-wider font-medium"
                >
                  Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 h-12 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-neutral-300 text-xs uppercase tracking-wider font-medium"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 h-12 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-white text-black hover:bg-neutral-200 font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <Sparkles className="ml-2 h-4 w-4 opacity-50" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-sm text-neutral-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-white hover:text-blue-400 transition-colors underline decoration-neutral-700 underline-offset-4 hover:decoration-blue-400"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom "Secure" Badge */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-neutral-500 uppercase tracking-widest">
            <Lock className="w-3 h-3" />
            End-to-end Encrypted
          </div>
        </div>
      </motion.div>
    </div>
  );
}
