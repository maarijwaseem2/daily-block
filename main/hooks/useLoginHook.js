'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/Context/useContext'
const useLoginHook = () => {
    const { token, setToken, setUserId } = useAppContext();
    const router = useRouter();
    const [success, setsuccess] = useState(false)
    const SubmitLoginForm = async (data, setError) => {
        try {
            const response = await fetch('http://localhost:4000/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem('isLoggedIn', 'true');
                setsuccess(true);
                console.log(responseData.data.token)
                setToken(responseData.data.token)
                setUserId(responseData.data.id)
                router.push('/dashboard');
            }
            else if (response.status === 401) {
                throw new Error("invalid credentials")
            }
            else {
                throw new Error("failed to sign in")
            }

        }
        catch (error) {
            setError("root", {
                message: error.message
            })
        }
    }
    return { SubmitLoginForm, success }

};

export default useLoginHook;