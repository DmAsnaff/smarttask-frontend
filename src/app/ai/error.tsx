"use client";

export default function Error({ error, reset }: any) {
  console.error(error);

  return (
    <div className="page-container">
      <div className="glass-panel p-8 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-forest-400 mb-3">
          AI Assistant Error
        </h1>

        <p className="text-gray-300 mb-6">
          We couldn't process your AI request. Please try again.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary"
          >
            Retry
          </button>

          <a
            href="/tasks"
            className="btn-ghost"
          >
            Go to Tasks
          </a>

          <a
            href="/"
            className="btn-ghost"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
