"use client";

export default function Error({ error, reset }: any) {
  console.error(error);

  return (
    <div className="page-container">
      <div className="glass-panel p-8 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-forest-400 mb-3">
          Something went wrong
        </h1>

        <p className="text-gray-300 mb-6">
          Your session may have expired, or we couldn't load your tasks.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-primary"
          >
            Retry
          </button>

          <a
            href="/auth/login"
            className="btn-ghost"
          >
            Login Again
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
