"use client";

import { getAISuggestions } from "@/lib/api";
import { useState } from "react";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuggestion(null);
    if (!input.trim()) {
      setError("Describe what you want help with.");
      return;
    }
    setLoading(true);
    try {
      const res = await getAISuggestions(input);
      setSuggestion(res.suggestion);
    } catch (err: any) {
      setError(err.message || "AI request failed");
    } finally {
      setLoading(false);
    }
  }

  const suggestionLines =
    suggestion?.split("\n").filter((line) => line.trim().length > 0) ?? [];

  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr,1fr]">
      <section className="glass-panel p-6 flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold text-white">
            AI Assistant
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Tell Gemini what you&apos;re trying to achieve, and it will suggest
            3 tasks you can add.
          </p>
        </div>

        {error && (
          <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleAsk} className="flex flex-col gap-3">
          <textarea
            className="glass-input h-32 resize-none"
            placeholder="Example: I want to improve my health, or I need to finish my final year project..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn-primary self-start" disabled={loading}>
            {loading ? "Thinking with the AI" : "Ask AI for tasks"}
          </button>
        </form>
      </section>

      <section className="glass-panel p-6 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-100">
          Suggested tasks
        </h2>

        {!suggestion && !loading && (
          <p className="text-xs text-gray-300">
            Your suggestions will appear here as a short lists. Use them as inspiration and add the ones you like as
            tasks.
          </p>
        )}

        {loading && (
          <p className="text-xs text-forest-200 animate-pulse">
            Thinking with the AI about your next steps...
          </p>
        )}

        {suggestionLines.length > 0 && (
          <ul className="space-y-2 text-xs text-gray-100">
            {suggestionLines.map((line, idx) => (
              <li
                key={idx}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10"
              >
                {line.replace(/^\d+[\).\-\s]*/, "")}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
