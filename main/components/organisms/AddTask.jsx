import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '@/Context/useContext'

export default function AddTask({ register, getValues, setValue, control }) {
    const { token, setTaskId } = useAppContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tasks"
    });
    const submitAddTaskForm = async (data) => {

        try {
            const formData = new FormData();
            formData.append('task_name', data.taskName);
            formData.append('link', data.taskUrl);
            formData.append('description', data.taskDescription);
            const response = await fetch('http://localhost:4000/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    task_name: data.taskName,
                    link: data.taskUrl,
                    description: data.taskDescription
                })
            });
            if (response.ok) {
                const responseData = await response.json();
                await setTaskId(responseData.data.id)
                toast.success('Task Added Sucessfully', {
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
                router.push('/task');
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
    const handleSubmit = () => {
        const newTask = {
            taskName: getValues("taskName"),
            taskUrl: getValues("taskUrl"),
            taskDescription: getValues("taskDescription")
        };
        
        if (!newTask.taskName || !newTask.taskUrl) {
            toast.error('Invalid Inputs!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setValue("taskName", '')
            setValue("taskUrl", '')
            setValue("taskDescription", '')
            return;
        }

        append(newTask);
        toast.success('Task Added Successfully', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        console.log(fields)
        setValue("taskName", '')
        setValue("taskUrl", '')
        setValue("taskDescription", '')
    };

    const handleDelete = (index) => {
        remove(index);
    };


    const handleEdit = (index) => {
        const editObject = fields[index];
        remove(index);
        setValue("taskName", editObject.taskName);
        setValue("taskUrl", editObject.taskUrl);
        setValue("taskDescription", editObject.taskDescription);
    };

    return (
        <>
            <div className="project_management_add_task">
                <div className="project_management_heading">
                    <h2>Add Task</h2>
                </div>
                <div className="add_task_input">
                    <div className="form_row">
                        <div className="form_column">
                            <label htmlFor="task_name">Task Name</label>
                            <input {...register("taskName")} type="text" id="task_name" placeholder="Task 1" />
                        </div>
                        <div className="form_column">
                            <label htmlFor="link">Link</label>
                            <div className="copy_link">
                                <input {...register("taskUrl")} type="text" id="link" placeholder="https://twitter.com/cryptocomt" />
                                <Image src={"/copy-link.svg"} alt={'abc'} style={{ layout: '' }} priority={false} height="20" width="20" />
                            </div>
                        </div>
                    </div>
                    <div className="form_row">
                        <div className="form_column" id="text_area">
                            <label htmlFor="task_description">Description</label>
                            <textarea {...register("taskDescription")} placeholder="Enter Here.." id="task_description" ></textarea>
                        </div>
                    </div>
                    <div className="task_btn">
                        <div className="show_message">
                            <button type="button" className="btn-filled-black" id="add_task_btn" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="task_container">
                <div className="project_management_heading py-2">
                    <h2 id="add_task_heading">{fields.length > 0 ? 'Added Tasks' : 'No Task Added'}</h2>
                </div>
                <ul className="list_container">
                    {fields.map((item, index) => (
                        <li key={index}>
                            <div className="task_head">
                                <h3>{item.taskName}</h3>
                                <div className="task_delete">
                                    <Image src={'/edit-task.svg'} className="edit_img" alt={'Edit task'} style={{ layout: '' }} priority={false} height="20" width="20" onClick={() => handleEdit(index)} />
                                    <Image src={'/icon-delete.svg'} className="delete_img" alt={'Delete task'} style={{ layout: '' }} priority={false} height="20" width="20" onClick={() => handleDelete(index)} />
                                </div>
                            </div>
                            <div className="task_link">
                                <Link href={item.taskUrl} target="_blank">
                                    <Image src={'/copy-link.svg'} alt={'Delete task'} style={{ layout: '' }} priority={false} height="20" width="20" />
                                    {item.taskUrl}
                                </Link>
                            </div>
                            <div className="task_content">
                                <p>{item.taskDescription}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                
            </div>
        </>
    );
}

