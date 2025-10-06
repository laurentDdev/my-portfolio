import React, {Dispatch, useContext} from 'react';
import {AdminContext, AdminContextType, Tag} from "@/app/contexts/AdminContext";
import {FaTrash, FaPenAlt} from "react-icons/fa";

import type {Tag as TagType} from "@/app/contexts/AdminContext";


const TagComponent = ({tag, onDeleteTag, updateTag}: { tag: TagType, onDeleteTag: (tagId: number) => void, updateTag: Dispatch<TagType> }) => {

    const [editingTag, setEditingTag] = React.useState<TagType | null>(null);

    if (!editingTag) {
        return (
            <div key={tag.id}
                 className={"p-2 flex gap-2 items-center text-black cursor-pointer hover:scale-105 transition duration-150"}
                 style={{background: tag.color}}>
                <p>{tag.label}</p>
                <FaPenAlt className={'hover:scale-125 cursor-pointer transition duration-150'}
                          onClick={() => setEditingTag(tag)}/>
                <FaTrash className={'hover:scale-125 cursor-pointer transition duration-150'}
                         onClick={() => onDeleteTag(tag.id)}/>
            </div>
        )
    } else {
        return (
            <form
                className="p-2 flex items-center gap-2 text-black"
                style={{background: editingTag.color}}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (editingTag) {
                        fetch('/api/tag', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(editingTag),
                        }).then((res) => res.json()).then((res) => {
                            if (res.id) {
                                setEditingTag(null);
                                updateTag(res);
                            }
                        });
                    }
                }}
            >
                <input
                    type="text"
                    value={editingTag.label}
                    onChange={(e) => setEditingTag({...editingTag, label: e.target.value})}
                    className="p-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black"
                    placeholder="Label"
                />
                <input
                    type="color"
                    value={editingTag.color}
                    onChange={(e) => setEditingTag({...editingTag, color: e.target.value})}
                    className="w-8 h-8 p-0 border-none cursor-pointer"
                />
                <input
                    type="text"
                    value={editingTag.icon}
                    onChange={(e) => setEditingTag({...editingTag, icon: e.target.value})}
                    className="p-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black"
                    placeholder="Icône"
                />
                <button
                    type="submit"
                    className="text-white hover:text-gray-500 transition font-medium"
                >
                    Valider
                </button>
                <button
                    type="button"
                    className="text-red-600 hover:text-red-800 transition font-medium"
                    onClick={() => setEditingTag(null)}
                >
                    Annuler
                </button>
            </form>


        )
    }


}

const DashboardTag = () => {

    const {tags, removeTag, updateTag} = useContext(AdminContext) as AdminContextType

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
                                return <TagComponent tag={tag} key={tag.id} onDeleteTag={handleDeleteTag} updateTag={updateTag} />
                            })
                        }
                    </div>
                ) : <div className={"flex h-full items-center justify-center"}>
                    <p>Aucun tag n est enregistrer</p>
                </div>
            }
        </div>
    );
};

export default DashboardTag;