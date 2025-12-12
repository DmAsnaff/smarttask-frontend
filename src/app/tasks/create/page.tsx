"use client";

import { createTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";


export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, []);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setLoading(true);
    try {
      await createTask({
        title,
        description,
        priority,
        dueDate: dueDate || undefined,
      });
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="glass-panel p-6">
        <h1 className="text-lg font-semibold mb-1">Create new task</h1>
        <p className="text-xs text-gray-300 mb-4">
          Give it a clear title, then let AI help you break it down later.
        </p>

        {error && (
          <div className="mb-3 text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-xs mb-1 text-gray-300">
              Task title
            </label>
            <input
              className="glass-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Prepare for exam, build portfolio, clean room..."
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-gray-300">
              Description (optional)
            </label>
            <textarea
              className="glass-input h-24 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add context for your future self."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1 text-gray-300">
                Priority
              </label>
              <select
                className="glass-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1 text-gray-300">
                Due date
              </label>
              <input
                type="date"
                className="glass-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-primary mt-2" disabled={loading}>
            {loading ? "Creating..." : "Create task"}
          </button>
        </form>
      </div>
    </div>
  );
}
