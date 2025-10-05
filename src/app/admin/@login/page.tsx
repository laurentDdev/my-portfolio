import styles from "@/app/styles/admin/login.module.scss"
import LoginForm from "@/app/admin/@login/components/LoginForm";

const LoginAuth = () => {
    return (
        <div className=" flex justify-center items-center p-4">
            <div className="w-full max-w-md">
                <div className={`p-8 space-y-6  ${styles.loginForm}`}>
                    <h1 className="text-2xl font-bold text-center ">
                        Connexion
                    </h1>

                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginAuth;
