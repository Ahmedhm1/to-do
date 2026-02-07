import './App.css';
import "./collection.css"
import { useState } from 'react';
import ToDo from './toDo';
import { ToDoContext } from './contexts';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  // localStorage.removeItem("toDoData")
  const storedTasks = localStorage.getItem("toDoData")
  const [toDo, setToDo] = useState(storedTasks ? JSON.parse(storedTasks) : [
  {
    id: 1,
    title: "قراءة كتاب",
    description: "الإنجاز قبل نهاية الشهر",
    state: "done"
  },
  {
    id: 2,
    title: "إنهاء كورس ريأكت",
    description: "مهم جداً لإدارة الـ State في المشاريع الكبيرة",
    state: "inProgress"
  },
  {
    id: 3,
    title: "ممارسة الرياضة",
    description: "المشي لمدة 30 دقيقة يومياً",
    state: "inProgress"
  },
  {
    id: 4,
    title: "تحديث السيرة الذاتية (CV)",
    description: "إضافة المشاريع الجديدة المكتملة",
    state: "done"
  }
])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ToDoContext.Provider value={[toDo, setToDo]}>
          <div className="toDo flexCenter">
            <ToDo />
          </div>
        </ToDoContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;