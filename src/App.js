import './App.css';
import "./collection.css"
import ToDos from './components/toDos';
import { ToDoProvider } from './contexts/ToDoContext';
import { ToastProvider } from './contexts/ToastContext';


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

function App() {
  // localStorage.removeItem("toDoData")

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
        <div className="toDo flexCenter">
          <ToDoProvider>
            <ToastProvider>
              <ToDos />
            </ToastProvider>
          </ToDoProvider>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;