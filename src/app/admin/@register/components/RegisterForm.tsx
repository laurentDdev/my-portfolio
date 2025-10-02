
"use client";

import React from 'react';
import {signUp} from "@/lib/auth-client";

const RegisterForm = () => {

    const [formData, setFormData] = React.useState({
        pseudo: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {data, error} = await signUp.email({
            email: formData.email,
            password: formData.password,
            name: formData.pseudo
        }, {
            onRequest: (ctx) => {
                console.log("Requesting...", ctx);
            },
            onSuccess: (ctx) => {
                console.log("Success!", ctx);
            },
            onError: (ctx) => {
                console.log("Error!", ctx);
            }
        })
     }

    return (
        <form className={`space-y-5`}>
            {/* Champ Email */}

            <div className="space-y-2">
                <label
                    htmlFor="pseudo"
                    className="block text-sm font-medium "
                >
                    Pseudo
                </label>
                <input
                    type="text"
                    id="pseudo"
                    className="w-full px-4 py-3 border focus:ring-2 outline-none"
                    placeholder="votre pseudo"
                    required
                    onChange={handleChange}
                />
            </div>

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

            {/* Bouton de soumission */}
            <button
                type="submit"
                className="w-full py-3 px-4 text-white font-medium"
                onClick={handleSubmit}
            >
                S'inscrire
            </button>

        </form>
    );
};

export default RegisterForm;