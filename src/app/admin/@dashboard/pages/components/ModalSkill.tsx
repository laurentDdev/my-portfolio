import React, {useContext} from 'react';
import styles from "@/app/styles/admin/dashboard/DashboardModal.module.scss"

import * as z from "zod"
import {FaTimes} from "react-icons/fa";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AdminContext, AdminContextType} from "@/app/contexts/AdminContext";

type Inputs = {
    text: string;
    icon?: string;
}

const schema = z.object({
    text: z.string().min(1, {message: "Champ requis"}),
    icon: z.string().optional(),
})

type ModalSkillProps = {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}


const ModalSkill = ({onClose}: ModalSkillProps) => {


    const {addSkill} = useContext(AdminContext) as AdminContextType

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Form data :", data);

        const {text, icon} = data
        if (text) {
            fetch('/api/skill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({text, icon}),
            }).then(res => res.json()).then(data => {
                addSkill(data)
                onClose(false)
            })
        }
    };

    return (
        <div className={styles.dashboardModal}>
            <div className={styles.dashboardModal__header}>
                <button
                    onClick={() => onClose(false)}
                >
                    <FaTimes size={18}/>
                </button>

                <h2>Ajoutez un skill</h2>
            </div>

            <form className={styles.dashboardModal__form} onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col">
                    <label htmlFor="text">Texte</label>
                    <input
                        type="text"
                        id="text"
                        className={"w-full"}
                        placeholder="Ex: JavaScript, React, Node.js..."
                        {...register("text")}
                    />
                    {errors.text && <span className={styles.dashboardModal__form__error}>{errors.text.message}</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="icon">Icône (optionnel)</label>
                    <input
                        type="text"
                        id="icon"
                        placeholder="Ex: fab fa-js, fab fa-react, fab fa-node-js..."
                        {...register("icon")}
                    />
                    {errors.icon && <span className={styles.dashboardModal__form__error}>{errors.icon.message}</span>}
                </div>

                <button
                    type="submit"
                    className={styles.dashboardModal__form__submit}
                >
                    Ajouter
                </button>
            </form>

        </div>
    );
};

export default ModalSkill;