import React from 'react';
import ContactForm from "@/app/contact-me/components/ContactForm";

const ContactMePage = () => {
    return (
        <section className="
            h-full
            md:px-30 px-10 py-5
        relative

        bg-[var(--background-primary)]
        text-[var(--text-primary)]
        flex flex-col items-center
      ">
            <h1 className="text-5xl font-bold text-[var(--accent-color)]">Contact</h1>
            <p className={"text-2xl"}>my contact details</p>
            <ContactForm />

            <div className="
                absolute inset-0 pointer-events-none
                bg-gradient-to-t from-[var(--accent-color)]/10 via-transparent to-transparent
            "/>
        </section>
    );
};

export default ContactMePage;