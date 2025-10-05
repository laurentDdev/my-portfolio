import React from 'react';
import styles from "@/app/styles/components/AdminNavigation.module.scss"
import Link from "next/link";
import LogoutButton from "@/app/admin/components/LogoutButton";


const adminLinks = [
    {
        name: 'Gérer les tags',
        link: '/admin/tags',
    },
    {
        name: 'Gérer les projets',
        link: '/admin/projects',
    },
    {
        name: 'Gérer les skills',
        link: '/admin/skills',
    }
]


const AdminNavigation = () => {
    return (
        <nav className={`${styles.adminNav} w-64 h-full flex flex-col justify-between p-6 top-0`}>
            <ul>
                {adminLinks.map((item) => (
                    <li key={item.name} className={"mb-4"}>
                        <Link
                            href={item.link}
                            className={"text-lg font-medium text-gray-700 hover:text-gray-900"}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <LogoutButton/>
        </nav>
    );
};

export default AdminNavigation;