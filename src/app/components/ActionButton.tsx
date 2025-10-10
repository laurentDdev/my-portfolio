"use client";

import React from 'react';
import styles from "@/app/styles/components/ActionButton.module.scss"
import {useRouter} from "next/navigation";

type Props = {
    label: string;
    onAction?: () => void;
    marginTop?: number;
    marginBottom?: number;
    width?: number;
    link?: string;
    isLocalLink?: boolean;
}

const ActionButton = ({label, onAction, marginBottom, marginTop, link, width, isLocalLink}: Props) => {

    const router = useRouter();

    const handleClick = () => {
        if (link) {
            if (isLocalLink) {
                router.push(link);
            } else {
                window.open(link, '_blank');
            }
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