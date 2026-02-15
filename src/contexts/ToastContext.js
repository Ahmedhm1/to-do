import { createContext, useContext, useState } from "react";
import Alert from '@mui/material/Alert';

const ToastContext = createContext([])

export function ToastProvider({ children }) {
    const [alerts, setAlerts] = useState([])

    function AddNewAlert(type, message) {
        let id = alerts.length ? alerts[alerts.length - 1].id + 1 : 1;
        setAlerts(alerts => [...alerts, { id: id, type: type, message: message }])

        setTimeout(() => {
            setAlerts(alerts => alerts.filter(alert => alert.id !== id))
        }, 5000)
    }

    let alertsList = alerts.map((alert) => {
        return (
            <Alert className="alert" key={alert.id} severity={alert.type}>{alert.message}</Alert>
        )
    });

    return (
        <ToastContext.Provider value={AddNewAlert}>
            <div className="alerts">
                {alertsList}
            </div>
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    return useContext(ToastContext)
}