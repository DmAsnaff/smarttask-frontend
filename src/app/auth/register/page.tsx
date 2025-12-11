"use client";

import { register } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register(username, password);
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-panel p-6">
        <h1 className="text-lg font-semibold mb-1">Create your account</h1>
        <p className="text-xs text-gray-300 mb-4">
          Start tracking tasks with a calm, forest-green workspace.
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
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-300">Confirm password</label>
            <input
              type="password"
              className="glass-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="btn-primary mt-2" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
