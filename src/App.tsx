import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import KanbanBoard from './components/KanbanBoard';
import { RootState } from './store/store';

function AppContent() {
  const darkMode = useSelector((state: RootState) => state.kanban.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <KanbanBoard />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;