'use client'

import { useAppContext } from '@/Context/useContext'
import { useEffect, useState } from 'react'

const useProjectDetailsHook = () => {
    const [projectDetails, setProjectDetails] = useState({})
    const { token, projectId } = useAppContext();
    const getProject = async () => {
        try {
            const response = await fetch(`http://localhost:4000/project/${projectId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                const updatedProjectDetails = {
                    ...responseData.data,
                    start_date: responseData.data.start_date.slice(0, 10),
                    end_date: responseData.data.end_date.slice(0, 10),
                };
                setProjectDetails(updatedProjectDetails)


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
        getProject();
    }, [])

    return { projectDetails }
}

export default useProjectDetailsHook;