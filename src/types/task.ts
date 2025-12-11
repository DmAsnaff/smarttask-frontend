export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
}
