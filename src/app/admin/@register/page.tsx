import React from 'react';
import styles from "@/app/styles/admin/login.module.scss";
import RegisterForm from "@/app/admin/@register/components/RegisterForm";

const AuthRegister = () => {


    return (
        <div className="h-full flex justify-center items-center p-4">
            <div className="w-full max-w-md">
                <div className={`p-8 space-y-6  ${styles.loginForm}`}>
                    <h1 className="text-2xl font-bold text-center ">
                        Inscription
                    </h1>

                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default AuthRegister;