import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useTasks, Task } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import TaskCard from "@/components/TaskCard";
import TaskDialog from "@/components/TaskDialog";
import { toast } from "sonner";
import {
  Plus,
  Search,
  LogOut,
  User,
  Filter,
  LayoutGrid,
  CheckCircle2,
  Clock,
  Zap,
  Settings,
  ChevronDown,
  Sparkles,
  BarChart3,
  CalendarDays,
} from "lucide-react";
import { getInitials } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import AnimatedBeams from "@/components/AnimatedBeams";

// --- Internal Navbar Component ---
const DashboardNavbar = ({ user, logout, navigate }: any) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
    >
      <div className="pointer-events-auto backdrop-blur-2xl bg-black/60 border border-white/10 rounded-full pl-6 pr-2 py-2 flex items-center justify-between gap-8 shadow-2xl w-full max-w-5xl">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CheckCircle2 className="w-4 h-4 text-neutral-200 relative z-10" />
          </div>
          <span className="font-bold bg-gradient-to-br from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent tracking-tight hidden sm:block">
            TaskFlow
          </span>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <Settings className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/5 outline-none">
                <Avatar className="h-7 w-7 border border-white/10">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-neutral-800 text-[10px] text-white">
                    {getInitials(user?.name || "U")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-neutral-200 max-w-[100px] truncate hidden sm:block">
                  {user?.name}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-neutral-900/95 backdrop-blur-xl border-white/10 text-white shadow-xl mt-2 rounded-xl"
            >
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-neutral-500">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="focus:bg-white/10 focus:text-white cursor-pointer rounded-lg m-1"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={logout}
                className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer rounded-lg m-1"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
};

// --- Main Page Component ---

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Dynamic Time State
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initial call
    updateTimeAndGreeting();

    // Update every second to show live clock
    const timer = setInterval(updateTimeAndGreeting, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateTimeAndGreeting = () => {
    const now = new Date();
    setCurrentTime(now);
    const hour = now.getHours();

    // Adjusted logic: Evening starts at 5 PM (17:00)
    if (hour >= 5 && hour < 12) setGreeting("Good morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  };

  const filters = {
    search,
    status: statusFilter !== "all" ? statusFilter : undefined,
    priority: priorityFilter !== "all" ? priorityFilter : undefined,
  };

  const { tasks, isLoading, createTask, updateTask, deleteTask } =
    useTasks(filters);

  // Stats Logic
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "in-progress"
  ).length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const totalTasks = tasks.length;

  const calculateProgress = (count: number) => {
    if (totalTasks === 0) return 0;
    return Math.round((count / totalTasks) * 100);
  };

  const handleCreateTask = async (taskData: Partial<Task>) => {
    try {
      await createTask(taskData);
      toast.success("Task created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create task");
      throw error;
    }
  };

  const handleUpdateTask = async (taskData: Partial<Task>) => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask._id, taskData);
      toast.success("Task updated successfully!");
      setEditingTask(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update task");
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const handleStatusChange = async (id: string, status: Task["status"]) => {
    try {
      await updateTask(id, { status });
      toast.success("Task status updated!");
    } catch (error: any) {
      toast.error("Failed to update task status");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30 pb-20">
      <AnimatedBeams />

      {/* Top Gradient */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none z-0" />

      <DashboardNavbar
        user={user}
        logout={() => {
          logout();
          navigate("/login");
        }}
        navigate={navigate}
      />

      <main className="container max-w-5xl mx-auto px-4 pt-32 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user?.name?.split(" ")[0]}
              </span>
            </h1>
            <div className="text-neutral-500 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                Workspace Overview
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-700" />
              <span className="flex items-center gap-1.5 text-neutral-400 font-mono">
                <CalendarDays className="w-3.5 h-3.5" />
                {currentTime.toLocaleDateString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
                <span className="text-neutral-600">|</span>
                <Clock className="w-3.5 h-3.5" />
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-neutral-400 bg-neutral-900/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {totalTasks} Total Tasks
          </motion.div>
        </div>

        {/* HUD Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-3 mb-10"
        >
          {/* Card 1: To Do */}
          <div className="group relative overflow-hidden bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:bg-neutral-900/60 hover:border-white/10 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              <Clock className="w-20 h-20 text-yellow-500" />
            </div>
            <div className="flex flex-col relative z-10">
              <span className="text-xs font-mono text-yellow-500/80 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />{" "}
                Pending
              </span>
              <span className="text-4xl font-bold text-white mb-4 tracking-tight">
                {pendingCount}
              </span>

              {/* Dynamic Progress Bar */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5">
                <span>Load</span>
                <span className="ml-auto">
                  {calculateProgress(pendingCount)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress(pendingCount)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Card 2: In Progress */}
          <div className="group relative overflow-hidden bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:bg-neutral-900/60 hover:border-white/10 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              <Zap className="w-20 h-20 text-blue-500" />
            </div>
            <div className="flex flex-col relative z-10">
              <span className="text-xs font-mono text-blue-500/80 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />{" "}
                In Focus
              </span>
              <span className="text-4xl font-bold text-white mb-4 tracking-tight">
                {inProgressCount}
              </span>

              {/* Dynamic Progress Bar */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5">
                <span>Activity</span>
                <span className="ml-auto">
                  {calculateProgress(inProgressCount)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress(inProgressCount)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Completed */}
          <div className="group relative overflow-hidden bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:bg-neutral-900/60 hover:border-white/10 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            </div>
            <div className="flex flex-col relative z-10">
              <span className="text-xs font-mono text-green-500/80 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Done
              </span>
              <span className="text-4xl font-bold text-white mb-4 tracking-tight">
                {completedCount}
              </span>

              {/* Dynamic Progress Bar */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5">
                <span>Completion</span>
                <span className="ml-auto">
                  {calculateProgress(completedCount)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress(completedCount)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Control Bar (Search & Filter) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-24 z-30 mb-8 p-2 rounded-2xl bg-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl flex flex-col md:flex-row gap-2"
        >
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
            <Input
              placeholder="Filter tasks by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 bg-transparent border-transparent text-white placeholder:text-neutral-500 focus:bg-neutral-800 focus:border-white/10 rounded-xl transition-all"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-10 bg-transparent border-transparent text-neutral-400 hover:text-white hover:bg-white/5 focus:bg-neutral-800 rounded-xl transition-all">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px] h-10 bg-transparent border-transparent text-neutral-400 hover:text-white hover:bg-white/5 focus:bg-neutral-800 rounded-xl transition-all">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <SelectValue placeholder="Priority" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 text-white">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-px h-6 bg-white/10 self-center mx-1 hidden md:block" />

            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-white text-black hover:bg-neutral-200 font-bold h-10 px-6 rounded-xl shadow-lg shadow-white/5 transition-all w-full md:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              New
            </Button>
          </div>
        </motion.div>

        {/* Task Grid */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-48 w-full bg-neutral-900/50 rounded-2xl"
                />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-3xl bg-neutral-900/20"
            >
              <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center mb-4 border border-white/5">
                <Sparkles className="w-8 h-8 text-neutral-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                No tasks found
              </h3>
              <p className="text-neutral-500 mb-6 max-w-sm text-center">
                Your workspace is clear. Add a new task to get started.
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                variant="outline"
                className="border-white/10 hover:bg-white/5 text-white rounded-xl"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create First Task
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence>
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={(task) => {
                      setEditingTask(task);
                      setDialogOpen(true);
                    }}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Task Dialog Component */}
      <TaskDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
    </div>
  );
}
