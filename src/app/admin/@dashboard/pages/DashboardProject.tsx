import React, {useContext} from 'react';
import {AdminContext, AdminContextType, Project} from "@/app/contexts/AdminContext";
import ProjectCard from "@/app/components/ProjectCard";

const DashboardProject = () => {

    const {projects, removeProject, updateProject} = useContext(AdminContext) as AdminContextType

    return (
        <section className="
            min-h-screen
           sm:px-6 md:px-8 lg:px-10 xl:px-30


            relative
            bg-[var(--background-primary)]
            text-[var(--text-primary)]
        ">
            <div className="mx-auto">
                <div className="
                    grid
                    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                    gap-4 sm:gap-5
                    mt-8
                ">
                    {projects.map((project: Project) => (
                        <ProjectCard project={project} key={project.id} isAdmin={true} onDelete={removeProject} onSave={updateProject} />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default DashboardProject;