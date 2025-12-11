"use client";


import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLoggedIn(!!localStorage.getItem("token"));
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/auth/login");
  }

  const linkClasses = (path: string) =>
    `text-sm ${
      pathname === path ? "text-forest-500 font-semibold" : "text-gray-300"
    } hover:text-forest-400 transition`;

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
         <Link href="/" className={linkClasses("/")}>

          <div className="h-8 w-8 rounded-xl bg-forest-500/30 border border-forest-500/60 flex items-center justify-center text-xs font-bold text-forest-100 shadow-glass">
            ST
          </div>
          <span className="text-sm text-gray-300">
            <span className="font-semibold text-forest-300">
              SmartTasks AI
            </span>
            <span className="text-gray-500"> by Asnaff</span>
          </span>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/" className={linkClasses("/")}>
            Dashboard
          </Link>
          <Link href="/tasks" className={linkClasses("/tasks")}>
            Tasks
          </Link>
          <Link href="/ai" className={linkClasses("/ai")}>
            AI Assistant
          </Link>

          {!loggedIn ? (
            <>
              <Link href="/auth/login" className="btn-ghost text-xs">
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary text-xs">
                Sign up
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn-ghost text-xs">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
