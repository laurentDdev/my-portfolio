"use client"

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

type Inputs = {
    email: string;
    message: string;
}

const schema = z.object({
    email: z.email(),
    message: z.string().min(10).max(1000),
})

const ContactForm = () => {
    const [success, setSuccess] = useState(false);

    const {register, handleSubmit, formState: {errors}, setValue} = useForm<Inputs>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: Inputs) => {
        fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 5000);
                setValue("email", "");
                setValue("message", "");
            } else {
                alert('Erreur lors de l\'envoi du message.');
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[var(--background-secondary)] p-6 w-full max-w-lg mt-8 flex flex-col gap-6 rounded-none shadow-none"
        >
            {/* Champ Email */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium text-[var(--text-color)]"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full p-2 bg-[var(--background)] border-none outline-none focus:ring-0 text-[var(--text-color)]"
                    placeholder="Votre adresse email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Champ Message */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="message"
                    className="text-sm font-medium text-[var(--text-primary)]"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    {...register("message")}
                    rows={10}
                    className="w-full p-2 bg-[var(--background)] border-none outline-none focus:ring-0 text-[var(--text-color)] min-h-[120px] resize-y"
                    placeholder="Votre message..."
                />
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
            </div>

            {success && (
                <p className="text-green-500 text-sm mt-1">Message envoyé avec succès !</p>
            )}
            {/* Bouton d'envoi */}
            <button
                type="submit"
                className="w-full py-2 bg-[var(--accent-color)] font-medium hover:opacity-90 mt-2 hover:scale-105 active:scale-95 duration-300 text-white transition-all ease-in-out cursor-pointer"
            >
                Envoyer
            </button>
        </form>

    );
};

export default ContactForm;