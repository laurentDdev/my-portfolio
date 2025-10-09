"use client";

import React from 'react';
import styles from "@/app/styles/components/ActionButton.module.scss"

type Props = {
    label: string;
    onAction?: () => void;
    marginTop?: number;
    marginBottom?: number;
    width?: number;
    link?: string;
}

const ActionButton = ({label, onAction, marginBottom, marginTop, link, width}: Props) => {

    const handleClick = () => {
        if (link) {
            window.open(link, '_blank');
        } else {
            if (onAction) {
                onAction();
            }
        }
    }

    return (
        <button onClick={handleClick} className={`${styles.actionButton} text-3xl px-5 py-1 w-full w-[${width}%] ${marginTop ? 'mt-' + marginTop : ''} ${marginBottom ? 'mb-' + marginBottom : ''}`}>
            {label}
        </button>
    );
};

export default ActionButton;