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
  User,
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import AnimatedBeams from "@/components/AnimatedBeams";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Consistency */}
      <AnimatedBeams />

      {/* Back Button */}
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
          {/* Border Beam Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="border-beam opacity-50" />
          </div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 border border-white/10 mb-6 shadow-lg shadow-blue-900/20"
            >
              <User className="w-6 h-6 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Create an account
            </h1>
            <p className="text-neutral-400 text-sm">
              Join thousands of developers building with TaskFlow
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Full Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-neutral-300 text-xs uppercase tracking-wider font-medium"
              >
                Full Name
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 h-11 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-neutral-300 text-xs uppercase tracking-wider font-medium"
              >
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 h-11 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-neutral-300 text-xs uppercase tracking-wider font-medium"
              >
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 h-11 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                />
              </div>
              {/* Dynamic Helper Text */}
              <div className="flex items-center gap-2 mt-1.5">
                <div
                  className={`h-1 flex-1 rounded-full transition-all ${
                    password.length >= 6 ? "bg-green-500/50" : "bg-neutral-800"
                  }`}
                />
                <p className="text-[10px] text-neutral-500 text-right">
                  {password.length >= 6 ? "Looks good" : "Min 6 chars"}
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-white text-black hover:bg-neutral-200 font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-sm text-neutral-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-white hover:text-blue-400 transition-colors underline decoration-neutral-700 underline-offset-4 hover:decoration-blue-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Signal / Footer Badge */}
        <div className="mt-8 flex justify-center gap-6 opacity-50">
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            Secure Sign Up
          </div>
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3" />
            Free for Developers
          </div>
        </div>
      </motion.div>
    </div>
  );
}
