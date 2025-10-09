import React, {use} from 'react';
import SubTitle from "@/app/components/SubTitle";
import ProjectCard from "@/app/components/ProjectCard";
import {Project} from "@/app/contexts/AdminContext";

const MyProjectsPage = () => {
    const projects = use(fetch("http://localhost:3000/api/project").then((res) => res.json()));

    return (
        <section className="
            h-full
            md:px-30 px-10 py-5
        relative flex flex-col justify-evenly gap-2

        bg-[var(--background-primary)]
        text-[var(--text-primary)]
      ">
            <div className="w-full mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent-color)] mb-5">
                    My Projects
                </h1>
                <SubTitle text={"Some technical achievements"}/>
                <div className="
                    grid
                    grid-cols-1 md:grid-cols-2 xl:grid-cols-4
                    gap-4 sm:gap-5
                    mt-8
                ">
                    {projects.map((project: Project) => (
                        <ProjectCard project={project} key={project.id}/>
                    ))}
                </div>
            </div>
            <div className="
                absolute inset-0 pointer-events-none
                bg-gradient-to-t from-[var(--accent-color)]/10 via-transparent to-transparent
            "/>
        </section>
    );
};

export default MyProjectsPage;
