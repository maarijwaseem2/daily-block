'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '@/Context/useContext'


export default function ProjectPreview({ item }) {
    const { projectId, setProjectId  } = useAppContext();


    const abc = () => {
        setProjectId(item.id)
        console.log("projectId is: ", projectId);
    }
    const startDate = item.start_date.slice(0, 10)
    const endDate = item.end_date.slice(0, 10)
    return (
        <Link href='project-details' className="project-single" onClick={abc}>
            <div className="project-img">
                <Image src={`/${item.upload_cover_image}`} alt={''} style={{ layout: '' }} priority={false} height="300" width="300"></Image>
            </div>

            <div className="project-text">
                <span className="category">{item.category}</span>
                <div className="title">
                    <h3>{item.project_name}</h3>
                </div>
            </div>
            <div className="project-footer">
                <p>Start Date: <span>{startDate}</span></p>
                <p>End Date: <span>{endDate}</span></p>
            </div>
        </Link>
    )
}