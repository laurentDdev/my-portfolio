import React, {useContext, useEffect, useState} from "react";
import styles from "@/app/styles/admin/dashboard/DashboardModal.module.scss";
import {FaTimes} from "react-icons/fa";
import {SubmitHandler, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {AdminContext, AdminContextType} from "@/app/contexts/AdminContext";
import DynamicIcon from "@/app/components/DynamicIcon";
import Image from "next/image";

type Inputs = {
    name: string;
    description: string;
    image: FileList;
    githubUrl?: string;
    demoUrl?: string;
};

const schema = z.object({
    name: z.string().min(3, {message: "Minimum 3 caractères"}).max(30),
    description: z.string().min(6, {message: "Minimum 6 caractères"}).max(100),
    image: z
        .any()
        .refine((file) => file && file.length > 0, {message: "Une image est requise"}),
    githubUrl: z.string().url({message: "Lien invalide"}).optional(),
    demoUrl: z.string().url({message: "Lien invalide"}).optional(),
});

type ModalProjectProps = {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalProject = ({onClose}: ModalProjectProps) => {
    const {tags} = useContext(AdminContext) as AdminContextType;
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setValue,
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const imageFile = watch("image");
    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            const url = URL.createObjectURL(file);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [imageFile]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const file = data.image[0];
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", file);
        formData.append("tags", JSON.stringify(selectedTags));

        if (data.githubUrl) formData.append("githubUrl", data.githubUrl);
        if (data.demoUrl) formData.append("demoUrl", data.demoUrl);

        fetch('/api/project', {
            method: 'POST',
            body: formData,
        }).then(res => res.json()).then(data => {
            console.log("Projet ajouté :", data);
            onClose(false);
        })

    };



    return (
        <div className={styles.dashboardModal}>
            <div className={styles.dashboardModal__header}>
                <button onClick={() => onClose(false)}>
                    <FaTimes size={18}/>
                </button>
                <h2>Ajoutez un projet</h2>
            </div>

            <form className={styles.dashboardModal__form} onSubmit={handleSubmit(onSubmit)}>

                {preview ? (
                    <div className={styles.dashboardModal__form__imagePreview}>
                        <Image src={preview} height={200} width={200} alt="Preview" onClick={() => {
                            setPreview(null)
                            setValue("image", {} as FileList)
                        }}/>
                    </div>
                ) : (
                    <div className={styles.dashboardModal__form__imagePlaceholder}>
                        Aucune image sélectionnée
                    </div>
                )}

                <div className="flex flex-col">
                    <label htmlFor="image">Image du projet</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        {...register("image")}
                    />
                    {errors.image && (
                        <span className={styles.dashboardModal__form__error}>{errors.image.message as string}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="name">Nom du projet</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ex: Portfolio React"
                        {...register("name")}
                    />
                    {errors.name && (
                        <span className={styles.dashboardModal__form__error}>{errors.name.message}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description">Description du projet</label>
                    <textarea
                        id="description"
                        rows={5}
                        className={"resize-none"}
                        placeholder="Ex: Application web de gestion de tâches..."
                        {...register("description")}
                    />
                    {errors.description && (
                        <span className={styles.dashboardModal__form__error}>{errors.description.message}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="githubUrl">Lien GitHub</label>
                    <input
                        type="text"
                        id="githubUrl"
                        placeholder="https://github.com/..."
                        {...register("githubUrl")}
                    />
                    {errors.githubUrl && (
                        <span className={styles.dashboardModal__form__error}>{errors.githubUrl.message}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="demoUrl">Lien de la démo</label>
                    <input
                        type="text"
                        id="demoUrl"
                        placeholder="https://..."
                        {...register("demoUrl")}
                    />
                    {errors.demoUrl && (
                        <span className={styles.dashboardModal__form__error}>{errors.demoUrl.message}</span>
                    )}
                </div>

                {/* TAGS SELECT */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="tags">Selectionner les tags du projets</label>

                    {/* Affichage des tags sélectionnés */}

                    <div className={"flex gap-2 flex-wrap mb-2"}>

                        {
                            tags.filter((t) => selectedTags.includes(t.id)).map((tag) => (
                                <span
                                    key={tag.id}
                                    className={"py-1 px-2 flex items-center gap-2 cursor-pointer hover:scale-105 transition duration-150 text-white"}
                                    style={{backgroundColor: tag.color}}
                                    onClick={() => {
                                        setSelectedTags(prevState => prevState.filter(id => id !== tag.id));
                                    }}
                                >
                                    <DynamicIcon name={tag.icon}/>
                                    {tag.label} &times;
                            </span>
                            ))
                        }
                    </div>

                    <select
                        id="tags"
                        defaultValue=""
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!value) return;
                            setSelectedTags(prevState => [...prevState, parseInt(value)]);
                            e.target.value = "";
                        }}
                    >
                        <option value="" disabled hidden>Sélectionner un tag</option>
                        {tags
                            .filter((t) => !selectedTags.includes(t.id))
                            .map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.label}
                                </option>
                            ))}
                    </select>

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

export default ModalProject;
