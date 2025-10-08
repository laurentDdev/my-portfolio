import React, {use} from "react";
import SubTitle from "@/app/components/SubTitle";
import DisplaySkills from "@/app/about-me/components/DisplaySkills";
import {FaFileDownload, FaGithub, FaLinkedin} from "react-icons/fa";
import IconButton from "@/app/components/IconButton";
import {SOCIAL_URL} from "@/url";

const AboutMe = () => {
    const skills = use(fetch("http://localhost:3000/api/skill").then((res) => res.json()));

    return (
        <section
            className="
            px-10 py-5
        relative flex flex-col gap-5 justify-between

        bg-[var(--background-primary)]
        text-[var(--text-primary)]
      "
        >
            {/* Title */}
            <h1 className="text-5xl font-bold mb-4 text-[var(--accent-color)]">
                My background in a few words
            </h1>

            {/* Intro */}
            <div className="flex flex-col gap-3 mt-4 max-w-5xl">
                <SubTitle text="My Background"/>
                <p className="text-lg leading-relaxed text-gray-300">
                    As a self-taught full-stack developer, I transform ideas into
                    comprehensive technical solutions, from front-end to back-end
                    infrastructure. Passionate about the MERN Stack, I design
                    high-performance, user-centric web applications that blend
                    efficiency, scalability, and elegant UI/UX.
                </p>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-3 mt-10 max-w-5xl">
                <SubTitle text="My Skills"/>
                <DisplaySkills skills={skills}/>
            </div>

            {/* Motivation + CV */}
            <div className="flex flex-col gap-4 mt-10 max-w-5xl">
                <p className="text-lg leading-relaxed text-gray-300">
                    I would like to join an ambitious team where I can take on new
                    challenges, share my full-stack development expertise, and continue
                    to grow alongside passionate professionals.
                </p>

                <button
                    className="
            max-w-max py-3 px-6 flex items-center gap-3
            text-lg font-semibold rounded-xl
            bg-[var(--accent-color)] text-white
            hover:scale-105 hover:brightness-110
            active:scale-95 transition-all duration-300
          "
                >
                    <FaFileDownload/>
                    Download my CV
                </button>

                <span
                    className="italic mt-2 text-sm"
                    style={{color: "var(--accent-color)"}}
                >
          "Self-teaching is learning by doing."
        </span>
            </div>

            {/* Socials (floating right side) */}
            <div
                className="
          absolute right-8 top-1/2 -translate-y-1/2
          flex flex-col items-center gap-4
          hidden
          md:block
        "
            >
                <IconButton link={SOCIAL_URL.LINKEDIN}>
                    <FaLinkedin className="w-7 h-7 sm:w-8 sm:h-8"/>
                </IconButton>
                <IconButton link={SOCIAL_URL.GITHUB}>
                    <FaGithub className="w-7 h-7 sm:w-8 sm:h-8"/>
                </IconButton>
            </div>

            {/* Decorative gradient accent */}

        </section>
    );
};

export default AboutMe;
