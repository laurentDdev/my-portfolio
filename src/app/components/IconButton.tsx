"use client"

import React from 'react';


type Props = {
    children?: React.ReactNode;
    link?: string;
}

const IconButton = ({children, link}: Props) => {

    const handleClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    }

    return (
        <button onClick={handleClick} className={"h-[70px]  w-[70px] flex justify-center items-center cursor-pointer hover:scale-110 transition "}>
            {children}
        </button>
    );
};

export default IconButton;