'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/Context/useContext'


const useProjectsHook = () => {
    
    const [projects, setProjects] = useState([])
    const { token } = useAppContext();
    const getProjects = async () => {
        try {
            const response = await fetch('http://localhost:4000/project/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                setProjects(responseData.data)
            }
            else {
                const errorResponseData = await response.json();
                throw new Error(errorResponseData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProjects();
    }, [])
    return { projects }
};
export default useProjectsHook;