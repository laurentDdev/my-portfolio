"use client";
import React, {useEffect, useMemo, useState} from "react";
import {Skill} from "@/app/contexts/AdminContext";
import DynamicIcon from "@/app/components/DynamicIcon";

type Props = {
    skills: Skill[];
};

const DisplaySkills = ({skills}: Props) => {
    const [visibleSkills, setVisibleSkills] = useState<Skill[]>([]);

    // Fonction pour choisir 5 skills aléatoirement
    const pickRandomSkills = (arr: Skill[], count: number) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Met à jour les skills visibles (initialisation + rotation aléatoire)
    useEffect(() => {
        if (skills.length <= 5) {
            setVisibleSkills(skills);
            return;
        }

        setVisibleSkills(pickRandomSkills(skills, 5));

        const interval = setInterval(() => {
            setVisibleSkills(pickRandomSkills(skills, 5));
        }, 4000); // change toutes les 4 secondes, sobrement

        return () => clearInterval(interval);
    }, [skills]);

    if (skills.length === 0) return <p className="text-gray-400">No skills available.</p>;

    return (
        <div
            className="flex flex-wrap gap-3 w-[80%]">
            {visibleSkills.map((skill) => (
                <div
                    key={skill.id}
                    className="
            flex items-center gap-2 px-4 py-2
            bg-[var(--background-secondary)]
            text-white
            transition-all duration-500
            hover:scale-105 hover:bg-[var(--accent-color)]
            cursor-default select-none shadow-md
          "
                >
                    {skill.icon && (
                        <DynamicIcon name={skill.icon}
                                     className="text-xl text-[var(--accent-color)] hover:text-white"/>
                    )}
                    <span className="text-sm font-medium">{skill.text}</span>
                </div>
            ))}
        </div>
    );
};

export default DisplaySkills;
