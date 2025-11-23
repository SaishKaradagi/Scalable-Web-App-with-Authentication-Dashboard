import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Save } from "lucide-react";
import { Task } from "@/hooks/useTasks";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
});

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  task?: Task | null;
}

export default function TaskDialog({
  open,
  onOpenChange,
  onSubmit,
  task,
}: TaskDialogProps) {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
      });
    }
  }, [task, form, open]);

  const handleSubmit = async (values: z.infer<typeof taskSchema>) => {
    await onSubmit(values);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-neutral-950 border-white/10 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            {task
              ? "Make changes to your existing task here."
              : "Add a new task to your workspace."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Review PR #123"
                      {...field}
                      className="bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-blue-500/50 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add details about this task..."
                      className="resize-none bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-blue-500/50 rounded-xl min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-neutral-900/50 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-900 border-white/10 text-white">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Priority
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-neutral-900/50 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-900 border-white/10 text-white">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Due Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="bg-neutral-900/50 border-white/10 text-white focus:border-blue-500/50 rounded-xl block w-full [color-scheme:dark]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-white text-black hover:bg-neutral-200 font-bold rounded-xl"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {task ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
