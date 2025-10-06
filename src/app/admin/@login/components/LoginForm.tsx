"use client";

import React, {useState} from 'react';
import {signIn} from "@/lib/auth-client";

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.email.toLowerCase() != "laurent5dessy@gmail.com") {
            alert("Seul l'email de mon créateur est autorisé pour le moment.");
            return;
        }

        const {error} = await signIn.email({
            email: formData.email,
            password: formData.password,
            callbackURL: '/admin'
        })

        if (error) {
            console.log("Error during sign in:", error);
            switch (error.code) {
                case "INVALID_EMAIL_OR_PASSWORD":
                    setError("Email ou mot de passe invalide.");
                    break;
                default:
                    setError("Une erreur est survenue. Veuillez réessayer.");
                    break;
            }
            return;
        }
        setError("")

    }


    return (
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                />
            </div>
            {error.length > 0 && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                className="w-full py-3 px-4 text-white font-medium"
                onClick={handleSubmit}
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
    );
};

export default LoginForm;