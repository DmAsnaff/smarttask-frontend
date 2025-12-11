const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

// function getToken() {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("token");
// }

function authHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}


//  Auth
export async function register(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      passwordHash: password, // your backend uses PasswordHash to receive raw password
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      passwordHash: password,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ token: string }>;
}

//  Tasks
export type TaskItem = {
  id: number;
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
};

export async function getTasks(): Promise<TaskItem[] | { error: number; message: string }> {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
  return {
    error: res.status,
    message: await res.text(),
  };
}
  return res.json();
}

export async function createTask(data: {
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
}) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      ...data,
      isCompleted: false,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function toggleTaskCompletion(task: TaskItem) {
  const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({
      ...task,
      isCompleted: !task.isCompleted,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteTask(id: number) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
}

// // AI Suggestion
// export async function getAISuggestions(input: string) {
//   const res = await fetch(`${API_BASE}/ai/suggest-task`, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify({ id: 0, input }),
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json() as Promise<{ suggestion: string }>;
// }

export async function getAISuggestions(input: string) {
  const res = await fetch(`${API_BASE}/ai/suggest-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      input,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI request failed: ${text}`);
  }

  return res.json() as Promise<{ suggestion: string }>;
}