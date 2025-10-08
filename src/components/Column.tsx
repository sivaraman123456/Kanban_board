import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ColumnId, Task, SortType } from '../store/types';
import TaskCard from './TaskCard';

interface ColumnProps {
  columnId: ColumnId;
  title: string;
  tasks: Task[];
  sortBy: SortType;
  onSortChange: (sortType: SortType) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDraggedOver: boolean;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  draggedTaskId: string | null;
}

const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  sortBy,
  onSortChange,
  onDragOver,
  onDrop,
  isDraggedOver,
  onEditTask,
  onDeleteTask,
  onDragStart,
  draggedTaskId
}) => {
  const darkMode = useSelector((state: RootState) => state.kanban.darkMode);

  return (
    <div
      className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
          <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ({tasks.length})
          </span>
        </h2>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className={`text-xs px-2 py-1 rounded ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <option value="dueDate">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <div
        className={`min-h-[500px]  flex flex-col gap-[10px] rounded-lg p-2 ${
          isDraggedOver ? 'bg-blue-50 dark:bg-gray-700' : ''
        }`}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            darkMode={darkMode}
            onDragStart={onDragStart}
            isDragging={draggedTaskId === task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;