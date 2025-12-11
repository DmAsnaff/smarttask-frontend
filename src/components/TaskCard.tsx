"use client";

import { TaskItem, toggleTaskCompletion, deleteTask } from "@/lib/api";
import { useTransition } from "react";
import { useRouter } from "next/navigation";


// export default function TaskCard({ task }: { task: TaskItem }){
type TaskCardProps = {
  task: TaskItem;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {

  const [isPending, startTransition] = useTransition();
    const router = useRouter();


  function handleToggle() {
    startTransition(async () => {
      await toggleTaskCompletion(task);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm("Delete this task?")) return;
    startTransition(async () => {
      await deleteTask(task.id);
      router.refresh();
    });
  }

  const priorityColors: Record<string, string> = {
    High: "bg-red-500/20 text-red-200 border-red-500/40",
    Medium: "bg-amber-500/20 text-amber-200 border-amber-500/40",
    Low: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  };

  return (
    <div className="glass-panel p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-sm text-white flex items-center gap-2">
            {task.title}
            {task.isCompleted && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/40">
                Done
              </span>
            )}
          </h3>
          {task.description && (
            <p className="text-xs text-gray-300 mt-1">{task.description}</p>
          )}
        </div>
        <span
          className={`text-[10px] px-2 py-1 rounded-full border ${
            priorityColors[task.priority] ?? "bg-forest-500/20 text-forest-100"
          }`}
        >
          {task.priority} priority
        </span>
      </div>

      <div className="flex justify-between items-center text-[11px] text-gray-400">
        <span>
          Created {new Date(task.createdAt).toLocaleDateString()}{" "}
          {task.dueDate && (
            <span className="text-gray-300">
              · Due {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleToggle}
            disabled={isPending}
            className="btn-ghost px-2 py-1 text-[11px]"
          >
            {task.isCompleted ? "Mark as pending" : "Mark as done"}
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="btn-ghost px-2 py-1 text-[11px] text-red-300 border-red-500/40"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
