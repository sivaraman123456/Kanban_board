import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KanbanState, Task, ColumnId } from './types';
import { loadState, saveState } from '../utils/localStorage';

const initialState: KanbanState = loadState() || {
  tasks: {},
  columns: {
    todo: { id: 'todo', title: 'Todo', taskIds: [] },
    inProgress: { id: 'inProgress', title: 'In Progress', taskIds: [] },
    done: { id: 'done', title: 'Done', taskIds: [] }
  },
  darkMode: false
};

const taskSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks[task.id] = task;
      state.columns[task.columnId].taskIds.push(task.id);
      saveState(state);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks[task.id] = task;
      saveState(state);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.tasks[taskId];
      delete state.tasks[taskId];
      state.columns[task.columnId].taskIds = state.columns[task.columnId].taskIds.filter(
        id => id !== taskId
      );
      saveState(state);
    },
    moveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        sourceColumn: ColumnId;
        destColumn: ColumnId;
        destIndex: number;
      }>
    ) => {
      const { taskId, sourceColumn, destColumn, destIndex } = action.payload;
      
      // Remove from source
      state.columns[sourceColumn].taskIds = state.columns[sourceColumn].taskIds.filter(
        id => id !== taskId
      );
      
      // Add to destination
      state.columns[destColumn].taskIds.splice(destIndex, 0, taskId);
      
      // Update task's columnId
      state.tasks[taskId].columnId = destColumn;
      
      saveState(state);
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      saveState(state);
    }
  }
});

export const { addTask, updateTask, deleteTask, moveTask, toggleDarkMode } = taskSlice.actions;
export default taskSlice.reducer;