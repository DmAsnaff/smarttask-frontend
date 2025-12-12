// "use client";

// import { getTasks } from "@/lib/api";
// import TaskCard from "@/components/TaskCard";
// import Link from "next/link";

// export default async function TasksPage() {
//   const result = await getTasks();

//   // If API returned an error, pass it to the error boundary
//   if ("error" in result) {
//     throw new Error(result.message || "Failed to load tasks");
//   }

//   const tasks = result; // TypeScript now knows this is TaskItem[]

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <h1 className="text-lg font-semibold text-white">Your tasks</h1>
//           <p className="text-xs text-gray-300">
//             Click a task to mark it done or delete it.
//           </p>
//         </div>
//         <Link href="/tasks/create" className="btn-primary text-xs">
//           + New task
//         </Link>
//       </div>

//       {/* No tasks yet */}
//       {tasks.length === 0 ? (
//         <div className="glass-panel p-6 text-sm text-gray-300">
//           You don&apos;t have tasks yet. Start by creating a new one.
//         </div>
//       ) : (
//         <div className="grid gap-3 md:grid-cols-2">
//           {tasks.map((task) => (
//             <TaskCard key={task.id} task={task} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { getTasks, toggleTaskCompletion, deleteTask, TaskItem } from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadTasks() {
    const result = await getTasks();
    if ("error" in result) {
      setError(result.message);
    } else {
      setTasks(result);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleToggle(task: TaskItem) {
    await toggleTaskCompletion(task);
    loadTasks(); 
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    loadTasks(); 
  }

  if (loading) return <p className="text-white">Loading tasks...</p>;
  if (error) return <p className="text-red-400">throw new Error(error); </p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-white">Your tasks</h1>
          <p className="text-xs text-gray-300">
            Click a task to mark it done or delete it.
          </p>
        </div>
        <Link href="/tasks/create" className="btn-primary text-xs">
          + New task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="glass-panel p-6 text-sm text-gray-300">
          You don&apos;t have tasks yet.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
  key={task.id}
  task={task}
  onToggle={() => handleToggle(task)}
  onDelete={() => handleDelete(task.id)}
/>

          ))}
        </div>
      )}
    </div>
  );
}
