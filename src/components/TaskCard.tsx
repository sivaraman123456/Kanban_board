import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Task } from '../store/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  darkMode: boolean;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  isDragging: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  darkMode,
  onDragStart,
  isDragging
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`p-4 rounded-lg border cursor-move ${
        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
      } ${isDragging ? 'opacity-50' : ''} shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {task.description}
      </p>
      <div className="flex flex-wrap gap-2 text-xs">
        <span
          className={`px-2 py-1 rounded ${
            task.priority === 'High'
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              : task.priority === 'Medium'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          }`}
        >
          {task.priority}
        </span>
        <span
          className={`px-2 py-1 rounded ${
            darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;