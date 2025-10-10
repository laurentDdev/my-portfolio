"use client";

import React, {useEffect, useState} from 'react';
import {FaFilter} from "react-icons/fa";
import {Tag} from "@/app/contexts/AdminContext";
import {useRouter} from "next/navigation";

const FiltersProjects = () => {
    const [tags, setTags] = useState<Tag[]>([])
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [selectedTags, setSelectedTags] = useState<number[]>([])

    const router = useRouter()

    useEffect(() => {
        // Fetch tags from API
        fetch(`${process.env.BETTER_AUTH_URL}/api/tag`)
            .then(response => response.json())
            .then(data => setTags(data))
            .catch(error => console.error('Error fetching tags:', error));
    }, []);

    useEffect(() => {
        const tags = selectedTags.join("-");
        const params = new URLSearchParams(window.location.search);
        if (tags.length > 0) {
            params.set("tags", tags);
        } else {
            params.delete("tags");
        }
        router.replace(`?${params.toString()}`);
    }, [router, selectedTags]);

    const handleTagClick = (tag: Tag) => {
        if (selectedTags.includes(tag.id)) {
            setSelectedTags(selectedTags.filter(id => id !== tag.id));
        } else {
            setSelectedTags([...selectedTags, tag.id]);
        }
    }

    return (
        <div className={"relative"}>
            <button onClick={() => setOpenFilter(prevState => !prevState)} className="
                            flex items-center gap-2
                            bg-[var(--background-secondary)] text-[var(--text-primary)]
                            hover:bg-[var(--background-secondary-hover)]
                            cursor-pointer
                            py-2 px-4
                            transition
                        ">
                <FaFilter/>
                Filters
            </button>
            {openFilter && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-[var(--background-secondary)] border border-gray-700 rounded shadow-lg z-10">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => setSelectedTags([])}>Remove filter
                        </li>
                        {tags && tags.map((tag: Tag) => (
                            <li key={tag.id} className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleTagClick(tag)}>

                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedTags.includes(tag.id)}
                                    onChange={() => handleTagClick(tag)}
                                />
                                {tag.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default FiltersProjects;