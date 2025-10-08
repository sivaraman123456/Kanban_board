export type Priority = 'Low' | 'Medium' | 'High';
export type ColumnId = 'todo' | 'inProgress' | 'done';
export type FilterType = 'all' | 'high-priority' | 'due-today';
export type SortType = 'dueDate' | 'priority';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  columnId: ColumnId;
}

export interface Column {
  id: ColumnId;
  title: string;
  taskIds: string[];
}

export interface KanbanState {
  tasks: Record<string, Task>;
  columns: Record<ColumnId, Column>;
  darkMode: boolean;
}