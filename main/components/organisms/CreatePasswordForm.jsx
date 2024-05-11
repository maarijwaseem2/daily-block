'use client'
import Button from '../atoms/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {CreatePasswordSchema}from '../../Schema/CreatePasswordSchema'

export default function CreatePasswordForm() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(CreatePasswordSchema),
    });

    const onSubmit = async (data) => {

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log(data)

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

                <div className="form-group password form-field mb-20">
                    <label htmlFor="password-field-1">New Password</label>
                    <input {...register("password")} type="password" className="form-control password" id="password-field-1" placeholder="New Password" autoComplete="new-password" />
                    <i className="fa-solid fa-eye-slash"></i>
                </div>

                {errors.password && <div className="error abc"> {errors.password.message}</div>}

                <div className="form-group password form-field">
                    <label htmlFor="password-field-2">Confirm New Password</label>
                    <input {...register("confirmPassword")} type="password" className="form-control password" id="password-field-2" placeholder="Confirm new Password" autoComplete="new-password" />
                    <i className="fa-solid fa-eye-slash"></i>
                </div>

                {errors.confirmPassword && <div className="error"> {errors.confirmPassword.message}</div>}

                <div className="form-btn">
                    <Button isSubmitting={isSubmitting} value={'Change Password'} />
                    {errors.root && <div className='error'>{errors.root.message}</div>}
                </div>

            </form>
        </div>
    )
}