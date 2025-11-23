import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowLeft, Search, Terminal } from "lucide-react";
import AnimatedBeams from "@/components/AnimatedBeams";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Consistency */}
      <AnimatedBeams />

      {/* Optional: Grid overlay for "technical" feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        {/* The "Radar" Icon Animation */}
        <div className="relative flex justify-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-24 h-24 bg-neutral-900/50 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl"
          >
            {/* Inner pulsating circle */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl animate-pulse" />
            <Search className="w-10 h-10 text-neutral-400 relative z-10" />

            {/* Floating Question Marks */}
            <motion.div
              animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
              className="absolute -top-2 -right-2 text-blue-400 font-mono text-xl"
            >
              ?
            </motion.div>
          </motion.div>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter bg-gradient-to-b from-white via-white/50 to-transparent bg-clip-text text-transparent mb-6"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-medium text-white mb-4"
        >
          Signal Lost
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-neutral-400 mb-8 max-w-md mx-auto leading-relaxed"
        >
          The page you are looking for has been moved, deleted, or possibly
          never existed in this reality.
        </motion.p>

        {/* The "Developer" Detail: Fake Terminal Trace */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto bg-black/50 rounded-lg border border-white/10 p-4 mb-10 text-left overflow-hidden backdrop-blur-sm"
        >
          <div className="flex items-center gap-1.5 mb-3 border-b border-white/5 pb-2">
            <Terminal className="w-3 h-3 text-neutral-500" />
            <span className="text-xs text-neutral-500 font-mono">
              system_log.txt
            </span>
          </div>
          <div className="font-mono text-xs space-y-1">
            <p className="text-green-400/80">✓ System initialized</p>
            <p className="text-neutral-500">
              &gt; Attempting to access:{" "}
              <span className="text-blue-400">{location.pathname}</span>
            </p>
            <p className="text-red-400">
              &times; Error: Route not found in map
            </p>
            <p className="text-neutral-500 animate-pulse">_</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="bg-white text-black hover:bg-neutral-200 rounded-full px-8 font-bold shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all"
          >
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            size="lg"
            className="rounded-full px-8 border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
