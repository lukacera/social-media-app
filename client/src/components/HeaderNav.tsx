import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import CurrentUser from "./headerComponents/CurrentUser";
import DisplayFriendRequests from "./headerComponents/DisplayFriendRequests";
import OpenPostModal from "./headerComponents/HeaderNavOpenPostModal";
import CreatePostModal from "./postComponents/createPostComponents/CreatePostModal";
import SidebarDropdownMenu from "./headerComponents/SidebarDropdownMenu";

// Icons
import { GiBackup } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";


const HeaderNav: React.FC = () => {
    const token = localStorage.getItem("token");
    const [isModalNewPostOpen, setIsModalNewPostOpen] = useState<boolean>(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    useEffect(() => {
        console.log(isModalNewPostOpen)
    }, [isModalNewPostOpen])
    return (
        <>
            {isModalNewPostOpen && <CreatePostModal setIsModalNewPostOpen={setIsModalNewPostOpen} />}
            <header className="border-b-2 border-borderGray grid         
                    grid-rows-2 sm:grid-cols-[40%_60%] mt-10 lg:mt-0
                    lg:grid-cols-[30%_60%_10%]
                    xl:grid-cols-[30%_45%_25%] lg:grid-rows-none">

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
                {/* Div for openPost button and friend requests dropdown */}

                {token && (
                    <>
                        <div className="w-full justify-end items-center gap-20
                                    hidden lg:flex pr-10">
                            <OpenPostModal setIsModalNewPostOpen={setIsModalNewPostOpen} />
                            <DisplayFriendRequests />
                        </div>

                        {/* Container for dropdown menu */}
                        <div className="w-[90%] mx-auto grid 
                        grid-cols-5 items-center lg:hidden">

                            <div className="col-span-3 flex items-center justify-between">
                                <OpenPostModal setIsModalNewPostOpen={setIsModalNewPostOpen} />
                                <DisplayFriendRequests />
                            </div>
                            <div className="flex justify-end w-full col-span-2">
                                < GiHamburgerMenu onClick={() => setIsDropdownOpen(true)}
                                    className="cursor-pointer text-3xl lg:hidden" />
                                {isDropdownOpen && <SidebarDropdownMenu
                                    setIsDropdownOpen={setIsDropdownOpen} />}
                            </div>


                        </div>

                    </>

                )}
                <div className="grid place-items-center">
                    <CurrentUser token={token} />
                </div>

            </header>

        </>
    )
};

export default HeaderNav;
