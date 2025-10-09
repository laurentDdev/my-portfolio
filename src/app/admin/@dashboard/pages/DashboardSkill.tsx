import React, {Dispatch, useContext} from 'react';
import {AdminContext, AdminContextType, Skill} from "@/app/contexts/AdminContext";
import DynamicIcon from "@/app/components/DynamicIcon";
import {FaPenAlt, FaTrash} from "react-icons/fa";



const SkillComponent = ({skill, onDeleteSkill, updateSkill}: { skill: Skill, onDeleteSkill: (skillId: number) => void, updateSkill: Dispatch<Skill> }) => {

    const [editingSkill, setEditingSkill] = React.useState<Skill | null>(null);

    if (!editingSkill) {
        return (
            <div key={skill.id} style={{background: 'var(--background-secondary)'}}  className={"p-2 flex gap-2 items-center text-white cursor-pointer hover:scale-105 transition duration-150"}>
                {skill.icon && <DynamicIcon name={skill.icon} />}
                <span>{skill.text}</span>
                <FaPenAlt className={'hover:scale-125 cursor-pointer transition duration-150'}
                          onClick={() => setEditingSkill(skill)}/>
                <FaTrash className={'hover:scale-125 cursor-pointer transition duration-150'}
                         onClick={() => onDeleteSkill(skill.id)}/>
            </div>
        )
    } else {
        return (
            <form
                className="p-2 flex items-center gap-2 text-white"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (editingSkill) {
                        fetch('/api/skill', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(editingSkill),
                        }).then((res) => res.json()).then((res) => {
                            if (res.id) {
                                setEditingSkill(null);
                                updateSkill(res);
                            }
                        });
                    }
                }}
            >
                <input
                    type="text"
                    value={editingSkill.text}
                    onChange={(e) => setEditingSkill({...editingSkill, text: e.target.value})}
                    className="p-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black min-w-min"
                    placeholder="Label"
                />
                <input
                    type="text"
                    value={editingSkill.icon}
                    onChange={(e) => setEditingSkill({...editingSkill, icon: e.target.value})}
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
                    onClick={() => setEditingSkill(null)}
                >
                    Annuler
                </button>
            </form>


        )
    }


}


const DashboardSkill = () => {

    const {skills, removeSkill, updateSkill} = useContext(AdminContext) as AdminContextType

    const handleDeleteSkill = (skillId: number) => {
        if (confirm('Confirmer la suppression du skill ')) {
            fetch('/api/skill', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: skillId}),
            }).then(res => res.json()).then((res) => {
                if (res.id) {
                    removeSkill(res.id)
                }
            })
        }
    }

    return (
        <div className={"h-full w-full p-2"}>
            {
                skills.length > 0 ? (
                    <div className={" flex flex-wrap gap-2 overflow-y-auto"}>
                        {
                            skills.map((skill) => (
                                <SkillComponent key={skill.id} skill={skill} onDeleteSkill={handleDeleteSkill} updateSkill={updateSkill} />
                            ))
                        }
                    </div>
                ) : <p>Aucun skill n est enregistrer</p>
            }
        </div>
    );
};

export default DashboardSkill;