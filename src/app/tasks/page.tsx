// "use client";

import { useEffect, useState } from "react";
import { getTasks, TaskItem } from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    async function load() {
      const res = await getTasks();
      if ("error" in res) {
        console.error("Error loading tasks:", res.message);
      } else {
        setTasks(res);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading)
    return (
      <p className="text-gray-300 text-sm">Loading your tasks...</p>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Your tasks</h1>
          <p className="text-xs text-gray-300">
            Click a task to manage it.
          </p>
        </div>
        <Link href="/tasks/create" className="btn-primary text-xs">
          + New task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="glass-panel p-6 text-sm text-gray-300">
          You don&apos;t have tasks yet. Start by creating one.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>
      )}
    </div>
  );
}
