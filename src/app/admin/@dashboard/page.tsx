"use client";

import {createElement, lazy, useContext, useState} from 'react';
import {ADMIN_DASHBOARD_URL, AdminContext, AdminContextType} from "@/app/contexts/AdminContext";
import DashboardProject from "@/app/admin/@dashboard/pages/DashboardProject";
import DashboardSkill from "@/app/admin/@dashboard/pages/DashboardSkill";
import DashboardTag from "@/app/admin/@dashboard/pages/DashboardTag";
import styles from "@/app/styles/admin/dashboard/Dashboard.module.scss"
import { FaPlus } from "react-icons/fa";
import {createPortal} from "react-dom";


const datasHeaders = {
    [ADMIN_DASHBOARD_URL.MANAGE_TAGS]: {
        title: 'Bienvenue dans le gestionnaire de tags',
        buttonText: 'Ajouter un tag',
        modal: lazy(() => import("@/app/admin/@dashboard/pages/components/ModalTag"))
    },
    [ADMIN_DASHBOARD_URL.MANAGE_PROJECTS]: {
        title: 'Bienvenue dans le gestionnaire de projets',
        buttonText: 'Ajouter un projet',
        modal: lazy(() => import("@/app/admin/@dashboard/pages/components/ModalProject"))
    },
    [ADMIN_DASHBOARD_URL.MANAGE_SKILLS]: {
        title: 'Bienvenue dans le gestionnaire de compétences',
        buttonText: 'Ajouter une compétence',
        modal: lazy(() => import("@/app/admin/@dashboard/pages/components/ModalSkill"))
    }
}

const DashboardAdmin = () => {

    const {currentDashboardUrl} = useContext(AdminContext) as AdminContextType;
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className={"w-full p-2"}>
            <div className={`flex p-2 items-center justify-between ${styles.dashboardHeader}`}>
                <h2>{datasHeaders[currentDashboardUrl].title}</h2>
                <button onClick={() => setModalOpen(true)} className={"flex items-center gap-2"}><FaPlus/>{datasHeaders[currentDashboardUrl].buttonText}</button>
            </div>
            {currentDashboardUrl === ADMIN_DASHBOARD_URL.MANAGE_PROJECTS ? <DashboardProject /> : currentDashboardUrl === ADMIN_DASHBOARD_URL.MANAGE_SKILLS ? <DashboardSkill /> : <DashboardTag />}
            {modalOpen && createPortal(
                    createElement(datasHeaders[currentDashboardUrl].modal, {
                        onClose: setModalOpen
                    }),
                document.body
            )}
        </div>
    );
};

export default DashboardAdmin;