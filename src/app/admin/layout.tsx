"use client"
import React from 'react';
import AdminNavigation from "@/app/admin/components/AdminNavigation";
import {useSession} from "@/lib/auth-client";

const AdminLayout = ({dashboard, login, register}: {
    dashboard: React.ReactNode,
    login: React.ReactNode,
    register: React.ReactNode
}) => {

    const {data: session, isPending} = useSession()
    const [showLogin, setShowLogin] = React.useState(false)

    if  (isPending) {
        // Make a loading spinner with text "Maitre votre panel d'administration..."
        return (
            <div className={"flex justify-center items-center h-full"}>
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    </div>
                    <div className="mt-2">Maitre votre panel d'administration...</div>
                </div>
            </div>
        )
    }

    if (session) {
        return (
            <div className={"flex gap-3 h-full"}>
                <AdminNavigation />
                {dashboard}
            </div>
        );
    }

    return (
        <>
            {showLogin ? login : register}
            <div className={"text-center mt-4"}>
                <button
                    className={"underline"}
                    onClick={() => setShowLogin(!showLogin)}
                >
                    {showLogin ? "Créer un compte" : "Déjà un compte ? Connectez-vous"}
                </button>
            </div>
        </>
    );
};

export default AdminLayout;