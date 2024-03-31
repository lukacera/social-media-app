import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import CurrentUser from "./headerComponents/CurrentUser";
import DisplayFriendRequests from "./headerComponents/DisplayFriendRequests";
import OpenPostModal from "./headerComponents/HeaderNavOpenPostModal";
// Icons
import { GiBackup } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import SidebarDropdownMenu from "./headerComponents/SidebarDropdownMenu";

const HeaderNav: React.FC = () => {
    const token = localStorage.getItem("token");
    const [isModalNewPostOpen, setIsModalNewPostOpen] = useState<boolean>(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    useEffect(() => {
        console.log(isModalNewPostOpen)
    }, [isModalNewPostOpen])
    return (
        <header className="border-b-2 border-borderGray grid         
        grid-rows-2 sm:grid-cols-[40%_60%] mt-10 md:mt-0
        md:grid-cols-[30%_40%_30%] md:grid-rows-none">

            {/* Logo and header div */}
            <div className="text-6xl items-center
            flex justify-around ">

                <div>
                    <Link to={token ? "/home" : "/"}>
                        <svg width="1em" height="1em">
                            {/* Setting linear gradient for logo */}
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop stopColor="#65ade3" offset="0%" />
                                <stop stopColor="#094572" offset="100%" />
                            </linearGradient>
                            <GiBackup style={{ fill: "url(#blue-gradient)" }} />
                        </svg>
                    </Link>
                </div>
                <div>
                    <Link to={token ? "/home" : "/"}>
                        <h1 className="text-4xl font-madimi-one tracking-widest">
                            Bondify
                        </h1>
                    </Link>
                </div>

            </div>
            <div className="w-full justify-end items-center gap-20
            hidden md:flex">
                <OpenPostModal handleOpenModal={setIsModalNewPostOpen} />
                <DisplayFriendRequests />
            </div>
            {/* Container for CurrentUser and dropdown menu */}
            <div className="flex  items-center mx-10
            justify-end sm:justify-between">
                {/* Dropdown menu */}
                < GiHamburgerMenu onClick={() => setIsDropdownOpen(true)}
                    className="cursor-pointer text-3xl md:hidden" />
                {isDropdownOpen && <SidebarDropdownMenu
                    setIsDropdownOpen={setIsDropdownOpen} />}
                {/* CurrentUser component */}
                <CurrentUser token={token} />
            </div>
        </header>
    )
};

export default HeaderNav;
