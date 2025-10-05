"use client"
import React, {createContext, PropsWithChildren, useState} from "react";


export type AdminContextType = {
    currentDashboardUrl: ADMIN_DASHBOARD_URL;
    setCurrentDashboardUrl: React.Dispatch<React.SetStateAction<ADMIN_DASHBOARD_URL>>;
}

export enum ADMIN_DASHBOARD_URL {
    MANAGE_TAGS = "MANAGE_TAGS",
    MANAGE_SKILLS = "MANAGE_SKILLS",
    MANAGE_PROJECTS = "MANAGE_PROJECTS",
}

export const AdminContext = createContext<AdminContextType | null>(null)


export const AdminContextProvider = ({children}: PropsWithChildren) => {

    const [currentDashboardUrl, setCurrentDashboardUrl] = useState(ADMIN_DASHBOARD_URL.MANAGE_TAGS)

    return (
        <AdminContext.Provider value={{currentDashboardUrl, setCurrentDashboardUrl}}>
            {children}
        </AdminContext.Provider>
    )
}