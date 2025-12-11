import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr,1.2fr]">
      <section className="glass-panel p-6 flex flex-col justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-forest-300/80 mb-2">
            Welcome
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Clear your mind,{" "}
            <span className="text-forest-300">one smart task at a time.</span>
          </h1>
          <p className="text-sm text-gray-300 max-w-lg">
            SmartTasks AI helps you create tasks, focus on what matters, and
            get suggestions from Gemini when you feel stuck.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/tasks/create" className="btn-primary">
            + New Task
          </Link>
          <Link href="/tasks" className="btn-ghost">
            View all tasks
          </Link>
          <Link href="/ai" className="btn-ghost">
            Ask AI assistant
          </Link>
        </div>
      </section>

      <section className="glass-panel p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-gray-100">
          Today&apos;s focus tips
        </h2>
        <ul className="text-xs text-gray-300 space-y-2">
          <li>• Keep today&apos;s list short and realistic.</li>
          <li>• Allocate 25 minutes for deep work on one task.</li>
          <li>• Let AI suggest the next best move when you feel lost.</li>
        </ul>
        <div className="mt-4 text-[11px] text-gray-400">
          Pro tip: Use &quot;AI Assistant&quot; to generate mini-action plans
          for your goals.
        </div>
      </section>
    </div>
  );
}
