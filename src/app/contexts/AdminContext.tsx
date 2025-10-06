import React, {createContext, PropsWithChildren, useEffect, useState} from "react";


export type Tag = {
    id: number;
    label: string;
    color: string;
    icon: string;
}

export type AdminContextType = {
    currentDashboardUrl: ADMIN_DASHBOARD_URL;
    setCurrentDashboardUrl: React.Dispatch<React.SetStateAction<ADMIN_DASHBOARD_URL>>;
    tags: Tag[];
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
    addTag: (tag: Tag) => void;
    updateTag:(tag: Tag) => void;
    removeTag: (id: number) => void;
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

    const addTag = (tag: Tag) => {
        setTags((prevTags) => [...prevTags, tag]);
    };

    const updateTag = (tag: Tag) => {
        setTags((prevTags) => prevTags.map((t) => t.id === tag.id ? tag : t));
    }

    const removeTag = (id: number) => {
        setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
    }

    useEffect(() => {
        fetch("/api/tag")
            .then((res) => res.json())
            .then((data: Tag[]) => {
                setTags(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <AdminContext.Provider value={{currentDashboardUrl, setCurrentDashboardUrl, tags, removeTag,updateTag, setTags, addTag}}>
            {children}
        </AdminContext.Provider>
    )
}