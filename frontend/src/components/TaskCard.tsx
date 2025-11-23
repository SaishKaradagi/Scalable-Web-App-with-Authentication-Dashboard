import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Clock,
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Task } from "@/hooks/useTasks";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

const priorityConfig = {
  low: {
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: ArrowRight,
  },
  medium: {
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    icon: AlertTriangle,
  },
  high: {
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: AlertTriangle,
  },
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  //const PriorityIcon = priorityConfig[task.priority].icon;

  // Handle direct status toggle
  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus =
      task.status === "completed"
        ? "pending"
        : task.status === "pending"
        ? "in-progress"
        : "completed";
    onStatusChange(task._id, nextStatus);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="group relative"
    >
      {/* Glow Effect behind card */}
      <div
        className={cn(
          "absolute -inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500",
          task.priority === "high" && "from-red-500/20",
          task.status === "in-progress" && "from-blue-500/20"
        )}
      />

      <div
        className={cn(
          "relative h-full flex flex-col rounded-xl border border-white/5 bg-[#0A0A0A] p-4 transition-all duration-200",
          "group-hover:border-white/10 group-hover:bg-[#0F0F0F]"
        )}
      >
        {/* Header Row: Checkbox + Title + Hover Actions */}
        <div className="flex items-start gap-3 mb-3">
          {/* Custom Status Checkbox */}
          <button
            onClick={handleStatusClick}
            className={cn(
              "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
              task.status === "completed"
                ? "bg-green-500 border-green-500 text-black"
                : task.status === "in-progress"
                ? "border-blue-500 text-blue-500"
                : "border-neutral-600 hover:border-neutral-400 text-transparent"
            )}
          >
            {task.status === "completed" && (
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            )}
            {task.status === "in-progress" && (
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-medium text-neutral-200 leading-snug transition-colors truncate pr-6",
                task.status === "completed" &&
                  "text-neutral-500 line-through decoration-neutral-700"
              )}
            >
              {task.title}
            </h3>
          </div>

          {/* Hover Actions (Edit/Delete) - Invisible until hover */}
          <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-[#0F0F0F] pl-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-neutral-400 hover:text-white hover:bg-white/10"
              onClick={() => onEdit(task)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-neutral-400 hover:text-red-400 hover:bg-red-400/10"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-neutral-900 border-white/10 text-white"
              >
                <DropdownMenuItem
                  onClick={() => onDelete(task._id)}
                  className="text-red-400 focus:bg-red-500/10 focus:text-red-300"
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Ticket
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Description (if exists) */}
        {task.description && (
          <p className="text-sm text-neutral-500 line-clamp-2 pl-8 mb-4">
            {task.description}
          </p>
        )}

        {/* Footer: Metadata & Tags */}
        <div className="mt-auto pl-8 flex items-center justify-between gap-4">
          {/* Tags area */}
          <div className="flex flex-wrap gap-1.5 overflow-hidden h-6">
            <Badge
              variant="outline"
              className={cn(
                "h-5 px-1.5 text-[10px] uppercase font-bold tracking-wider border",
                priorityConfig[task.priority].color
              )}
            >
              {task.priority}
            </Badge>

            {task.tags?.slice(0, 2).map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="h-5 bg-white/5 hover:bg-white/10 text-neutral-400 border-transparent px-1.5 text-[10px] font-normal"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Date Area */}
          {task.dueDate && (
            <div
              className={cn(
                "shrink-0 flex items-center gap-1.5 text-[10px] font-mono",
                new Date(task.dueDate) < new Date() &&
                  task.status !== "completed"
                  ? "text-red-400"
                  : "text-neutral-500"
              )}
            >
              <Clock className="w-3 h-3" />
              {task.status === "completed"
                ? "Done"
                : formatDistanceToNow(new Date(task.dueDate), {
                    addSuffix: true,
                  }).replace("about ", "")}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
