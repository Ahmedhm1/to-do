import './App.css';
import "./collection.css"
import { useState } from 'react';
import ToDos from './toDos';
import { ToDoContext } from './contexts';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6573c3',
      main: '#3f51b5',
      dark: '#2c387e',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: ["cairo"],
  },
});

const intialTodo = [
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
]

function App() {
  // localStorage.removeItem("toDoData")
  const storedTasks = localStorage.getItem("toDoData")
  const [toDo, setToDo] = useState(storedTasks ? JSON.parse(storedTasks) : intialTodo)

  return (
    <div className="App">
      <style>
        {`
          :root {
            --primary-light: ${theme.palette.primary.light};
            --primary-main: ${theme.palette.primary.main};
            --primary-dark: ${theme.palette.primary.dark};
            --primary-contrastText: ${theme.palette.primary.contrastText};
          }
        `}
      </style>
      <ThemeProvider theme={theme}>
        <ToDoContext.Provider value={[toDo, setToDo]}>
          <div className="toDo flexCenter">
            <ToDos />
          </div>
        </ToDoContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;