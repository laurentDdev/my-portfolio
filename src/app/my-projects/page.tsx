
import React, { use } from "react";
import SubTitle from "@/app/components/SubTitle";
import ProjectCard from "@/app/components/ProjectCard";
import { Project } from "@/app/contexts/AdminContext";
import FiltersProjects from "@/app/my-projects/components/FiltersProjects";

export const dynamic = "force-dynamic";

const MyProjectsPage = ({
                            searchParams,
                        }: {
    searchParams: Promise<{ [key: string]: string }>;
}) => {
    const projects: Project[] = use(
        fetch(`${process.env.BETTER_AUTH_URL}/api/project`).then((res) => res.json())
    );

    // Extraction + parsing des filtres depuis l'URL
    const params = use(searchParams);
    const filters =
        params.tags
            ?.split("-")
            .map((tag: string) => parseInt(tag))
            .filter((id) => !isNaN(id)) || [];

    // Application du filtre
    const filteredProjects =
        filters.length > 0
            ? projects.filter((p: Project) =>
                p.tags.some((tag) => filters.includes(tag.id))
            )
            : projects;

    return (
        <section
            className="
        h-full
        md:px-30 px-10 py-5
        relative flex flex-col justify-evenly gap-2
        bg-[var(--background-primary)]
        text-[var(--text-primary)]

      "
        >
            <div className="w-full h-full mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent-color)] mb-3">
                            My Projects
                        </h1>
                        <SubTitle text={"Some technical achievements"} />
                    </div>
                    <FiltersProjects />
                </div>

                {/* Liste des projets */}
                <div
                    className="
            grid
            grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
            gap-6
            mt-8
          "
                >
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project: Project) => (
                            <ProjectCard project={project} key={project.id} />
                        ))
                    ) : (
                        <p className="text-center text-gray-400 col-span-full py-10">
                            Aucun projet ne correspond à ces filtres.
                        </p>
                    )}
                </div>
            </div>

            {/* Overlay esthétique */}
            <div
                className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-t from-[var(--accent-color)]/10 via-transparent to-transparent
        "
            />
        </section>
    );
};

export default MyProjectsPage;
