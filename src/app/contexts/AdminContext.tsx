import React, {createContext, PropsWithChildren, useEffect, useState} from "react";


export type Tag = {
    id: number;
    label: string;
    color: string;
    icon: string;
}

export type Skill = {
    id: number;
    text: string;
    icon?: string;
}

export type Project = {
    id: number;
    name: string;
    description: string;
    image?: string;
    githubUrl?: string;
    demoUrl?: string;
    tags: Tag[];
}

export type AdminContextType = {
    currentDashboardUrl: ADMIN_DASHBOARD_URL;
    setCurrentDashboardUrl: React.Dispatch<React.SetStateAction<ADMIN_DASHBOARD_URL>>;
    tags: Tag[];
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
    addTag: (tag: Tag) => void;
    updateTag:(tag: Tag) => void;
    removeTag: (id: number) => void;
    skills: Skill[];
    setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
    addSkill: (skill: Skill) => void;
    updateSkill:(skill: Skill) => void;
    removeSkill: (id: number) => void;
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    projects: Project[];
    addProject: (project: Project) => void;
    removeProject: (id: number) => void;
    updateProject: (project: Project) => void;
}

export enum ADMIN_DASHBOARD_URL {
    MANAGE_TAGS = "MANAGE_TAGS",
    MANAGE_SKILLS = "MANAGE_SKILLS",
    MANAGE_PROJECTS = "MANAGE_PROJECTS",
}

export const AdminContext = createContext<AdminContextType | null>(null)


export const AdminContextProvider = ({children}: PropsWithChildren) => {


    const [currentDashboardUrl, setCurrentDashboardUrl] = useState(ADMIN_DASHBOARD_URL.MANAGE_TAGS)
    const [tags, setTags] = useState<Tag[]>([])
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    const addTag = (tag: Tag) => {
        setTags((prevTags) => [...prevTags, tag]);
    };

    const addSkill = (skill: Skill) => {
        setSkills((prevSkills) => [...prevSkills, skill]);
    }

    const addProject = (project: Project) => {
        setProjects((prevProjects) => [...prevProjects, project]);
    }

    const updateTag = (tag: Tag) => {
        setTags((prevTags) => prevTags.map((t) => t.id === tag.id ? tag : t));
    }

    const updateSkill = (skill: Skill) => {
        setSkills((prevSkills) => prevSkills.map((s) => s.id === skill.id ? skill : s));
    }

    const updateProject = (project: Project) => {
        setProjects((prevProjects) => prevProjects.map((p) => p.id === project.id ? project : p));
    }

    const removeTag = (id: number) => {
        setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
    }

    const removeSkill = (id: number) => {
        setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
    }

    const removeProject = (id: number) => {
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    }

    useEffect(() => {
        console.log("Fetching tags from ", currentDashboardUrl);
        if (currentDashboardUrl === ADMIN_DASHBOARD_URL.MANAGE_TAGS) {
            fetch("/api/tag")
                .then((res) => res.json())
                .then((data: Tag[]) => {
                    setTags(data);
                })
                .catch((err) => console.error(err));
        } else if (currentDashboardUrl === ADMIN_DASHBOARD_URL.MANAGE_SKILLS) {
            fetch('/api/skill')
                .then((res) => res.json())
                .then((data: Skill[]) => {
                    setSkills(data);
                })
                .catch((err) => console.error(err));
        } else if (currentDashboardUrl === ADMIN_DASHBOARD_URL.MANAGE_PROJECTS) {
            fetch('/api/project')
                .then((res) => res.json())
                .then((data: Project[]) => {
                    setProjects(data);
                })
                .catch((err) => console.error(err));
        }
    }, [currentDashboardUrl]);

    return (
        <AdminContext.Provider value={{currentDashboardUrl, setCurrentDashboardUrl, tags, removeTag,updateTag, setTags, addTag, skills, setSkills, addSkill, removeSkill, updateSkill, projects, addProject, setProjects, removeProject, updateProject}}>
            {children}
        </AdminContext.Provider>
    )
}