"use client";
import React, { useState } from 'react';
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

const ProjectCard = ({ project: initialProject, isAdmin, onSave, onDelete }: Props) => {
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

    const handleSave = () => {
        setIsEditing(false);
        if (onSave) {
            fetch('/api/project', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedProject),
            })
                .then(res => res.json())
                .then(onSave);
        }
    };

    const handleDelete = () => {
        if (window.confirm(`Es-tu sûr de vouloir supprimer le projet "${initialProject.name}" ?`)) {
            if (onDelete) {
                fetch('/api/project', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: initialProject.id }),
                })
                    .then(res => res.json())
                    .then((response) => onDelete(response.id));
            }
        }
    };

    const currentProject = isEditing ? editedProject : initialProject;

    return (
        <div className="
            group
            relative
            w-full
            bg-[var(--background-secondary)]
            overflow-hidden
            transition-all
            duration-300
            hover:-translate-y-1

        ">
            {/* Boutons admin - Repositionnés pour un meilleur UX */}
            {isAdmin && (
                <div className="absolute top-3 right-3 flex gap-2 z-20">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={handleEdit}
                                title="Modifier le projet"
                                className="
                                    w-10
                                    h-10
                                    flex
                                    items-center
                                    justify-center
                                    bg-blue-600/95
                                    backdrop-blur-sm
                                    hover:bg-blue-600
                                    rounded-xl
                                    text-white
                                    transition-all
                                    duration-200
                                    hover:scale-110
                                    shadow-lg
                                    hover:shadow-blue-500/50
                                "
                            >
                                ✏️
                            </button>
                            <button
                                onClick={handleDelete}
                                title="Supprimer le projet"
                                className="
                                    w-10
                                    h-10
                                    flex
                                    items-center
                                    justify-center
                                    bg-red-600/95
                                    backdrop-blur-sm
                                    hover:bg-red-600
                                    rounded-xl
                                    text-white
                                    transition-all
                                    duration-200
                                    hover:scale-110
                                    shadow-lg
                                    hover:shadow-red-500/50
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
                                className="
                                    w-10
                                    h-10
                                    flex
                                    items-center
                                    justify-center
                                    bg-green-600/95
                                    backdrop-blur-sm
                                    hover:bg-green-600
                                    rounded-xl
                                    text-white
                                    transition-all
                                    duration-200
                                    hover:scale-110
                                    shadow-lg
                                    hover:shadow-green-500/50
                                "
                            >
                                ✅
                            </button>
                            <button
                                onClick={handleCancel}
                                title="Annuler"
                                className="
                                    w-10
                                    h-10
                                    flex
                                    items-center
                                    justify-center
                                    bg-gray-600/95
                                    backdrop-blur-sm
                                    hover:bg-gray-600
                                    rounded-xl
                                    text-white
                                    transition-all
                                    duration-200
                                    hover:scale-110
                                    shadow-lg
                                "
                            >
                                ❌
                            </button>
                        </>
                    )}
                </div>
            )}
            <div className="relative w-full h-52 sm:h-56 md:h-60 overflow-hidden">
                <Image
                    src={currentProject.image as string}
                    fill
                    alt="Image représentant le projet"
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />
                <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/40
                    via-transparent
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                "></div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col gap-4">
                {/* Titre */}
                {isEditing ? (
                    <input
                        type="text"
                        value={editedProject.name}
                        onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                        className="
                            w-full
                            text-xl
                            sm:text-2xl
                            font-bold
                            p-3
                            border-2
                            border-blue-400/50
                            rounded-xl
                            bg-[var(--background-secondary)]
                            focus:border-blue-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            transition-all
                        "
                        placeholder="Nom du projet"
                    />
                ) : (
                    <h2 className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        text-[var(--text-color-primary)]
                        line-clamp-2
                    ">
                        {currentProject.name}
                    </h2>
                )}
                {isEditing ? (
                    <textarea
                        value={editedProject.description}
                        onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                        className="
                            w-full
                            p-3
                            border-2
                            border-blue-400/50
                            rounded-xl
                            bg-[var(--background-secondary)]
                            focus:border-blue-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            min-h-24
                            resize-y
                            transition-all
                            text-sm
                            sm:text-base
                        "
                        placeholder="Description du projet"
                        rows={4}
                    />
                ) : (
                    <p className="
                        text-[var(--text-color-secondary)]
                        text-sm
                        sm:text-base
                        leading-relaxed
                        line-clamp-3
                    ">
                        {currentProject.description}
                    </p>
                )}
                <div className="
                    flex
                    gap-2
                    overflow-x-auto
                    pb-2
                    scrollbar-thin
                    scrollbar-thumb-gray-400/50
                    scrollbar-track-transparent
                    hover:scrollbar-thumb-gray-400
                ">
                    {currentProject.tags.map((tag) => (
                        <span
                            key={tag.id}
                            style={{ backgroundColor: tag.color }}
                            className="
                                px-3
                                py-1.5
                                flex
                                items-center
                                gap-1.5
                                font-bold
                                text-2xl
                                whitespace-nowrap
                                shadow-sm
                                hover:shadow-md
                                transition-shadow
                                duration-200
                            "
                        >
                            <DynamicIcon name={tag.icon} />
                        </span>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    {isEditing ? (
                        <>
                            <input
                                type="url"
                                value={editedProject.demoUrl || ''}
                                onChange={(e) => setEditedProject({ ...editedProject, demoUrl: e.target.value })}
                                className="
                                    flex-1
                                    p-3
                                    border-2
                                    border-blue-400/50
                                    rounded-xl
                                    bg-[var(--background-secondary)]
                                    focus:border-blue-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                    text-sm
                                    transition-all
                                "
                                placeholder="URL de la démo"
                            />
                            <input
                                type="url"
                                value={editedProject.githubUrl || ''}
                                onChange={(e) => setEditedProject({ ...editedProject, githubUrl: e.target.value })}
                                className="
                                    flex-1
                                    p-3
                                    border-2
                                    border-blue-400/50
                                    rounded-xl
                                    bg-[var(--background-secondary)]
                                    focus:border-blue-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                    text-sm
                                    transition-all
                                "
                                placeholder="URL GitHub"
                            />
                        </>
                    ) : (
                        <>
                            <div className="flex-1 bg-red-500">
                                <ActionButton label="Demo" width={100} link={currentProject.demoUrl} />
                            </div>
                            <a
                                href={currentProject.githubUrl || '#'}
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    text-[var(--text-color-primary)]
                                    font-semibold
                                    text-sm
                                    sm:text-base
                                    hover:bg-[var(--text-color-primary)]/5
                                    transition-all
                                    duration-200
                                    text-center
                                "
                            >
                                <span className="mr-2">📂</span>
                                GitHub
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;