import WorkspaceTemplate from '@/components/templates/WorkspaceTemplate'
import Link from 'next/link'
import Image from 'next/image'
import AddProjectForm from '../../components/organisms/AddProjectForm'
export default function AddNewProject() {

  return (
    <WorkspaceTemplate>
      <div className="content-head">
        <div>
          <Link href="/projects" ><Image src={'/line-arrow-left.svg'} alt={''} style={{ layout: '' }} priority={false} height="20" width="20" /></Link>
          <h1>Project Management</h1>
        </div>
      </div>
      <div className="content-body">
        <div className="project_management_wrap card-bg">
          <div className="project_management_heading">
            <h2>Publish Project</h2>
          </div>
          <div className="project_management_form">
            <AddProjectForm />
          </div>
        </div>
      </div>
    </WorkspaceTemplate>
  )
}