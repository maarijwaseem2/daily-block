
import { settingsSchema } from '../../Schema/SettingsSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function SettingsForm({ defaultValues, userId, token }) {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [profilePic, setProfilePic] = useState('/edit-profile-avatar.png');

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, setValue } = useForm({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            firstName: defaultValues.first_name,
            lastName: defaultValues.last_name,
            email: defaultValues.email,
            password: "123456789",
            oldPassword: "123456789",
            newPassword: "098765432",
            confirmPassword: "098765432"
        }
    });


    const onSubmit = async (data) => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            // console.log("this is data", data)

            const response = await fetch(`http://localhost:4000/user/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    role: 'user'
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                toast.success('Changes made Sucessfully', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                const errorResponseData = await response.json();
                throw new Error(errorResponseData);
            }
        }
        catch (error) {
            // setError("root", {
            //     message: "error from root"
            // })
            console.log(error)
        }
    }
    useEffect(() => {
        if (defaultValues) {
            setValue("firstName", defaultValues.first_name)
            setValue("lastName", defaultValues.last_name)
            setValue("email", defaultValues.email)
        }
    }, [defaultValues, register]);


    const handleProfilePic = (e) => setProfilePic(URL.createObjectURL(e.target.files[0]));
    const handleDeleteProfilePic = () => setProfilePic('/black_img.jpg')

    const togglePasswordVisible = () => setPasswordVisible(!passwordVisible)
    const toggleOldPasswordVisible = () => setOldPasswordVisible(!oldPasswordVisible)
    const toggleNewPasswordVisible = () => setNewPasswordVisible(!newPasswordVisible)
    const toggleConfirmPasswordVisible = () => setConfirmPasswordVisible(!confirmPasswordVisible)



    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="settings_row">
                <div className="profile_image">
                    <div className="form_column">
                        <h2>Profile</h2>
                        <p>Update your personal profile details here.</p>
                    </div>
                </div>
                <div className="settings_form">
                    <div className="upload_image">
                        <div className="display_pic">
                            <div className="image_overlay">
                            </div>
                            <Image src={profilePic} id={"profile_pictuce"} alt={"Display Picture"} style={{ layout: '' }} priority={false} height="30" width="30" />
                        </div>
                        <div className="upload_btn">
                            <button className="upload_file btn-outlined">
                                <Image src={"/upload-image.svg"} alt={"Upload"} style={{ layout: '' }} priority={false} height="300" width="300" />
                                Upload New Image
                                <input type="file" name="file-input" id="profile-file-input" onChange={(e) => handleProfilePic(e)} />
                            </button>
                            <button type="button" className="delete_file">
                                <Image src={"/icon-delete.svg"} alt={"Delete Image"} style={{ layout: '' }} priority={false} height="20" width="20" onClick={handleDeleteProfilePic} />
                            </button>
                        </div>
                    </div>
                    <div className="form_fields">
                        <div className="form_column">
                            <label htmlFor="first_name">First Name</label>
                            <input {...register("firstName")} type="text" id="first_name" placeholder="William" />
                            {errors.firstName && <span className="error">Inavlid Name</span>}
                        </div>
                        <div className="form_column">
                            <label htmlFor="last_name">Last Name</label>
                            <input {...register("lastName")} type="text" id="last_name" placeholder="William" />
                            {errors.lastName && <span className="error">Inavlid Name</span>}
                        </div>
                    </div>
                </div>
            </div>



            <div className="settings_row">
                <div className="profile_image">
                    <div className="form_column">
                        <h2>Change Email Address</h2>
                        <p>Update your email address here.</p>
                    </div>
                </div>
                <div className="settings_form">
                    <div className="form_fields">
                        <div className="form_column">
                            <label htmlFor="new_email">New Email</label>
                            <input {...register("email")} type="email" id="new_email" placeholder="example@gmail.com" autoComplete="email" />
                            {errors.email && <span className="error">Invalid Email</span>}
                        </div>
                        <div className="form_column form-field">
                            <label htmlFor="password">Password</label>
                            <div className="input">
                                <input {...register("password")} type={(passwordVisible) ? "text" : "password"} className="password" id="password" placeholder="************" autoComplete="new-password" />
                                <i className={(passwordVisible) ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={togglePasswordVisible}></i>
                            </div>
                            {errors.password && <span className="error">Invalid Password</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings_row">
                <div className="profile_image">
                    <div className="form_column">
                        <h2>Change Password</h2>
                        <p>Set up a new password</p>
                    </div>
                </div>
                <div className="settings_form">
                    <div className="old_password_div">
                        <div className="form_column form-field">
                            <label htmlFor="old_password">Old Password</label>
                            <div className="input">
                                <input {...register("oldPassword")} type={(oldPasswordVisible) ? "text" : "password"} className="password" id="old_password" placeholder="************" />
                                <i className={(oldPasswordVisible) ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={toggleOldPasswordVisible}></i>
                            </div>
                            {errors.oldPassword && <span className="error">Invalid Password</span>}
                        </div>
                        <div className="form_column form-field">
                            <label htmlFor="new_password">New Password</label>
                            <div className="input">
                                <input {...register("newPassword")} type={(newPasswordVisible) ? "text" : "password"} className="password" id="new_password" placeholder="************" />
                                <i className={(newPasswordVisible) ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={toggleNewPasswordVisible}></i>
                            </div>
                            {errors.newPassword && <span className="error">Invalid Password</span>}
                        </div>
                    </div>
                    <div className="new_password_div">
                        <div className="form-field form_column new_password ">
                            <label htmlFor="confirm_new_password">Confirm New Password</label>
                            <div className="input">
                                <input {...register("confirmPassword")} type={(confirmPasswordVisible) ? "text" : "password"} className="password" id="confirm_new_password" placeholder="************" />
                                <i className={(confirmPasswordVisible) ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={toggleConfirmPasswordVisible}></i>
                            </div>
                            {errors.confirmPassword && <span className="error">{errors.ConfirmPassword.message}</span>}
                        </div>
                    </div>
                </div>
            </div>


            <div className="save_changes_div">
                <button type="reset" className="btn-outlined">Cancel</button>
                <button type="submit" className="btn-filled">Save Changes</button>
            </div>
            <ToastContainer />
        </form>
    )
}