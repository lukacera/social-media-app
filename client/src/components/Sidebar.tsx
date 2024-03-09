import { ReactNode } from "react"
import { FaMoon, FaHome } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export const Sidebar = (): ReactNode => {
    type IconType = {
        icon: ReactNode,
        linkTo: string
    }
    const sidebarIcons: IconType[] = [
        {
            icon: <FaHome />,
            linkTo: "/"
        },
        {
            icon: < IoMdPersonAdd />,
            linkTo: "/allProfiles"
        },
    ];
    return (
        <div className="grid grid-rows-[65%_35%] 
        border-r-2 border-borderGray">
            <ul className="flex justify-start items-center mt-24 ml-2 
            flex-col gap-20 list-none">
                {/* Ikonice u sidebaru */}
                {sidebarIcons.map((icon, index) => (
                    <Link className="liSidebar" to={icon.linkTo}>
                        <li key={index}>
                            {icon.icon}
                        </li>
                    </Link>

                ))}
            </ul>
            <div className="border-t-2 border-borderGray pt-10
            flex flex-col items-center justify-around">
                <p>V 1.0.0</p>
                <div className="cursor-pointer">
                    <FaMoon />
                </div>
            </div>
        </div>
    )

}

