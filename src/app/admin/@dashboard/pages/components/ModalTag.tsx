import React, {Dispatch, useContext} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {FaTimes} from "react-icons/fa";
import styles from "@/app/styles/admin/dashboard/DashboardModal.module.scss"
import {zodResolver} from "@hookform/resolvers/zod";

import * as z from "zod"
import {AdminContext, AdminContextType} from "@/app/contexts/AdminContext";

type Inputs = {
    icon: string;
    color: string;
    label: string;
};

const schema = z.object({
    icon: z.string().min(1, {message: "Champ requis"}),
    color: z.string().min(1, {message: "Champ requis"}).regex(/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {message: "Format de couleur invalide"}),
    label: z.string().min(1, {message: "Champ requis"}),
})

type ModalTagProps = {
    onClose: Dispatch<React.SetStateAction<boolean>>;
};

const ModalTag = ({onClose}: ModalTagProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        resolver: zodResolver(schema)
    });

    const {addTag} = useContext(AdminContext) as AdminContextType

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Form data :", data);

        const {label, color, icon} = data
        if (label && color && icon) {
            console.log("Envoi des données au serveur...")
            fetch('/api/tag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({label, color, icon}),
            }).then(res => res.json()).then(data => {
                addTag(data)
                onClose(false)
            })
        }
    };

    return (
        // Overlay noir semi-transparent
        <div className={styles.dashboardModal}>

            <div className={styles.dashboardModal__header}>
                <button
                    onClick={() => onClose(false)}
                >
                    <FaTimes size={18}/>
                </button>

                <h2>Ajoutez un tag</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.dashboardModal__form}>

                <div className="flex flex-col">
                    <label>Icon</label>
                    <input
                        {...register("icon", {required: true})}
                        placeholder="Nom de l'icône"
                    />
                    {errors.icon && (
                        <span className="text-red-500 text-xs mt-1">Champ requis</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label >Color</label>
                    <input
                        {...register("color", {required: true})}
                        placeholder="Ex: #FF5733"
                    />
                    {errors.color && (
                        <span className="text-red-500 text-xs mt-1">Champ requis</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label >Label</label>
                    <input
                        {...register("label", {required: true})}
                        placeholder="Nom du tag"
                    />
                    {errors.label && (
                        <span className="text-red-500 text-xs mt-1">Champ requis</span>
                    )}
                </div>

                {/* Bouton submit */}
                <button
                    type="submit"
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default ModalTag;
