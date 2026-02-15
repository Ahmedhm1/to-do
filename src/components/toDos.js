import "../toDo.css";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from "./toDo";
import { WarningComponent, EditTaskComponent } from "./dialogs";
import { useToast } from '../contexts/ToastContext';
import { useToDo } from "../contexts/ToDoContext";

export default function ToDos() {

  // ===== All States Start =====
  const [toDo, dispatch] = useToDo()
  const AddNewAlert = useToast()

  const [title, setTitle] = useState("")
  const [selectedOption, setSelectedOption] = useState("all")

  const [warning, setWarning] = useState(false);
  const [editTask, setEditTask] = useState(false)
  const [target, setTarget] = useState({})
  // ===== All States End =====



  // ===== Save Any Changes To LocalStorage Start =====
  useEffect(() => {
    localStorage.setItem('toDoData', JSON.stringify(toDo));
  }, [toDo]);
  // ===== Save Any Changes To LocalStorage End =====



  // ===== Important Functions Start =====
  function handleSelectOption(e) {
    setSelectedOption(() => e.target.value)
  }

  function handleAddNewTask() {
    dispatch({ type: "AddNewTask", payload: { title } })
    setTitle((title) => "")
    AddNewAlert("success", "تم اضافة المهمة بنجاح")
  }

  function handleSetTaskDone(target) {
    dispatch({ type: "setTaskDone", payload: { target } })
    AddNewAlert("success", "تم تحديث حاله المهمة بنجاح")
  };
  // ===== Import Functions End =====



  // ===== Delete Task Start =====
  function handleOpenwarning(task) {
    setWarning((warning) => true);
    setTarget((target) => task);
  };

  function handleCloseWarning() {
    setWarning((warning) => false);
    setTarget((target) => { return {} });
  };

  function handleDeleteTask() {
    dispatch({ type: "deleteTask", payload: { target } })
    handleCloseWarning()
    AddNewAlert("success", "تم حذف المهمة بنجاح")
  }
  // ===== Delete Task End =====



  // ===== Edit Task Start =====
  function handleClickOpenEditTask(task) {
    setEditTask((editTask) => true);
    setTarget((target) => task);
  }

  function handleCloseEditTask() {
    setEditTask((warning) => false);
    setTarget((target) => { return {} });
  };

  function handleSubmitEditTask(event) {
    const formData = new FormData(event.currentTarget);
    dispatch({ type: "editTask", payload: { event , target, formData } })
    handleCloseEditTask();
    AddNewAlert("success", "تم تعديل المهمة بنجاح")
  };
  // ===== Edit Task End =====



  // ===== Map The Items Start =====
  let toDoList;
  if (toDo.length > 0) {
    let toDoToBeRender;
    if (selectedOption !== "all") {
      toDoToBeRender = toDo.filter(task => task.state === selectedOption)
    } else {
      toDoToBeRender = [...toDo]
    }
    toDoList = toDoToBeRender.map((task) => {
      return <ToDo key={task.id} task={task} handleOpenEditTask={handleClickOpenEditTask} handleOpenwarning={handleOpenwarning} handleSetTaskDone={handleSetTaskDone} />;
    });
  } else {
    toDoList = <div className="noTasks">لا يوجد مهام</div>
  }
  // ===== Map The Items End =====



  return (
    <>
      <Container maxWidth="sm">
        <div className="box">
          <div className="title">
            <h1>مهامي</h1>
            <hr />
          </div>
          <ToggleButtonGroup value={selectedOption} exclusive onChange={handleSelectOption} aria-label="text alignment" className="options" color="secondary">
            <ToggleButton key="one" value="inProgress" >غير منجز</ToggleButton>
            <ToggleButton key="two" value="done" >منجز</ToggleButton>
            <ToggleButton key="three" value="all" >الكل</ToggleButton>
          </ToggleButtonGroup>
          <div className="tasks">{toDoList}</div>
          <div className="add">
            <Button variant="contained" className="btnTitle" disabled={title ? false : true} style={{ backgroundColor: title ? "var(--primary-dark)" : "var(--primary-light)" }} onClick={() => title ? handleAddNewTask() : AddNewAlert("error", "يجب ان تملأ عنوان المهمة اولاً")}>إضافة</Button>
            <TextField id="outlined-basic" label="عنوان المهمة" value={title} variant="outlined" onChange={(e) => {
              setTitle(e.target.value)
            }} />
          </div>
        </div>
        <WarningComponent warning={warning} handleCloseWarning={handleCloseWarning} handleDeleteTask={handleDeleteTask} />
        <EditTaskComponent editTask={editTask} target={target} handleCloseEditTask={handleCloseEditTask} handleSubmitEditTask={handleSubmitEditTask} />
      </Container>
    </>
  );
}