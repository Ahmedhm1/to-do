import { createContext, useContext, useReducer } from "react";
import ToDoReducer from "../reducers/toDoReducer";

const ToDoContext = createContext([]);

const intialTodo = [
    {
        id: 1,
        title: "قراءة كتاب",
        description: "الإنجاز قبل نهاية الشهر",
        state: "done",
    },
    {
        id: 2,
        title: "إنهاء كورس ريأكت",
        description: "مهم جداً لإدارة الـ State في المشاريع الكبيرة",
        state: "inProgress",
    },
    {
        id: 3,
        title: "ممارسة الرياضة",
        description: "المشي لمدة 30 دقيقة يومياً",
        state: "inProgress",
    },
    {
        id: 4,
        title: "تحديث السيرة الذاتية (CV)",
        description: "إضافة المشاريع الجديدة المكتملة",
        state: "done",
    },
];
const storedTasks = localStorage.getItem("toDoData");

export function ToDoProvider({ children }) {
    // const [toDo, setToDo] = useState([]);
    const [toDo, dispatch] = useReducer(ToDoReducer, (storedTasks ? JSON.parse(storedTasks) : intialTodo))

    // ===== Load ToDos from LocalStorage Start =====
    // useEffect(() => {
    //     setToDo(() => (storedTasks ? JSON.parse(storedTasks) : intialTodo));
    // }, []);
    // ===== Load ToDos from LocalStorage End =====

    return (
        <ToDoContext.Provider value={[toDo, dispatch]}>
            {children}
        </ToDoContext.Provider>
    );
}

export function useToDo() {
    return useContext(ToDoContext);
}