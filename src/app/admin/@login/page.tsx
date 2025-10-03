import styles from "@/app/styles/admin/login.module.scss"

const LoginAuth = () => {
    return (
        <div className="h-full flex justify-center items-center p-4">
            <div className="w-full max-w-md">
                <div className={`p-8 space-y-6  ${styles.loginForm}`}>
                    <h1 className="text-2xl font-bold text-center ">
                        Connexion
                    </h1>

                    <form className={`space-y-5`}>
                        {/* Champ Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium "
                            >
                                Adresse email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border focus:ring-2 outline-none"
                                placeholder="votre@email.com"
                                required
                                value={"laurent5dessy@gmail.com"}
                                disabled
                            />
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium "
                            >
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 border outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-white font-medium"
                        >
                            Se connecter
                        </button>

                        {/* Lien "Mot de passe oublié" */}
                        <div className="text-center text-sm">
                            <a
                                href="#"
                                className=" font-medium"
                            >
                                Mot de passe oublié ?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginAuth;
