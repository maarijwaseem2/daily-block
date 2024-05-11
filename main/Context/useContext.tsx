'use client'
import { createContext, useState, useContext } from 'react'
const AppContext = createContext<any>(undefined);
export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {
    const [token, setToken] = useState('');
    const [projectId, setProjectId] = useState('');
    const [userId, setUserId] = useState('');
    const [taskId, setTaskId] = useState('');
    const [defaultValues, setDefaultValues] = useState({
        first_name: "",
        last_name: "",
        email: ""
    })

    return (
        <AppContext.Provider value={{ token, setToken, projectId, setProjectId, userId, setUserId, taskId: setTaskId, defaultValues, setDefaultValues }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}