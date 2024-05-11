'use client'
import WorkspaceTemplate from "@/components/templates/WorkspaceTemplate"
import SettingsForm from '../../components/organisms/SettingsForm'
import { useAppContext } from '@/Context/useContext'
import { useEffect, useState } from 'react'

export default function Settings() {
    const { userId, token, defaultValues, setDefaultValues } = useAppContext();


    const handleInit = async () => {
        try {
            const response = await fetch(`http://localhost:4000/user/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                setDefaultValues(responseData.data)
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
        handleInit();
    }, [])
    return (
        <WorkspaceTemplate>

            <div className="content-head">
                <div>
                    <h1>Profile Settings</h1>
                </div>
            </div>
            <div className="content-body">
                <div className="settings_wrap card-bg">
                    <SettingsForm defaultValues={defaultValues} userId={userId} token={token} />
                </div>
            </div>


        </WorkspaceTemplate>
    )
}