'use client'
import Button from '../atoms/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {ForgetPasswordSchema}from '../../Schema/ForgetPasswordSchema'




export default function ForgetPasswordForm() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(ForgetPasswordSchema),
    });

    const onSubmit = async (data) => {

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // console.log(data)

        }
        catch (error) {
            setError("root", {
                message: "Error from server"
            })
        }
    }

    
    return (
        <div className="form-area">
            <form action="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group email mb-20">

                        <label htmlFor="formEmail">Enter your email</label>
                        <input {...register("email")}  type="text" className="form-control" id="formEmail" aria-describedby='formEmail' placeholder='Enter your email here' autoComplete="email"/>
               
                </div>

                {errors.email && <div className='error abc'>{errors.email.message}</div>}
                
                <Button isSubmitting={isSubmitting} value={'Reset Password'} />
                {errors.root && <div className='error'>{errors.root.message}</div>}
            </form>
        </div>

    )
}