import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

export function WarningComponent({ warning, handleCloseWarning, handleDeleteTask }) {
    return (
        <Dialog
            open={warning}
            onClose={handleCloseWarning}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ direction: "rtl" }}
        >
            <DialogTitle id="alert-dialog-title" className="warningTitle">
                هل أنت متأكد من رغبتك في حذف المهمة؟
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="warningDetails">
                    لا يمكنك التراجع عن الحذف في حال اختيار زر (حذف)
                </DialogContentText>
            </DialogContent>
            <DialogActions className="warningbtns">
                <Button onClick={handleCloseWarning}>إغلاق</Button>
                <Button onClick={handleDeleteTask}>
                    نعم. قم بالحذف
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export function EditTaskComponent({ editTask, target, handleCloseEditTask, handleSubmitEditTask }) {
    return (
    <Dialog open={editTask} onClose={handleCloseEditTask} style={{ direction: "rtl" }}>
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
                    defaultValue={target.title}
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
                    defaultValue={target.description}
                />
            </form>
        </DialogContent>
        <DialogActions className="editTaskbtns">
            <Button onClick={handleCloseEditTask}>إلغاء</Button>
            <Button type="submit" form="subscription-form">
                تعديل
            </Button>
        </DialogActions>
    </Dialog>
    )
}