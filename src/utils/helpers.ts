import { Task, Priority } from '../store/types';

export const sortTasksByDate = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
};

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder: Record<Priority, number> = { High: 3, Medium: 2, Low: 1 };
  return [...tasks].sort((a, b) => 
    priorityOrder[b.priority] - priorityOrder[a.priority]
  );
};

export const filterHighPriority = (tasks: Task[]): Task[] => {
  return tasks.filter(task => task.priority === 'High');
};

export const filterDueToday = (tasks: Task[]): Task[] => {
  const today = new Date().toISOString().split('T')[0];
  return tasks.filter(task => task.dueDate === today);
};

export const searchTasks = (tasks: Task[], searchTerm: string): Task[] => {
  if (!searchTerm) return tasks;
  return tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};