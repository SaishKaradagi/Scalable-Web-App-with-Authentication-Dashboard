import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedBeams from "../components/AnimatedBeams";
import Marquee from "../components/Marquee";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Filter } from "lucide-react";

// --- COMPONENTS ---

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-4"
    >
      <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          {/* Minimalist Wireframe Logo */}
          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CheckCircle2 className="w-4 h-4 text-neutral-200 relative z-10" />
          </div>
          <span className="font-bold bg-gradient-to-br from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent tracking-tight">
            TaskFlow
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a
            href="#testimonials"
            className="hover:text-white transition-colors"
          >
            Customers
          </a>
          <button
            onClick={() => navigate("/api-docs")}
            className="hover:text-white transition-colors"
          >
            API
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
          >
            Log in
          </button>
          <Button
            onClick={() => navigate("/register")}
            size="sm"
            className="rounded-full bg-white text-black hover:bg-neutral-200 font-semibold px-5"
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 1200], [25, 0]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.5]);
  const translateY = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-6 overflow-hidden perspective-[2000px]">
      {/* Text Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-8 hover:bg-white/10 transition-colors cursor-pointer group backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.6)]"></span>
          <span>v1.0 Release: Secure Note Management</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent mb-8"
        >
          Capture thoughts. <br />
          <span className="text-white/40">Organize chaos.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The scalable, secure dashboard for your notes and tasks. Built with
          encryption, tagging, and instant search.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => navigate("/register")}
            size="lg"
            className="h-12 px-8 rounded-full bg-white text-black hover:bg-neutral-200 font-bold text-base shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all"
          >
            Start for Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          {/* Updated API Docs Button */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate("/api-docs")}
            className="h-12 px-8 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            View API Docs
          </Button>
        </motion.div>
      </div>

      {/* 3D Dashboard Mockup */}
      <motion.div
        style={{ rotateX, opacity, y: translateY }}
        className="mt-20 max-w-6xl mx-auto relative z-20"
      >
        <div className="relative rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-2 shadow-2xl ring-1 ring-white/10 transform-gpu">
          <div className="rounded-lg bg-neutral-950 aspect-[16/10] overflow-hidden relative flex">
            {/* Sidebar Mockup */}
            <div className="hidden md:flex w-64 flex-col border-r border-white/5 bg-neutral-900/30 p-4 gap-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="h-8 w-full bg-white/5 rounded-lg animate-pulse" />
              <div className="space-y-2 mt-4">
                <div className="h-4 w-3/4 bg-white/5 rounded-md" />
                <div className="h-4 w-1/2 bg-white/5 rounded-md" />
                <div className="h-4 w-2/3 bg-white/5 rounded-md" />
              </div>
            </div>

            {/* Main Content Mockup */}
            <div className="flex-1 flex flex-col">
              <div className="h-16 border-b border-white/5 flex items-center px-6 justify-between">
                <div className="w-64 h-8 bg-white/5 rounded-lg flex items-center px-3 text-neutral-500 text-xs border border-white/5">
                  Search notes...
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
              </div>

              <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-neutral-900 rounded-xl border border-white/5 p-4 space-y-3">
                  <div className="h-4 w-1/2 bg-white/10 rounded mb-2" />
                  <div className="h-2 w-full bg-white/5 rounded" />
                  <div className="h-2 w-3/4 bg-white/5 rounded" />
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      #Project
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-xl border border-white/5 p-4 space-y-3 relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <Shield className="w-3 h-3 text-green-400" />
                  </div>
                  <div className="h-4 w-1/3 bg-white/10 rounded mb-2" />
                  <div className="h-2 w-full bg-white/5 rounded" />
                  <div className="h-2 w-2/3 bg-white/5 rounded" />
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 rounded text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      #Personal
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-xl border border-white/5 p-4 space-y-3 opacity-50">
                  <div className="h-4 w-1/2 bg-white/10 rounded mb-2" />
                  <div className="h-2 w-full bg-white/5 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Animated Border Beam */}
          <div className="border-beam" />
        </div>
      </motion.div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never been this productive. TaskFlow is a game changer.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "The UI is stunning. It makes me actually want to do my work.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "Simple, fast, and effective. Exactly what I needed.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "Collaborating with my team has never been easier.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I love the dark mode. It's so easy on the eyes.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "Features are robust but not overwhelming. Perfect balance.",
      img: "https://avatar.vercel.sh/james",
    },
  ];

  const ReviewCard = ({ img, name, username, body }: any) => {
    return (
      <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors mx-4">
        <div className="flex flex-row items-center gap-2">
          <img
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={img}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm text-neutral-300">
          {body}
        </blockquote>
      </figure>
    );
  };

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Loved by thousands
        </h2>
        <p className="text-neutral-400">
          Join the community of productive developers.
        </p>
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
        <Marquee pauseOnHover className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s] mt-4">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-neutral-950"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-neutral-950"></div>
      </div>
    </section>
  );
};

const BentoCard = ({ children, className, title, description, delay }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }}
      className={`group relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 p-6 hover:border-white/20 transition-colors ${className}`}
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 mb-6 flex items-center justify-center overflow-hidden rounded-xl bg-neutral-950/50 border border-white/5">
          {children}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              speed & scale.
            </span>
          </h2>
          <p className="text-xl text-neutral-400">
            Complete task management with privacy, search, and organization
            baked in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-auto md:h-[800px]">
          <BentoCard
            className="md:col-span-4 md:row-span-2"
            title="Distraction-Free Editor"
            description="A clean interface for your notes and tasks. Support for rich content with a minimalist design that keeps you focused on writing."
            delay={0.1}
          >
            <div className="w-full h-full p-8 flex flex-col gap-4 relative">
              <div className="absolute inset-x-8 top-8 bottom-0 bg-neutral-900 rounded-t-xl border-t border-x border-white/10 p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="space-y-4">
                  <div className="h-8 w-3/4 bg-white/10 rounded-lg animate-pulse" />
                  <div className="h-4 w-full bg-white/5 rounded-lg" />
                  <div className="h-4 w-full bg-white/5 rounded-lg" />
                  <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard
            className="md:col-span-2 md:row-span-1"
            title="Smart Tagging"
            description="Organize notes with custom tags. Filter your dashboard instantly by category."
            delay={0.2}
          >
            <div className="flex flex-wrap gap-2 items-center justify-center p-4">
              {["Dev", "Personal", "Urgent", "Ideas", "Bug"].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            className="md:col-span-2 md:row-span-1"
            title="Privacy Controls"
            description="Toggle notes as Private or Public. Your personal data is protected by default."
            delay={0.3}
          >
            <div className="flex items-center justify-center gap-4 h-full">
              <div className="bg-neutral-800 p-3 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="h-4 w-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-xs text-neutral-300 font-mono">
                  isPrivate: true
                </span>
              </div>
            </div>
          </BentoCard>

          <BentoCard
            className="md:col-span-3 md:row-span-1"
            title="Enterprise-Grade Auth"
            description="Built with JWT authentication and Bcrypt encryption. Your sessions are secure and persistent."
            delay={0.4}
          >
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-green-400/80 bg-black/40 p-4 rounded-lg border border-white/5">
              <Shield className="w-4 h-4" />
              <span>Authorization: Bearer eyJhbGci...</span>
            </div>
          </BentoCard>

          <BentoCard
            className="md:col-span-3 md:row-span-1"
            title="Instant Search"
            description="Find any note or task in milliseconds. Filter by content, title, or tags in real-time."
            delay={0.5}
          >
            <div className="w-full max-w-[200px] bg-neutral-800 rounded-lg border border-white/10 p-2 flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-400" />
              <div className="h-1.5 w-20 bg-white/20 rounded-full" />
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
          Ready to <br />
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            ship the future?
          </span>
        </h2>

        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
          Join the developers building scalable workflows. Open source, secure,
          and ready for production.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="h-14 px-8 rounded-full bg-white text-black hover:bg-neutral-200 font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-shadow"
            >
              Start Building Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/api-docs")}
              className="h-14 px-8 rounded-full border-white/10 text-white hover:bg-white/10 font-medium text-lg backdrop-blur-sm"
            >
              Read API Docs
            </Button>
          </motion.div>
        </div>

        <p className="mt-8 text-xs text-neutral-500 font-medium uppercase tracking-widest">
          Free for local development • No credit card required
        </p>
      </div>
    </section>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-white/10 bg-neutral-950 pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">TaskFlow</span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            The scalable task management solution for modern engineering teams.
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-400/10 w-fit px-3 py-1 rounded-full border border-green-400/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            All Systems Normal
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li>
              <a
                href="#features"
                className="hover:text-blue-400 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Integration
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Changelog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Roadmap
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li>
              <button
                onClick={() => navigate("/api-docs")}
                className="hover:text-blue-400 transition-colors"
              >
                API Documentation
              </button>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Community
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                GitHub Repo
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Security
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none select-none">
        <h1 className="text-[20vw] font-bold text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
          TASKFLOW
        </h1>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <p>© 2025 TaskFlow Inc. Built for scalability.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-blue-500/30 font-sans">
      <AnimatedBeams />
      <Navbar />
      <Hero />
      <Reviews />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
