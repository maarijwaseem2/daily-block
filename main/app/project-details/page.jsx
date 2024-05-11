'use client'
import Image from 'next/image'
import Link from 'next/link'
import WorkspaceTemplate from '@/components/templates/WorkspaceTemplate'
import BackArrow from '../../components/molecules/BackArrow'
import useProjectDetailsHook from '../../hooks/useProjectDetailsHook'

export default function ProjectDetails() {
    
    const { projectDetails } = useProjectDetailsHook();

    return (
        <WorkspaceTemplate>

            <div className="content-head">
                <BackArrow />
            </div>
            <div className="content-body">
                <div className="project-details-wrap card-bg">
                    <div className="project-details">
                        <div className="details-img">
                            <Image src={`/${projectDetails.upload_cover_image}`} width={300} height={300} alt={''} style={{ layout: '' }} priority={false}></Image>
                        </div>
                    </div>
                    <div className="project-description">
                        <h2>{projectDetails.project_name}</h2>
                        <p>Lorem ipsum dolor sit amet consectetur.
                            A enim eget tempor faucibus arcu ut sit turpis odio.
                            Tellus quis enim id diam faucibus pellentesque posuere.
                            Mauris neque rhoncus euismod odio turpis sit.
                            Lorem ipsum dolor sit amet consectetur.
                            A enim eget tempor faucibus arcu ut sit turpis odio.
                            Tellus quis enim id diam faucibus pellentesque posuere
                            . Mauris neque rhoncus euismod odio turpis sit.</p>
                    </div>
                    <div className="project-info">
                        <div className="project-inner-head">
                            <Image src={'/description-icon.svg'} alt={''} style={{ layout: '' }} priority={false} height="40" width="40"></Image>
                            <h4>Description</h4>
                        </div>
                        <div className="project-info-list">
                            <ul>
                                <li><p>Category:</p><span>{projectDetails.category}</span></li>
                                <li><p>Start Date:</p><span>{projectDetails.start_date}</span></li>
                                <li><p>End Date:</p><span>{projectDetails.end_date}</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="project-review">
                        <div className="project-inner-head">
                            <Image src={'/description-icon.svg'} alt={''} style={{ layout: '' }} priority={false} height="40" width="40"></Image>
                            <h4>Tasks</h4>
                        </div>
                        {/* <div className="task-detail-list">
                            {project.projectTask.length !== 0 && project.projectTask.map((item, index) => (
                                <div className="task-single" key={index}>
                                    <div>
                                        <h3>Task Name</h3>
                                        <p>{item.taskName}</p>
                                    </div>
                                    <div>
                                        <h3>Link</h3>
                                        <Link href={item.taskUrl} className="btn-filled">Visit Website</Link>
                                    </div>
                                    <div>
                                        <h3>Description</h3>
                                        <p>{item.taskDescription}</p>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>

        </WorkspaceTemplate>
    )
}