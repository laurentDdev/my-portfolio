"use client";

import React from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import {signOut} from "@/lib/auth-client";
import {useRouter} from "next/navigation";

const LogoutButton = () => {

    const router = useRouter();

    const handleLogout = () => {
        signOut();
        router.push("/");
    }

    return (
        <button className={"text-lg font-medium hover:text-gray-400 flex gap-2 items-center cursor-pointer"} onClick={handleLogout}>
            <FaSignOutAlt />
            Se deconnecter
        </button>
    );
};

export default LogoutButton;