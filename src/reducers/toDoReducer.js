export default function ToDoReducer(toDo, action) {
    const { type, payload } = action;
    switch (type) {
        case "AddNewTask": {
            return [
                ...toDo,
                {
                    id: toDo.length > 0 ? toDo[toDo.length - 1].id + 1 : 1,
                    title: payload.title,
                    description: "",
                    state: "inProgress",
                },
            ];
        }

        case "setTaskDone": {
            return toDo.map((task) =>
                task.id === payload.target.id
                    ? { ...task, state: task.state === "done" ? "inProgress" : "done" }
                    : task,
            );
        }

        case "deleteTask": {
            return toDo.filter((task) => task.id !== payload.target.id);
        }

        case "editTask": {
            payload.event.preventDefault();
            const { title, description } = Object.fromEntries(payload.formData.entries());

            return toDo.map((task) => {
                return task.id === payload.target.id
                    ? { ...task, title: title, description: description }
                    : task;
            });
        }

        default: {
            console.log("you spelled it wrong");
        }
    }
}
