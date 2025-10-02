import React from 'react';
import {FaGithub, FaLinkedin} from "react-icons/fa";
import IconButton from "@/app/components/IconButton";
import styles from "@/app/styles/components/Footer.module.scss"

const Footer = () => {
    return (
        <footer className={`${styles.footer} w-full  py-6 mt-10`}>
            <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Texte copyright */}
                <p className="text-sm text-center sm:text-left">
                    © {new Date().getFullYear()} Laurent Dessy – Fullstack Developer
                </p>

                {/* Icônes sociales */}
                <div className="flex gap-4">
                    <IconButton>
                        <FaGithub className="w-6 h-6 sm:w-8 sm:h-8" />
                    </IconButton>
                    <IconButton>
                        <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
                    </IconButton>
                </div>
            </div>
        </footer>
    );
};

export default Footer;