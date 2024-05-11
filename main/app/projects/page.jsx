'use client'
import ProjectList from '@/components/organisms/ProjectList'
import ContentTemplate from '@/components/templates/ContentTemplate'
import WorkspaceTemplate from '@/components/templates/WorkspaceTemplate';
import useProjectsHook from '../../hooks/useProjectsHook'


export default function ProjectManagement() {

    const { projects } = useProjectsHook();

    return (
        <WorkspaceTemplate>
            <ContentTemplate>
                <ProjectList projectHeading={"Project Management"} projects={projects} addProject={true} />
            </ContentTemplate>
        </WorkspaceTemplate>

    )
}