import React from 'react';
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import AdminNavigation from "@/app/admin/components/AdminNavigation";

const AdminLayout = async ({children, dashboard, login, register}: {
    children: React.ReactNode,
    dashboard: React.ReactNode,
    login: React.ReactNode,
    register: React.ReactNode
}) => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session) {
        return (
            <div className={"flex"}>
                <AdminNavigation />
                {dashboard}
            </div>
        );
    }

    return (
        <>
            {login}
        </>
    );
};

export default AdminLayout;