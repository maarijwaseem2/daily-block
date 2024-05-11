'use client'
import RememberCheck from '../molecules/RememberCheck'
import Button from '../atoms/Button'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '../../Schema/loginSchema'
import useLoginHook from '@/hooks/useLoginHook'
import { useState } from 'react'

export default function LoginForm() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, } = useForm({
        defaultValues: {
            email: "test@email.com"
        },
        resolver: zodResolver(LoginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const { SubmitLoginForm, success } = useLoginHook();


    const onSubmit = async (data) => {
        SubmitLoginForm(data, setError)
    }

    return (
        <div className="form-area">

            <form action="" autoComplete='off' onSubmit={handleSubmit(onSubmit)} >

                <div className="form-group email mb-20">
                    <label htmlFor="formEmail">Enter your Email</label>
                    <input {...register("email")} type="email" className="form-control" id="formEmail" aria-describedby='formEmail' placeholder='Enter your email here' autoComplete='email' />
                </div>

                {errors.email && <div className='error abc'>{errors.email.message}</div>}

                <div className="form-group password form-field">
                    <label htmlFor="password-field">Enter your Password</label>
                    <input {...register("password")} type={showPassword ? "text" : "password"} className="form-control password" id="password-field" aria-describedby='' placeholder='Enter your password here' autoComplete='password' />
                    <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={togglePasswordVisibility}></i>
                </div>

                {errors.password && <div className='error'>{errors.password.message}</div>}

                <div className="register-action">
                    <RememberCheck />
                    <div className="forget-password">
                        <Link href='/forgetpassword'>{'Forget Password?'}</Link>
                    </div>
                </div>

                <Button isSubmitting={success} value={'Login'} />
                {errors.root && <div className='error'>{errors.root.message}</div>}
                {success && <div className='success'>Login Successfully</div>}


            </form>

        </div>

    )
}
