import { ReactNode } from "react"
import { FaHome } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const Sidebar = (): ReactNode => {
    type IconType = {
        icon: ReactNode,
        linkTo: string
    }
    const sidebarIcons: IconType[] = [
        {
            icon: <FaHome />,
            linkTo: "/home"
        },
        {
            icon: < HiUserGroup />,
            linkTo: "/users"
        },
    ];
    return (
        <div className="grid grid-rows-[65%_35%] 
        border-r-2 border-borderGray">
            <ul className="flex justify-start items-center mt-24 ml-2 
            flex-col gap-20 list-none">
                {/* Icons in sidebar */}
                {sidebarIcons.map((icon, index) => (
                    <Link className="liSidebar" to={icon.linkTo} key={index}>
                        <li >
                            {icon.icon}
                        </li>
                    </Link>

                ))}
            </ul>
            <div className="border-t-2 border-borderGray pt-10
            flex flex-col items-center justify-around">
                <p>V 1.0.0</p>
            </div>
        </div>
    )

}

