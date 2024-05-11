'use client'
import Button from '@/components/atoms/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegistrationSchema } from '../../Schema/RegistrationSchema'
import useSignupHook from '@/hooks/useSignupHook';


export default function RegistrationForm() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, } = useForm({
        defaultValues: {
            email: "test@email.com",
            firstName: "abc",
            lastName: "def",
        },
        resolver: zodResolver(RegistrationSchema),
    });

    const { SubmitSignupForm, success } = useSignupHook();

    const onSubmit = async (data) => {

        SubmitSignupForm(data, setError);
    }



    return (
        <div className="form-area">
            <form action="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                <div className="form-fields mb-20">

                    <div className="form-group username">
                        <label htmlFor="firstName">Enter your first name</label>
                        <input {...register("firstName")} type="text" className="form-control" id="firstName" aria-describedby="firstName" placeholder='First Name' autoComplete="name" />
                    </div>

                    {errors.firstName && <div className='error abc'>{errors.firstName.message}</div>}

                    <div className="form-group username">
                        <label htmlFor="lastName">Enter your last name</label>
                        <input {...register("lastName")} type="text" className="form-control" id="lastName" aria-describedby='lastName' placeholder='Last Name' autoComplete='name' />
                    </div>

                    {errors.lastName && <div className='error abc'>{errors.lastName.message}</div>}

                </div>

                <div className="form-group email mb-20">
                    <label htmlFor="forEmail">Enter your email</label>
                    <input {...register("email")} type="text" className="form-control" id="formEmail" aria-describedby='formEmail' placeholder='Enter email here' autoComplete='email' />
                </div>

                {errors.email && <div className='error abc'>{errors.email.message}</div>}

                <div className="form-group phone mb-20">
                    <label htmlFor="formNumber">Phone Number</label>
                    <input {...register("phoneNumber")} type="text" className="form-control" id="formNumber" aria-describedby='formNumber' placeholder='Phone Number' autoComplete='off' />
                </div>

                {errors.phoneNumber && <div className='error abc'>{errors.phoneNumber.message}</div>}

                <div className="form-group password form-field">
                    <label htmlFor="password-field">Enter your password</label>
                    <input {...register("password")} type="password" className="form-control password" id="password-field" placeholder='Enter password here' autoComplete='new-password' />
                    <i className="fa-solid fa-eye-slash"></i>
                </div>

                {errors.password && <div className='error'>{errors.password.message}</div>}

                <Button isSubmitting={success} value={'Regsiter'} />
                {errors.root && <div className='error'>{errors.root.message}</div>}
                {success && <div className='success'>Register Successfully</div>}
            </form>
        </div>

    )
}