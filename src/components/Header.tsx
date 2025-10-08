import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, Plus } from 'lucide-react';
import { toggleDarkMode } from '../store/taskSlice';
import { RootState } from '../store/store';

interface HeaderProps {
  onAddTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.kanban.darkMode);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Mini Kanban Board
      </h1>
      <div className="flex gap-2">
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={18} />
          Add Task
        </button>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={`p-2 rounded-lg ${
            darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'
          } hover:opacity-80 shadow transition-opacity`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Header;