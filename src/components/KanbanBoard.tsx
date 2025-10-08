import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { RootState } from '../store/store';
import { addTask, updateTask, deleteTask, moveTask } from '../store/taskSlice';
import { Task, ColumnId, FilterType, SortType } from '../store/types';
import Header from './Header';
import {ProgressBar} from './ProgressBar';
import Column from './Column';
import TaskModal from './TaskModal';
import {
  sortTasksByDate,
  sortTasksByPriority,
  filterHighPriority,
  filterDueToday,
  searchTasks
} from '../utils/helpers';

const KanbanBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, columns, darkMode } = useSelector((state: RootState) => state.kanban);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<Record<ColumnId, SortType>>({
    todo: 'dueDate',
    inProgress: 'dueDate',
    done: 'dueDate'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<ColumnId | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: ColumnId) => {
    e.preventDefault();
    setDraggedOverColumn(columnId);
  };

  const handleDrop = (e: React.DragEvent, destColumn: ColumnId) => {
    e.preventDefault();
    if (!draggedTask) return;

    const task = tasks[draggedTask];
    const sourceColumn = task.columnId;
    const destIndex = columns[destColumn].taskIds.length;

    dispatch(
      moveTask({
        taskId: draggedTask,
        sourceColumn,
        destColumn,
        destIndex
      })
    );

    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const handleAddOrUpdateTask = (taskData: Omit<Task, 'id' | 'columnId'>) => {
    if (editingTask) {
      dispatch(updateTask({ ...editingTask, ...taskData }));
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        columnId: 'todo'
      };
      dispatch(addTask(newTask));
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const getColumnTasks = (columnId: ColumnId): Task[] => {
    const taskIds = columns[columnId].taskIds;
    let columnTasks = taskIds.map((id) => tasks[id]).filter(Boolean);

    columnTasks = searchTasks(columnTasks, searchTerm);

    if (filter === 'high-priority') {
      columnTasks = filterHighPriority(columnTasks);
    } else if (filter === 'due-today') {
      columnTasks = filterDueToday(columnTasks);
    }

    if (sortBy[columnId] === 'dueDate') {
      columnTasks = sortTasksByDate(columnTasks);
    } else {
      columnTasks = sortTasksByPriority(columnTasks);
    }

    return columnTasks;
  };

  const handleSortChange = (columnId: ColumnId, sortType: SortType) => {
    setSortBy({ ...sortBy, [columnId]: sortType });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Header onAddTask={() => setIsModalOpen(true)} />
      <ProgressBar />

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
          className={`px-4 py-2 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="all">All Tasks</option>
          <option value="high-priority">High Priority</option>
          <option value="due-today">Due Today</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['todo', 'inProgress', 'done'] as ColumnId[]).map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            title={columns[columnId].title}
            tasks={getColumnTasks(columnId)}
            sortBy={sortBy[columnId]}
            onSortChange={(sortType) => handleSortChange(columnId, sortType)}
            onDragOver={(e) => handleDragOver(e, columnId)}
            onDrop={(e) => handleDrop(e, columnId)}
            isDraggedOver={draggedOverColumn === columnId}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onDragStart={handleDragStart}
            draggedTaskId={draggedTask}
          />
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleAddOrUpdateTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default KanbanBoard;