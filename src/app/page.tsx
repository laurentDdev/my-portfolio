import Image from "next/image";
import ActionButton from "@/app/components/ActionButton";
import IconButton from "@/app/components/IconButton";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import styles from "@/app/styles/Home.module.scss"
import {SOCIAL_URL} from "@/url";

export default function Home() {
  return (
      <div className="h-[80%] flex items-center justify-evenly gap-10 p-5 flex-col sm:flex-row sm:gap-10">
          {/* Section Texte */}
          <div className="flex flex-col gap-4 w-full sm:w-1/2">
              <div className={`${styles.textSection} flex flex-col gap-5`}>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                      Laurent Dessy
                      <br />
                      <span className="text-2xl sm:text-3xl lg:text-5xl font-normal">
          Fullstack developer
        </span>
                  </h1>
                  <p className="text-xl sm:text-2xl lg:text-4xl">
                      I build high-performance web applications, from front to back.
                  </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-8">
                  <ActionButton label="View my projects" width={70} />
                  <div className="flex gap-3">
                      <IconButton link={SOCIAL_URL.GITHUB}>
                          <FaGithub className="w-6 h-6 sm:w-8 sm:h-8" />
                      </IconButton>
                      <IconButton link={SOCIAL_URL.LINKEDIN}>
                          <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
                      </IconButton>
                  </div>
              </div>
          </div>

          {/* Section Image */}
          <div className="bg-green-300 flex justify-center items-center">
              <Image
                  src="/profil.jpg"
                  alt="My profil picture"
                  width={300}
                  height={300}
                  className="sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]"
                  style={{ boxShadow: '4px 4px 10px 4px var(--accent-color)' }}
              />
          </div>
      </div>

  );
}
