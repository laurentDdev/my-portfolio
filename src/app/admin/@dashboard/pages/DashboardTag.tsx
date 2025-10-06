import React, {useContext} from 'react';
import {AdminContext, AdminContextType} from "@/app/contexts/AdminContext";
import {FaTrash, FaPenAlt} from "react-icons/fa";


const DashboardTag = () => {

    const {tags, removeTag} = useContext(AdminContext) as AdminContextType

    const handleDeleteTag = (id: number) => {
        if (confirm('Confirmer la suppression du tag ')) {
            fetch('/api/tag', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id}),
            }).then(res => res.json()).then((res) => {
                if (res.id) {
                    removeTag(res.id)
                }
            })
        }

    }

    return (
        <div className={"h-full w-full p-2"}>
            {
                tags.length > 0 ? (
                    <div className={"flex flex-wrap gap-3"}>
                        {
                            tags.map((tag) => {
                                return <div key={tag.id} className={"p-2 flex gap-2 items-center text-black cursor-pointer hover:scale-105 transition duration-150"} style={{background: tag.color}}>
                                    <p>{tag.label}</p>
                                    <FaPenAlt className={'hover:scale-125 cursor-pointer transition duration-150'} />
                                    <FaTrash onClick={() => handleDeleteTag(tag.id)} className={'hover:scale-125 cursor-pointer transition duration-150'}/>
                                </div>
                            })
                        }
                    </div>
                ) : <div className={"flex h-full items-center justify-center"}>
                    <p>Aucun tag n'est enregistrer</p>
                </div>
            }
        </div>
    );
};

export default DashboardTag;