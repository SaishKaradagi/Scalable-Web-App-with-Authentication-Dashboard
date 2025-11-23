import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Copy,
  Check,
  Server,
  Shield,
  Database,
  Terminal,
  Hash,
  ChevronRight,
} from "lucide-react";
import AnimatedBeams from "@/components/AnimatedBeams";
import { cn } from "@/lib/utils";

// --- Components for the Docs ---

const MethodBadge = ({ method }: { method: string }) => {
  const styles = {
    GET: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    POST: "bg-green-500/10 text-green-400 border-green-500/20",
    PUT: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded text-[10px] font-bold border font-mono",
        styles[method as keyof typeof styles] || "bg-gray-500/10 text-gray-400"
      )}
    >
      {method}
    </span>
  );
};

const CodeBlock = ({
  code,
  language = "json",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-4 rounded-xl bg-black/50 border border-white/10 overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
          <span className="text-xs text-neutral-500 font-mono">{title}</span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/20" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
            <div className="w-2 h-2 rounded-full bg-green-500/20" />
          </div>
        </div>
      )}
      <div className="relative p-4 overflow-x-auto">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md text-neutral-500 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
        <pre className="text-xs font-mono text-neutral-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

const EndpointCard = ({ method, path, title, description, children }: any) => {
  return (
    <div className="mb-12 scroll-mt-32" id={`${method}-${path}`}>
      <div className="flex items-baseline gap-3 mb-2">
        <MethodBadge method={method} />
        <h3 className="text-lg font-bold text-white font-mono">{path}</h3>
      </div>
      <h4 className="text-neutral-400 font-medium mb-2">{title}</h4>
      <p className="text-sm text-neutral-500 mb-6 leading-relaxed max-w-2xl">
        {description}
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// --- Main Page ---

export default function ApiDocs() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("introduction");

  // Simple spy scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introduction", "auth", "profile", "tasks", "errors"];
      // Logic to determine active section based on scroll position would go here
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">
      <AnimatedBeams />

      {/* Top Gradient */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none z-0" />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl h-16">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                <Terminal className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold tracking-tight">TaskFlow API</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                v1.0.0
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="text-neutral-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 pt-24 pb-20 flex gap-12 relative z-10">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0 fixed top-24 bottom-0 overflow-y-auto pr-4">
          <div className="space-y-8">
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Server className="w-3 h-3" /> Getting Started
              </h5>
              <ul className="space-y-1 border-l border-white/10 ml-1.5">
                <li>
                  <button
                    onClick={() => scrollTo("introduction")}
                    className={cn(
                      "text-sm px-4 py-1.5 block border-l -ml-px transition-colors text-left w-full",
                      activeSection === "introduction"
                        ? "border-blue-500 text-blue-400"
                        : "border-transparent text-neutral-500 hover:text-neutral-300"
                    )}
                  >
                    Introduction
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("authentication")}
                    className={cn(
                      "text-sm px-4 py-1.5 block border-l -ml-px transition-colors text-left w-full",
                      activeSection === "authentication"
                        ? "border-blue-500 text-blue-400"
                        : "border-transparent text-neutral-500 hover:text-neutral-300"
                    )}
                  >
                    Authentication
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Auth Routes
              </h5>
              <ul className="space-y-1 border-l border-white/10 ml-1.5">
                <li>
                  <button
                    onClick={() => scrollTo("POST-/api/auth/register")}
                    className="text-sm text-neutral-500 hover:text-neutral-300 px-4 py-1.5 block w-full text-left"
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("POST-/api/auth/login")}
                    className="text-sm text-neutral-500 hover:text-neutral-300 px-4 py-1.5 block w-full text-left"
                  >
                    Login
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Database className="w-3 h-3" /> Resources
              </h5>
              <ul className="space-y-1 border-l border-white/10 ml-1.5">
                <li>
                  <button
                    onClick={() => scrollTo("GET-/api/tasks")}
                    className="text-sm text-neutral-500 hover:text-neutral-300 px-4 py-1.5 block w-full text-left"
                  >
                    Get Tasks
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("POST-/api/tasks")}
                    className="text-sm text-neutral-500 hover:text-neutral-300 px-4 py-1.5 block w-full text-left"
                  >
                    Create Task
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("PUT-/api/tasks/:id")}
                    className="text-sm text-neutral-500 hover:text-neutral-300 px-4 py-1.5 block w-full text-left"
                  >
                    Update Task
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("DELETE-/api/tasks/:id")}
                    className="text-sm text-neutral-500 hover:text-neutral-300 px-4 py-1.5 block w-full text-left"
                  >
                    Delete Task
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-72 max-w-4xl">
          {/* Introduction */}
          <section id="introduction" className="mb-20">
            <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Task Manager API
            </h1>
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              The TaskFlow API allows you to programmatically manage tasks,
              projects, and user profiles. All responses are returned in JSON
              format.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-neutral-900/50 border border-white/10 p-4 rounded-xl">
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                  Base URL
                </div>
                <div className="font-mono text-blue-400">
                  http://localhost:5001/api
                </div>
              </div>
              <div className="bg-neutral-900/50 border border-white/10 p-4 rounded-xl">
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                  Content-Type
                </div>
                <div className="font-mono text-orange-400">
                  application/json
                </div>
              </div>
            </div>
          </section>

          {/* Authentication Info */}
          <section id="authentication" className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" /> Authentication
            </h2>
            <p className="text-neutral-400 mb-4">
              Authentication is handled via JWT (JSON Web Tokens). Include your
              token in the Authorization header for all protected routes.
            </p>
            <CodeBlock
              title="Header Format"
              code={`Authorization: Bearer <your_token>`}
              language="bash"
            />
          </section>

          <div className="h-px bg-white/10 my-12" />

          {/* Auth Endpoints */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-8">Auth Routes</h2>

            <EndpointCard
              method="POST"
              path="/api/auth/register"
              title="Register User"
              description="Create a new user account. Returns a JWT token and user details."
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-bold text-white mb-3 uppercase tracking-wider">
                    Request Body
                  </div>
                  <CodeBlock
                    code={`{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}`}
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-3 uppercase tracking-wider">
                    Response (201)
                  </div>
                  <CodeBlock
                    code={`{
  "success": true,
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": "64f...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}`}
                  />
                </div>
              </div>
            </EndpointCard>

            <EndpointCard
              method="POST"
              path="/api/auth/login"
              title="Login User"
              description="Authenticate an existing user. Returns a JWT token."
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-bold text-white mb-3 uppercase tracking-wider">
                    Request Body
                  </div>
                  <CodeBlock
                    code={`{
  "email": "john@example.com",
  "password": "password123"
}`}
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-3 uppercase tracking-wider">
                    Response (200)
                  </div>
                  <CodeBlock
                    code={`{
  "success": true,
  "data": {
    "token": "eyJhbGci...",
    "user": { ... }
  }
}`}
                  />
                </div>
              </div>
            </EndpointCard>
          </section>

          <div className="h-px bg-white/10 my-12" />

          {/* Task Endpoints */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-8">
              Task Management
            </h2>

            <EndpointCard
              method="GET"
              path="/api/tasks"
              title="List All Tasks"
              description="Retrieve a paginated list of tasks. Supports filtering by status, priority, and search."
            >
              <div className="mb-4">
                <div className="text-xs font-bold text-white mb-3 uppercase tracking-wider">
                  Query Parameters
                </div>
                <div className="bg-neutral-900/50 border border-white/10 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white/5 text-neutral-300">
                      <tr>
                        <th className="p-3 font-medium">Param</th>
                        <th className="p-3 font-medium">Type</th>
                        <th className="p-3 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-400 divide-y divide-white/5">
                      <tr>
                        <td className="p-3 font-mono text-blue-400">status</td>
                        <td className="p-3 font-mono text-xs">string</td>
                        <td className="p-3">pending, in-progress, completed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-400">
                          priority
                        </td>
                        <td className="p-3 font-mono text-xs">string</td>
                        <td className="p-3">low, medium, high</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-blue-400">search</td>
                        <td className="p-3 font-mono text-xs">string</td>
                        <td className="p-3">Search in title/description</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-bold text-white mb-3 uppercase tracking-wider">
                  Response Example
                </div>
                <CodeBlock
                  code={`{
  "success": true,
  "data": {
    "tasks": [
      {
        "_id": "64f...",
        "title": "Complete project",
        "status": "in-progress",
        "priority": "high",
        "tags": ["urgent"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1
    }
  }
}`}
                />
              </div>
            </EndpointCard>

            <EndpointCard
              method="POST"
              path="/api/tasks"
              title="Create Task"
              description="Create a new task. 'title' is the only required field."
            >
              <CodeBlock
                title="Request Body"
                code={`{
  "title": "Write API Docs",
  "description": "Document all endpoints",
  "priority": "high",
  "dueDate": "2025-11-30"
}`}
              />
            </EndpointCard>

            <EndpointCard
              method="DELETE"
              path="/api/tasks/:id"
              title="Delete Task"
              description="Permanently remove a task by ID."
            >
              <CodeBlock
                title="Response"
                code={`{
  "success": true,
  "message": "Task deleted successfully",
  "data": { "id": "64f..." }
}`}
              />
            </EndpointCard>
          </section>

          <div className="h-px bg-white/10 my-12" />

          {/* Error Handling */}
          <section id="errors" className="mb-24">
            <h2 className="text-xl font-bold text-white mb-6">
              Error Responses
            </h2>
            <div className="grid gap-4">
              {[
                { code: 400, text: "Bad Request - Validation failed" },
                { code: 401, text: "Unauthorized - Token missing or invalid" },
                { code: 404, text: "Not Found - Resource does not exist" },
                { code: 429, text: "Too Many Requests - Rate limit exceeded" },
                { code: 500, text: "Server Error - Internal issue" },
              ].map((err, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-neutral-900/30 border border-white/5 rounded-lg"
                >
                  <div className="font-mono text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">
                    {err.code}
                  </div>
                  <div className="text-neutral-400 text-sm">{err.text}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
