import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const ProgressBar: React.FC = () => {
  const { tasks, columns, darkMode } = useSelector((state: RootState) => state.kanban);
  
  const totalTasks = Object.keys(tasks).length;
  const doneTasks = columns.done.taskIds.length;
  const progress = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-1">
        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          {doneTasks}/{totalTasks} tasks completed
        </span>
      </div>
      <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

