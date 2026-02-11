import "./toDo.css";
import { useContext, useState, useEffect } from "react";
import { ToDoContext } from "./contexts";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToDo() {
  const [toDo, setToDo] = useContext(ToDoContext);
  const [title, setTitle] = useState("")
  const [selectedOption, setSelectedOption] = useState("all")
  const [warning, setWarning] = useState({ opened: false, target: "" });
  const [editTask, setEditTask] = useState({ opened: false, target: "" })

  useEffect(() => {
    localStorage.setItem('toDoData', JSON.stringify(toDo));
  }, [toDo]);

  const buttons = [
    <ToggleButton  key="one" value="inProgress" >غير منجز</ToggleButton>,
    <ToggleButton  key="two" value="done" >منجز</ToggleButton>,
    <ToggleButton  key="three" value="all" >الكل</ToggleButton>,
  ];

  const [alerts, setAlerts] = useState([])

  function handleSelectOption(e) {
    setSelectedOption(() => e.target.value)
  }

  function handleDeleteTask() {
    setToDo((toDo) => {
      return toDo.filter(task => task.id !== warning.target)
    })
    handleClosewarning()
    handleAddNewAlert("success", "تم حذف المهمة بنجاح")
  }

  function handleSetTaskDone(target) {
    setToDo((toDo) => {
      return toDo.map(task => task.id === target ? { ...task, state: task.state === "done" ? "inProgress" : "done" } : task)
    })
    handleAddNewAlert("success", "تم تحديث حاله المهمة بنجاح")
  }

  function handleClickOpenwarning(target) {
    setWarning((warning) => { return { opened: true, target: target } });
  };

  function handleClosewarning() {
    setWarning((warning) => { return { opened: false, target: "" } });
  };

  function handleAddNewTask() {
    setToDo((toDo) => {
      return [...toDo, {
        id: toDo.length > 0 ? toDo[toDo.length - 1].id + 1 : 1,
        title: title,
        description: "",
        state: "inProgress"
      }]
    })
    setTitle((title) => {
      return ""
    })
    handleAddNewAlert("success", "تم اضافة المهمة بنجاح")
  }

  function handleSubmitEditTask(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { title, description } = Object.fromEntries(formData.entries());

    setToDo((toDo) => { return toDo.map((task) => { return editTask.target.id === task.id ? { ...task, title: title, description: description } : task }) })
    handleCloseEditTask();
    handleAddNewAlert("success", "تم تعديل المهمة بنجاح")
  };

  function handleClickOpenEditTask(target) {
    setEditTask((editTask) => { return { opened: true, target: target } })
  }

  function handleCloseEditTask() {
    setEditTask((warning) => { return { opened: false, target: "" } });
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handleAddNewAlert(type, message) {
    let id = alerts.length ? alerts[alerts.length - 1].id + 1 : 1;
    setAlerts((alerts) => { return [...alerts, { id: id, type: type, message: message }] })
    await sleep(5000)
    setAlerts((alerts) => { return alerts.filter((alert) => { return alert.id !== id }) })
  }

  let toDoList = [];
  if (toDo.length > 0) {
    if (selectedOption !== "all") {
      toDoList = toDo.filter(task => task.state === selectedOption)
    } else {
      toDoList = [...toDo]
    }

    toDoList = toDoList.map((task) => {
      return (
        <div key={task.id} className="task">
          <div>
            <h2>{task.title}</h2>
            <h4>{task.description}</h4>
          </div>
          <div className="icons">
            <IconButton color="secondary" aria-label="add an alarm" className="icon icon1" onClick={() => { handleClickOpenwarning(task.id) }} ><DeleteOutlineIcon /></IconButton>
            <IconButton color="secondary" aria-label="add an alarm" className="icon icon2" onClick={() => { handleClickOpenEditTask(task) }} ><EditIcon /></IconButton>
            <IconButton color="secondary" aria-label="add an alarm" className={task.state === "done" ? "backLime icon icon3" : "icon icon3"} onClick={() => { handleSetTaskDone(task.id) }} ><CheckIcon /></IconButton>
          </div>
        </div>
      );
    });
  }

  if (toDoList.length === 0) {
    toDoList = <div className="noTasks">لا يوجد مهام</div>
  }

  let alertsList = alerts.map((alert) => {
    return (
      <Alert className="alert" key={alert.id} severity={alert.type}>{alert.message}</Alert>
    )
  })

  const warningComponent = (
    <Dialog
      open={warning.opened}
      onClose={handleClosewarning}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ direction: "rtl" }}
    >
      <DialogTitle id="alert-dialog-title" className="warning">
        هل أنت متأكد من رغبتك في حذف المهمة؟
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          لا يمكنك التراجع عن الحذف في حال اختيار زر (حذف)
        </DialogContentText>
      </DialogContent>
      <DialogActions className="warningbtns">
        <Button onClick={handleClosewarning}>إغلاق</Button>
        <Button onClick={handleDeleteTask}>
          نعم. قم بالحذف
        </Button>
      </DialogActions>
    </Dialog>)

  const editTaskComponent = (
    <Dialog open={editTask.opened} onClose={handleCloseEditTask} style={{ direction: "rtl" }}>
      <DialogTitle>تعديل المهمة</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitEditTask} id="subscription-form">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="title"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={editTask.target.title}
            className="editTask"
          />
          <TextField
            margin="dense"
            id="name"
            name="description"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={editTask.target.description}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditTask}>إلغاء</Button>
        <Button type="submit" form="subscription-form">
          تعديل
        </Button>
      </DialogActions>
    </Dialog>)

  return (
    <>
      <Container maxWidth="sm">
        <div className="box">
          <div className="title">
            <h1>مهامي</h1>
            <hr />
          </div>
          <ToggleButtonGroup
            value={selectedOption}
            exclusive
            onChange={handleSelectOption}
            aria-label="text alignment"
            className="options"
            color="secondary"
          >
            {buttons}
          </ToggleButtonGroup>
          <div className="tasks">{toDoList}</div>
          <div className="add">
            <Button variant="contained" className="btnTitle" style={{backgroundColor: title? "var(--primary-dark)" : "var(--primary-light)"}} onClick={() => title? handleAddNewTask() : handleAddNewAlert("error", "يجب ان تملأ عنوان المهمة اولاً")}>إضافة</Button>
            <TextField id="outlined-basic" label="عنوان المهمة" value={title} variant="outlined" onChange={(e) => {
              setTitle(e.target.value)
            }} />
          </div>
        </div>
        {warningComponent}
        {editTaskComponent}
      </Container>
      <div className="alerts">
        {alertsList}
      </div>
    </>
  );
}