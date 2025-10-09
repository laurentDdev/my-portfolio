"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/components/Header.module.scss";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const links = [
    { name: 'Home', href: '/' },
    { name: 'About me', href: '/about-me' },
    { name: 'My projects', href: '/my-projects' },
    { name: 'Contact me', href: '/contact-me' },
];

const Header = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="p-5 flex justify-end items-center">
            {/* Navigation desktop */}
            <nav className="flex justify-end max-sm:hidden">
                <ul className="flex gap-4">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.name}>
                                <Link
                                    className={isActive ? styles.linkActive : ''}
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <button
                className="sm:hidden"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                {isMenuOpen ? <FaXmark /> : <FaBars />}
            </button>

            {isMenuOpen && (
                <nav className={`absolute top-16 right-5 z-20  p-4 rounded shadow-lg sm:hidden ${styles.responsiveMenu}`}>
                    <ul className="flex flex-col gap-4">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.name}>
                                    <Link
                                        className={isActive ? styles.linkActive : ''}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
