'use client'
import { addProjectSchema, projectCategories } from '../../Schema/AddprojectSchema'
import AddTask from '../organisms/AddTask'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/Context/useContext'



export default function AddProjectForm() {
    const { token, setToken, setProjectId } = useAppContext();

    const router = useRouter();
    const { register, handleSubmit, setError, setValue, getValues, formState: { errors, isSubmitting }, watch, data, reset, control } = useForm({
        resolver: zodResolver(addProjectSchema),
    });

    let image = watch("projectImage")


    const submitAddProjectForm = async (data) => {

        try {
            const formData = new FormData();
            formData.append('project_name', data.projectName);
            formData.append('category', data.projectCategory);
            formData.append('start_date', data.startingDate);
            formData.append('end_date', data.endingDate);
            formData.append('upload_cover_image', data.projectImage[0]);
            const response = await fetch('http://localhost:4000/project', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (response.ok) {
                const responseData = await response.json();
                await setProjectId(responseData.data.id)
                toast.success('Project Added Sucessfully', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(responseData)
                router.push('/projects');

            }
            else {
                const errorResponseData = await response.json();
                throw new Error(errorResponseData);
            }
        }
        catch (error) {
            console.log(error);
            setError("root", {
                message: error.message
            })
        }
    }

    const onSubmit = async (data) => {
        await submitAddProjectForm(data);
    }

    const handleimageDelete = (e) => {
        setValue("projectImage", undefined);
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} >

            <div className="form_div">

                <div className="form_row">

                    <div className="form_column">
                        <label htmlFor="project_name">project Name</label>
                        <input {...register("projectName")} type="text" id="project_name"
                            placeholder="Project name" />
                        {errors.ProjectName && <div className="error">Invalid Project Name</div>}
                    </div>


                    <div className="form_column">
                        <label htmlFor="category">Category</label>
                        <div className="select">
                            <select {...register('projectCategory')} id="category">
                                <option value="" disabled>Select Category</option>
                                {Object.values(projectCategories).map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        {errors.projectCategory && <div className='error'>Inavlid Category</div>}
                    </div>

                </div>

                <div className="form_row">

                    <div className="form_column">
                        <label htmlFor="start_date">Start Date</label>
                        <div className="select_date">
                            <input {...register("startingDate")} type="date" id="start_date"
                                placeholder="Select Date" />
                        </div>
                        {errors.startingDate && <div className="error">Invalid StartingDate</div>}
                    </div>


                    <div className="form_column">
                        <label htmlFor="end_date">End Date</label>
                        <div className="end_date">
                            <input {...register("endingDate")} type="date" id="end_date"
                                placeholder="End Date" />
                        </div>
                        {errors.endingDate && <div className="error">Invalid Ending Date</div>}
                    </div>


                </div>



            </div>

            {/* add cover */}

            <div className="project_management_cover">
                <div className="project_management_heading">
                    <h2>Upload Cover Image</h2>
                </div>

                <div className="cover_image_container">
                    <label htmlFor="input_file" id="drop_area">
                        <input {...register("projectImage")} type="file" accept="image/*" id="input_file" />
                        <div className="img_view" id="img_view">
                            <Image src={'/upload-cover.svg'} alt={''} style={{ layout: '' }} priority={false} height="80" width="80" />
                            <div className="img_details">
                                <h3>Drop your image here, or <span>browse</span></h3>
                                <p>Supports: PNG, JPG, JPEG. Maximum upload file size: 5 MB
                                </p>
                            </div>
                        </div>
                    </label>
                    {(errors.projectImage) && <div className="error">Please Select an Image</div>}
                </div>



                {image && <div className="img_result" style={(image) ? { display: "flex" } : { display: "none" }}>
                    <div className="uploaded_img" id="uploaded_img">
                        <Image src={image?.[0] ? URL.createObjectURL(image[0]) : ''} alt={''} style={{ layout: '' }} priority={false} height="80" width="200" ></Image>
                    </div>
                    <div className="uploaded_img_name">
                        <p id="img_name">{image?.[0]?.name}</p>
                    </div>
                    <Image src={'/icon-delete.svg'} className="delete_img" alt={'Delete task'} style={{ layout: '', marginLeft: '300px', cursor: 'pointer' }} priority={false} height="30" width="30" onClick={handleimageDelete} />
                </div>}


            </div>


            {/* add tasks */}
            <AddTask register={register} getValues={getValues} setValue={setValue} control={control} />


            <div className="publish_buttons">
                <button type="reset" className="btn-outlined">Cancel</button>
                <button type="submit" className="btn-filled">Publish</button>
            </div>

            <ToastContainer />
        </form>

    )
}


