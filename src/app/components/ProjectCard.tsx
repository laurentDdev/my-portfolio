"use client";
import React, { useState } from "react";
import { Project } from "@/app/contexts/AdminContext";
import Image from "next/image";
import ActionButton from "@/app/components/ActionButton";
import DynamicIcon from "@/app/components/DynamicIcon";

type Props = {
    project: Project;
    isAdmin?: boolean;
    onSave?: (project: Project) => void;
    onDelete?: (projectId: number) => void;
};

const ProjectCard = ({
                         project: initialProject,
                         isAdmin,
                         onSave,
                         onDelete,
                     }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState(initialProject);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProject(initialProject);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProject(initialProject);
    };

    const handleSave = async () => {
        setIsEditing(false);
        if (onSave) {
            const res = await fetch("/api/project", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedProject),
            });
            const data = await res.json();
            onSave(data);
        }
    };

    const handleDelete = async () => {
        if (
            window.confirm(`Es-tu sûr de vouloir supprimer "${initialProject.name}" ?`)
        ) {
            if (onDelete) {
                const res = await fetch("/api/project", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: initialProject.id }),
                });
                const data = await res.json();
                onDelete(data.id);
            }
        }
    };

    const currentProject = isEditing ? editedProject : initialProject;

    return (
        <div
            className="
        group relative flex flex-col
        bg-[var(--background-secondary)]
        shadow-lg
        overflow-hidden
        transition-all duration-500
        hover:-translate-y-2 hover:shadow-xl
        hover:rotate-[0.3deg]
        w-full
        sm:max-w-sm md:max-w-md
      "
        >
            {/* Image + Overlay */}
            <div className="relative w-full h-56 sm:h-60 overflow-hidden">
                <Image
                    src={currentProject.image as string}
                    fill
                    alt="Image représentant le projet"
                    className="
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
                />
                <div
                    className="
            absolute inset-0
            bg-gradient-to-t from-black/50 via-transparent to-transparent
            opacity-80
          "
                />

                {isAdmin && (
                    <div
                        className="
              absolute top-3 right-3 z-20
              flex gap-2
              backdrop-blur-md bg-white/10
              p-2
              shadow-md
            "
                    >
                        {!isEditing ? (
                            <>
                                <button
                                    onClick={handleEdit}
                                    title="Modifier"
                                    className="
                    text-white hover:text-blue-400 transition
                    text-xl
                  "
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={handleDelete}
                                    title="Supprimer"
                                    className="
                    text-white hover:text-red-400 transition
                    text-xl
                  "
                                >
                                    🗑️
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleSave}
                                    title="Sauvegarder"
                                    className="text-green-400 hover:scale-110 transition text-xl"
                                >
                                    ✅
                                </button>
                                <button
                                    onClick={handleCancel}
                                    title="Annuler"
                                    className="text-gray-300 hover:text-gray-400 transition text-xl"
                                >
                                    ❌
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Contenu */}
            <div className="flex flex-col gap-4 p-5 sm:p-6">
                {/* Nom du projet */}
                {isEditing ? (
                    <input
                        type="text"
                        value={editedProject.name}
                        onChange={(e) =>
                            setEditedProject({ ...editedProject, name: e.target.value })
                        }
                        className="
              w-full text-xl sm:text-2xl font-semibold
              p-3
              border border-blue-400/50
              bg-[var(--background-secondary)]
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
              transition
            "
                    />
                ) : (
                    <h2
                        className="
              text-xl sm:text-2xl font-bold
              text-[var(--text-color-primary)]
              line-clamp-2
            "
                    >
                        {currentProject.name}
                    </h2>
                )}

                {/* Description */}
                {isEditing ? (
                    <textarea
                        value={editedProject.description}
                        onChange={(e) =>
                            setEditedProject({
                                ...editedProject,
                                description: e.target.value,
                            })
                        }
                        className="
              w-full p-3
              border border-blue-400/50
              bg-[var(--background-secondary)]
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
              text-sm sm:text-base
              resize-y
              min-h-[100px]
              transition
            "
                    />
                ) : (
                    <p
                        className="
              text-[var(--text-color-secondary)]
              text-sm sm:text-base
              line-clamp-3
              leading-relaxed
            "
                    >
                        {currentProject.description}
                    </p>
                )}

                {/* Tags */}
                <div
                    className="
            flex flex-wrap gap-2
            overflow-x-auto pb-2
            scrollbar-thin scrollbar-thumb-gray-400/50
          "
                >
                    {currentProject.tags.map((tag) => (
                        <span
                            key={tag.id}
                            style={{ backgroundColor: tag.color }}
                            className="
                flex items-center justify-center gap-1.5 px-3 py-1.5
                text-white text-lg font-semibold
                shadow-sm
                hover:shadow-md hover:scale-105 transition cursor-pointer
              "
                        >
              <DynamicIcon name={tag.icon} />
            </span>
                    ))}
                </div>

                {/* Liens */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    {isEditing ? (
                        <>
                            <input
                                type="url"
                                value={editedProject.demoUrl || ""}
                                onChange={(e) =>
                                    setEditedProject({
                                        ...editedProject,
                                        demoUrl: e.target.value,
                                    })
                                }
                                className="
                  flex-1 p-3
                  border border-blue-400/50
                  bg-[var(--background-secondary)]
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  text-sm transition
                "
                                placeholder="URL de la démo"
                            />
                            <input
                                type="url"
                                value={editedProject.githubUrl || ""}
                                onChange={(e) =>
                                    setEditedProject({
                                        ...editedProject,
                                        githubUrl: e.target.value,
                                    })
                                }
                                className="
                  flex-1 p-3
                  border border-blue-400/50
                  bg-[var(--background-secondary)]
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  text-sm transition
                "
                                placeholder="URL GitHub"
                            />
                        </>
                    ) : (
                        <>
                            {currentProject.demoUrl && (
                                <ActionButton label="Démo" link={currentProject.demoUrl} />
                            )}
                            {currentProject.githubUrl && (
                                <a
                                    href={currentProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                    flex items-center justify-center
                    px-5 py-3
                    bg-white/5 hover:bg-white/10
                    border border-white/10
                    text-[var(--text-color-primary)]
                    font-medium
                    transition
                  "
                                >
                                     GitHub
                                </a>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
