import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useSignupHook = () => {
    const router = useRouter();
    const [success, setsuccess] = useState(false)
    const SubmitSignupForm = async (data, setError) => {
        try {
            const response = await fetch('http://localhost:4000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    password: data.password,
                    role: 'user'
                })
            });

            if (response.ok) {
                
                const responseData = await response.json();
                setsuccess(true);
                router.push('/login');
            }
            else if (response.status === 500) {
                throw new Error('User already exist')
            }
            else {
                throw new Error('failed to signup')
            }
        }
        catch (error) {
            setError("root", {
                message: error.message
            })

        }
    }
    return { SubmitSignupForm, success }
};
export default useSignupHook;