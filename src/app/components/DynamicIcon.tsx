import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import type { IconType } from "react-icons";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as TbIcons from "react-icons/tb";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";

type IconModule =
    | typeof FaIcons
    | typeof MdIcons
    | typeof BsIcons
    | typeof GiIcons
    | typeof AiIcons
    | typeof BiIcons
    | typeof IoIcons
    | typeof Io5Icons
    | typeof RiIcons
    | typeof TbIcons
    | typeof SiIcons
    | typeof PiIcons;

const libraries: Record<string, () => Promise<IconModule>> = {
    fa: () => import("react-icons/fa"),
    md: () => import("react-icons/md"),
    bs: () => import("react-icons/bs"),
    gi: () => import("react-icons/gi"),
    ai: () => import("react-icons/ai"),
    bi: () => import("react-icons/bi"),
    io: () => import("react-icons/io"),
    io5: () => import("react-icons/io5"),
    ri: () => import("react-icons/ri"),
    tb: () => import("react-icons/tb"),
    pi: () => import("react-icons/pi"),
    si: () => import("react-icons/si"),
};

// cache global
const iconCache = new Map<string, React.ComponentType<any>>();

interface DynamicIconProps {
    name: string;
    className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className }) => {
    // On prépare tout avant les hooks
    const prefix = name?.slice(0, 2)?.toLowerCase() ?? "";
    const importLib = libraries[prefix];

    // On appelle toujours le hook, peu importe la validité du nom
    const Icon = useMemo(() => {
        if (!name || !importLib) {
            return () => null;
        }

        if (iconCache.has(name)) {
            return iconCache.get(name)!;
        }

        const Dynamic = dynamic(async () => {
            const mod = await importLib();
            const Component = mod[name as keyof typeof mod] as IconType;
            if (!Component) {
                console.warn(`❌ Icône "${name}" non trouvée dans react-icons/${prefix}`);
                return () => null;
            }
            return { default: Component };
        }, {
            ssr: false,
            loading: () => <span style={{ display: "inline-block", width: 20 }}></span>,
        });

        iconCache.set(name, Dynamic);
        return Dynamic;
    }, [name, importLib, prefix]);

    // Le rendu final
    return <Icon className={className} />;
};

export default DynamicIcon;
