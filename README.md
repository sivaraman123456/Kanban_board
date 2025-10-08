#  Mini Kanban Board

A modern task management application built with React, Redux Toolkit, and TypeScript. Features drag-and-drop functionality, filtering, sorting, and dark mode.

[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764abc.svg)](https://redux-toolkit.js.org/)

---

##  Features

-  **Kanban Board** - Three columns (Todo, In Progress, Done)
-  **Drag & Drop** - Move tasks between columns
-  **Task Management** - Create, edit, and delete tasks
-  **Task Properties** - Title, description, priority, and due date
-  **Filtering** - View all, high priority, or due today
-  **Sorting** - By date or priority per column
-  **Search** - Real-time task search by title
-  **Dark Mode** - Toggle with persistent preference
-  **Progress Bar** - Visual task completion tracker
-  **Data Persistence** - Auto-save to localStorage

---

##  Quick Start

```bash
git clone https://github.com/yourusername/kanban-board.git
cd kanban-board

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **lucide-react** - Icons
- **localStorage** - Data persistence

---

##  Project Structure

```
src/
├── components/        # React components
│   ├── KanbanBoard.tsx
│   ├── Column.tsx
│   ├── TaskCard.tsx
│   ├── TaskModal.tsx
│   ├── Header.tsx
│   └── ProgressBar.tsx
├── store/            # Redux state
│   ├── store.ts
│   ├── taskSlice.ts
│   └── types.ts
├── utils/            # Helper functions
│   ├── localStorage.ts
│   └── helpers.ts
├── App.tsx
└── index.tsx
```

---

##  Usage

### Add Task
Click **"Add Task"** → Fill form → Click **"Add"**

### Move Task
Drag task card → Drop in target column

### Edit Task
Click edit icon **✏️** → Modify → Click **"Update"**

### Delete Task
Click trash icon **🗑️** on any task

### Filter & Sort
- Use dropdowns to filter (All/High Priority/Due Today)
- Sort each column independently (Date/Priority)

### Search
Type in search bar to filter tasks by title

### Dark Mode
Click **/☀️** icon to toggle theme

---

##  Key Implementation Details

### State Management
```typescript
{
  tasks: { "id": { title, description, priority, dueDate, columnId } },
  columns: { todo: { taskIds: [] }, inProgress: {}, done: {} },
  darkMode: boolean
}
```

### Drag & Drop
Native HTML5 implementation - no external library needed
```typescript
<div draggable onDragStart={handleStart} onDrop={handleDrop}>
```

### Data Persistence
Auto-saves to localStorage on every state change
```typescript
localStorage.setItem('kanban-state', JSON.stringify(state));
```

---

##  Challenges & Solutions

### Challenge 1: Drag and Drop
**Problem:** `react-beautiful-dnd` not available  
**Solution:** Implemented native HTML5 drag & drop API

### Challenge 2: State Management
**Problem:** Complex state with multiple filters  
**Solution:** Redux Toolkit with centralized state logic

### Challenge 3: Data Persistence
**Problem:** Sync state with localStorage  
**Solution:** Auto-save after every Redux action

### Challenge 4: Filter + Sort Combination
**Problem:** Applying multiple operations  
**Solution:** Sequential pipeline: Get → Search → Filter → Sort

---

##  Build for Production

```bash
npm run build
```

Deploy the `build` folder to:
- **Vercel:** `vercel --prod`
- **Netlify:** Drag & drop `build` folder
- **GitHub Pages:** Use `gh-pages` package

---

##  Future Enhancements

- [ ] Task categories/tags
- [ ] Subtasks and checklists
- [ ] Backend API integration
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Task notifications
- [ ] Export/Import functionality
- [ ] Multiple board support

---

##  Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm build` | Build for production |
| `npm test` | Run tests |

---

##  Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/Feature`)
3. Commit changes (`git commit -m 'Add Feature'`)
4. Push to branch (`git push origin feature/Feature`)
5. Open Pull Request

---


## 👤 Author

- SIVARAMAN 
- GitHub: [@yourusername](https://github.com/yourusername)
- Deployed Link: 

---

##  Acknowledgments

Built with React, Redux Toolkit, TypeScript, and Tailwind CSS
