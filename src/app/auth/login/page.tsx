"use client";

import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await login(username, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", result.token);
      }
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-panel p-6">
        <h1 className="text-lg font-semibold mb-1">Welcome back</h1>
        <p className="text-xs text-gray-300 mb-4">
          Log in to see your tasks and get AI guidance.
        </p>

        {error && (
          <div className="mb-3 text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-300">Username</label>
            <input
              className="glass-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="jane.doe"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-300">Password</label>
            <input
              type="password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="btn-primary mt-2" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
