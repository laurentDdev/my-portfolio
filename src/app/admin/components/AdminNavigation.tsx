"use client";

import React, {useContext} from 'react';
import styles from "@/app/styles/components/AdminNavigation.module.scss"
import LogoutButton from "@/app/admin/components/LogoutButton";
import {ADMIN_DASHBOARD_URL, AdminContext, AdminContextType} from "@/app/contexts/AdminContext";



const adminLinks = [
    {
        name: 'Gérer les tags',
        link: '/admin/tags',
        id: ADMIN_DASHBOARD_URL.MANAGE_TAGS
    },
    {
        name: 'Gérer les projets',
        link: '/admin/projects',
        id: ADMIN_DASHBOARD_URL.MANAGE_PROJECTS
    },
    {
        name: 'Gérer les skills',
        link: '/admin/skills',
        id: ADMIN_DASHBOARD_URL.MANAGE_SKILLS
    }
]


const AdminNavigation = () => {

    const {currentDashboardUrl, setCurrentDashboardUrl} = useContext(AdminContext) as AdminContextType

    return (
        <nav className={`${styles.adminNav} w-64 h-full flex flex-col justify-between p-6 top-0`}>
            <ul>
                {adminLinks.map((item) => (
                    <li key={item.name} className={"mb-4"}>
                        <a
                            onClick={() => setCurrentDashboardUrl(item.id)}
                            about={item.name}
                            className={`text-lg font-medium cursor-pointer hover:text-gray-400 ${item.id === currentDashboardUrl ? styles.activeLink : ''}`}
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
            <LogoutButton/>
        </nav>
    );
};

export default AdminNavigation;