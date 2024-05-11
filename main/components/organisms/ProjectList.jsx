import ProjectPreview from '../molecules/ProjectPreview'
import Link from 'next/link'
import Image from 'next/image'


export default function ProjectList({ projectHeading, projects, addProject }) {

    return (
        <div className="projects-wrap">
            <div className="projects-head">
                <h2>{projectHeading}</h2>
            </div>
            <div className="projects-list">
                {(projects.length !== 0) && projects.map((item, index) => (
                    item && <ProjectPreview item={item} key={index} />
                ))}

                {addProject && <Link href="/add-project" className="add-new-project">
                    <h3>Add New <br /> Project</h3>
                    <div className="add-new-project-btn">
                        <Image src={'/add-icon.svg'} alt={''} style={{ layout: '' }} priority={false} height="50" width="50"></Image>
                    </div>
                </Link>}
            </div>
        </div>
    )
}