import ProjectList from '@/components/organisms/ProjectList'
import ContentTemplate from '@/components/templates/ContentTemplate'
import WorkspaceTemplate from '@/components/templates/WorkspaceTemplate'

export default function Dashboard() {
    const completedProjects = [
        {
            id: 1,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-1.png"

        },
        {
            id: 2,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-2.png"
        },
        {
            id: 3,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-3.png"

        },
    ]
    const upcomingProjects = [
        {
            id: 1,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-6.png"
        },
        {
            id: 2,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-4.png"
        },
    ]
    const activeProjects = [
        {
            id: 1,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-4.png"
        },
        {
            id: 2,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-5.png"
        },

        {
            id: 3,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-6.png"
        },
        {
            id: 4,
            project_name: "Dsa Management",
            category: "Jupiter Space",
            start_date: "2024-11-01",
            end_date: "2024-11-03",
            upload_cover_image: "project-img-1.png"
        }
    ]
    return (
        <WorkspaceTemplate>
            <ContentTemplate>
                <ProjectList projectHeading={"Completed Projects"} projects={completedProjects} addProject={false} />
                <ProjectList projectHeading={"Upcoming Projects"} projects={activeProjects} addProject={false} />
                <ProjectList projectHeading={"Active Projects"} projects={upcomingProjects} addProject={false} />
            </ContentTemplate>
        </WorkspaceTemplate>
    )
}