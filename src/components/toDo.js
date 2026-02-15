import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function ToDo({ task, handleOpenwarning, handleOpenEditTask, handleSetTaskDone }) {

    return (
        <div className="task">
            <div>
                <h2>{task.title}</h2>
                <h4>{task.description}</h4>
            </div>
            <div className="icons">
                <IconButton color="secondary" aria-label="add an alarm" className="icon icon1" onClick={() => { handleOpenwarning(task) }} ><DeleteOutlineIcon /></IconButton>
                <IconButton color="secondary" aria-label="add an alarm" className="icon icon2" onClick={() => { handleOpenEditTask(task) }} ><EditIcon /></IconButton>
                <IconButton color="secondary" aria-label="add an alarm" className={task.state === "done" ? "backLime icon icon3" : "icon icon3"} onClick={() => {handleSetTaskDone(task)}} ><CheckIcon /></IconButton>
            </div>
        </div>
    )
}