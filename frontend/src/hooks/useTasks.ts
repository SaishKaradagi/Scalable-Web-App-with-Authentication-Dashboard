import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  createTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useTasks = (filters?: {
  search?: string;
  status?: string;
  priority?: string;
}): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters?.search) params.append("search", filters.search);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.priority) params.append("priority", filters.priority);

      const response = await axios.get(
        `${API_ENDPOINTS.TASKS}?${params.toString()}`
      );
      setTasks(response.data.data.tasks);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters?.search, filters?.status, filters?.priority]);

  const createTask = async (task: Partial<Task>) => {
    const response = await axios.post(API_ENDPOINTS.TASKS, task);
    setTasks((prev) => [response.data.data, ...prev]);
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    const response = await axios.put(`${API_ENDPOINTS.TASKS}/${id}`, task);
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? response.data.data : t))
    );
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API_ENDPOINTS.TASKS}/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
